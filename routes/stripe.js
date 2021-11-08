var express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SK);
var router = express.Router();
const Order = require('../models/order.model');
const User = require('../models/user.model');

const YOUR_DOMAIN = 'http://localhost:4444';

router.post('/create-checkout-session', async (req, res) => {
  const orderId = req.session.currentOrder;
  const OrderPromise = Order.findById(orderId)
    .populate('items.item')
    .then((resFromOrderDb) => {
      let orderSummed = 0;
      resFromOrderDb.items.forEach((article) => {
        orderSummed += article.item.price * article.quantity;
      });

      const session = stripe.checkout.sessions
        .create({
          line_items: [
            {
              // price_data: {
              //   currency: 'EUR',
              //   unit_amount: 1000,
              // },
              //     amount: req.body.price,
              amount: orderSummed,
              quantity: 1,
              currency: 'eur',
              name: 'Johannes Online Shop',
            },
          ],
          payment_method_types: ['card', 'sepa_debit', 'sofort'],
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}/success`,
          cancel_url: `${YOUR_DOMAIN}/cancel`,
        })
        .then((stripeSession) => {
          console.log('here comes the session URL:');
          console.log(session);
          // res.json({ url: session.url });
          res.redirect(303, stripeSession.url);
        });
    });
});
module.exports = router;
