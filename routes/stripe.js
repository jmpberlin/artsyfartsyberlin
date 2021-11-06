var express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SK);
var router = express.Router();
const Order = require('../models/order.model');
const User = require('../models/user.model');

const YOUR_DOMAIN = 'http://localhost:4444';

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // price_data: {
        //   currency: 'EUR',
        //   unit_amount: 1000,
        // },
        //     amount: req.body.price,
        amount: 1000,
        quantity: 1,
        currency: 'eur',
        name: 'JohannesPolte',
      },
    ],
    payment_method_types: ['card', 'sepa_debit', 'sofort'],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.redirect(303, session.url);
});
module.exports = router;
