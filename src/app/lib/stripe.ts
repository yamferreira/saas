import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable.' +
        ' Please add it to your .env.local file.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion: '2025-04-30.basil',
});

export default stripe;
