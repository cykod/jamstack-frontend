import { loadStripe } from '@stripe/stripe-js';

function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const json = await response.json()
  return json.data;
}

const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);  


export async function stripeCheckout(item)  {
  const stripe = await stripePromise;

  const response = await fetch('/api/create-stripe-session', {
    method: "POST",
    body: JSON.stringify({ item: item }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const checkoutSession = await response.json()

  const result = await stripe.redirectToCheckout({
    sessionId: checkoutSession.id,
  });
  if (result.error) {
    alert(result.error.message);
  }
};