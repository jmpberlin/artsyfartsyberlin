const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SK);
var router = express.Router();
const Order = require('../models/order.model');
const User = require('../models/user.model');

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

router.post('/create-checkout-session', async (req, res) => {
  if (
    req.session.currentUser === null ||
    req.session.currentUser === undefined
  ) {
    res.redirect('/cart');
  }
  const orderId = req.session.currentOrder;
  Order.findById(orderId)
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
          success_url: `${YOUR_DOMAIN}/stripe/order/success`,
          cancel_url: `${YOUR_DOMAIN}/stripe/order/cancel`,
        })
        .then((stripeSession) => {
          // console.log('here comes the session URL:');
          // console.log(stripeSession.url);
          // res.json({ url: session.url });
          res.redirect(303, stripeSession.url);
        });
    });
});

// router.use(require('body-parser').text({ type: '*/*' }));

const endpointSecret = process.env.ENDPOINT_SECRET_STRIPE;

router.post('/webhook', function (request, response) {
  // console.log('hit the hook!');
  const sig = request.headers['stripe-signature'];
  const body = request.body;

  let event = null;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    // invalid signature
    console.log('this is the Error:   ======>>>>>>>> EEEERRRROOOOOORRR', err);
    response.status(400).end();
    return;
  }

  let intent = null;
  switch (event['type']) {
    case 'payment_intent.succeeded':
      intent = event.data.object;
      console.log('Succeeded:', intent.id);
      break;
    case 'payment_intent.payment_failed':
      intent = event.data.object;
      const message =
        intent.last_payment_error && intent.last_payment_error.message;
      console.log('Failed:', intent.id, message);
      break;
  }

  response.sendStatus(200);
});

module.exports = router;
