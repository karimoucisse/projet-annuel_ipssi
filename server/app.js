const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // TODO: REMOVE THAT
const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();
require('./database');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const authRouter = require('./router/auth.router');
const fileRouter = require('./router/file.router');
const adminRouter = require('./router/admin.router');
const stripeService = require('./router/stripe');
const Invoice = require('./models/invoice.model');
const User = require('./models/user.model');
const Basket = require('./models/basket.model');

const { PORT } = process.env || 3000;

const app = express();
const corsOptions = {
    origin: 'http://localhost:5000',
    credentials: true,
};
app.use(cors(corsOptions));

const sendEmail = async (email) => {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
        email: 'ali-66380@hotmail.fr',
        name: 'Cherif B',
    };
    const receivers = [
        {
            email,
        },
    ];
    try {
        await apiInstance.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Test Email',
            textContent: 'Test Email',
            htmlContent: `<div>Bonjour</div>`,
        });
    } catch (error) {
        console.log(error);
    }
};

const sendSMS = async (num) => {
    console.log('je suis là pour envoyer un sms');
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalSMSApi();

    let sendTransacSms = new SibApiV3Sdk.SendTransacSms();
    const sender = 'ArchiCo';
    const recipient = num;
    sendTransacSms = {
        sender,
        recipient,
        content: 'Ceci est un test, je veux envoyer mon premier sms via API',
    };
    try {
        await apiInstance.sendTransacSms(sendTransacSms);
    } catch (error) {
        console.log(error);
    }
};

app.post(
    '/stripe/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
        let event = req.body;

        const endpointSecret =
            'whsec_b0a758ff8ad0797930c7bbf2a13ad008b6a374dd182d9018c9dea64246c831af';
        if (endpointSecret) {
            const sig = req.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    sig,
                    endpointSecret
                );
            } catch (err) {
                console.log(err.message);
                res.status(400).send(`Webhook Error: ${err.message}`);
                return;
            }
        }

        const { userId, subscription } = event.data.object.metadata;

        switch (event.type) {
            //case 'payment_intent.payment_failed':

            //    break;
            case 'payment_intent.succeeded':
                if (userId && subscription) {
                    await User.findByIdAndUpdate(userId, { active: true });
                    await Basket.findOneAndDelete({ userId });
                    await Invoice.create({
                        userId,
                        quantity: Number(subscription),
                    });
                    await sendEmail('cherif.bellahouel@hotmail.com');
                    // await sendSMS('33624864608');
                } else {
                    console.error('il y a un problème'); // TODO: Renvoyer message d'erreur
                }

                break;
            // ... handle other event types
            default:
              console.log(`Unhandled event type ${event.type}`);
        }
        // Return a 200 response to acknowledge receipt of the event
        res.send();
    }
);

app.use(bodyParser.json());
app.use(methodOverride('_method')); // TODO: Supprimer cette ligne et le package, inutile lorsque l'on fera des requêtes avec axios via react

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/file', fileRouter);
app.use('/admin', adminRouter);
app.use('/stripe', stripeService);

app.use((err, req, res, next) => {
    res.status(500).json({ status: 'error', message: err });
});

app.use((req, res) => {
    res.status(404).json({ message: 'not found: check the url' });
});

app.listen(PORT, () => {
    console.log(`=> server lauched on port : ${PORT}`);
});
