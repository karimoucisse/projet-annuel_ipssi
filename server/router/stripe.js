const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Subscription to Archiconnect',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/checkout-failed`,
    });

    res.send({ url: session.url });
});

module.exports = router;
