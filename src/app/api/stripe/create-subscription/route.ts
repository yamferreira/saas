import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/app/lib/auth";

export async function POST(req: NextRequest) {
    const {testeId} = await req.json();

    const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

    if (!price) {
        return NextResponse.json({error: "Price not found."}, {status: 500});
    }

    const session = await auth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    if(!userId || userEmail) {
        return NextResponse.json({error: "Unauthorized."}, {status: 401});
    }

    const customerId = await getOrCreateCustomer(userId, userEmail);

    const metadata = {
        testeId,
    }

    //criar um cliente NA STRIPE para ter referencia dele quando for criado o portal

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{price, quantity: 1}],
            mode: "subscription",
            payment_method_types: ["card"],
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/`,
            metadata,
            customer: customerId,
        });

        if (!session.url) {
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error()
    }
}