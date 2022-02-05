const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const redirectURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.WEBSITE_URL;

async function CreateStripeSession(req, res) {
  const { item } = req.body;


  const stripeItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.picture],
        name: item.title,
      },
      unit_amount: item.cost * 100,
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [stripeItem],
    mode: 'payment',
    success_url: redirectURL + '/success',
    cancel_url: redirectURL,
    metadata: {
      images: item.picture,
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;