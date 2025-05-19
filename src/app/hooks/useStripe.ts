import {useEffect, useState} from "react";
import {loadStripe, Stripe} from "@stripe/stripe-js";

export function useStripe() {
    const [stripe, setStripe] = useState<Stripe | null>(null);

    if (!process.env.NEXT_PUBLIC_STRIPE_PUB_KEY) {
        throw new Error("Missing NEXT_PUBLIC_STRIPE_PUB_KEY environment variable.");
    }

    useEffect(() => {
        async function loadStripeAsync() {
            const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);
            setStripe(stripeInstance);
        }

        loadStripeAsync();
    }, []);

    //função de pagamento não recorrente
    async function createPaymentStripeCheckout(checkoutData: any) {
        if (!stripe) return;

        try {
            const response = await fetch("/api/stripe/create-pay-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutData),
            })

            const data = await response.json();

            await stripe.redirectToCheckout({sessionId: data.id});


        } catch (error) {
            console.log(error);
        }
    }

    async function createSubscriptionStripeCheckout(checkoutData: any) {
        if (!stripe) return;

        try {
            const response = await fetch("/api/stripe/create-subscription-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutData),
            });
            
            const data = await response.json();
            
            await stripe.redirectToCheckout({sessionId: data.id});
        }catch (error) {
            console.log(error);
        }
    }

    return {
        createPaymentStripeCheckout,
        createSubscriptionStripeCheckout,

    };
}

