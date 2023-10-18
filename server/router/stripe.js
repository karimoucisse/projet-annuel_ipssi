const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Invoice = require('../models/invoice.model');
const Subscription = require('../models/subscription.model');
require('dotenv').config();

router.post('/create-checkout-session', async (req, res) => {
    const { subscription, userId } = req.body;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Subscription to Archiconnect',
                    },
                    unit_amount: Number(subscription) * 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/checkout-failed`,
        metadata: {
            userId,
            subscription,
        },
        payment_intent_data: {
            metadata: {
                userId,
                subscription,
            },
        },
    });

    // await Subscription.create({
    //    userId,
    //    storage: Number(subscription),
    //    price: Number(subscription) * 2000,
    // });

    // await Invoice.create({
    //    userId,
    //    quantity: Number(subscription),
    // });

    res.send({ url: session.url });
});

// router.post(
//    '/webhook',
//    express.raw({ type: 'application/json' }),
//    (request, response) => {
//        let event = request.body;

//        const endpointSecret =
//            'whsec_b0a758ff8ad0797930c7bbf2a13ad008b6a374dd182d9018c9dea64246c831af';
//        if (endpointSecret) {
//            const sig = request.headers['stripe-signature'];
//            try {
//                event = stripe.webhooks.constructEvent(
//                    request.body,
//                    sig,
//                    endpointSecret
//                );
//                console.log(event);
//            } catch (err) {
//                console.log(err.message);
//                response.status(400).send(`Webhook Error: ${err.message}`);
//                return;
//            }
//        }
// Return a 200 response to acknowledge receipt of the event
//        response.send();
//    }
// );

module.exports = router;
