"use client";
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/utils/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const firstRender = useRef(true);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/shopping-bag/total-price');
      const responseJson = await response.json();
      setAmount(responseJson.totalPrice);
    } catch (error) {
      console.error("Error fetching total price:", error);
    } finally {
      setIsLoading(true);
    }
  };

  const session = async () => {
    const session = await getSession();
    if (!session?.user?.role) {
      router.push('/register');
    } else if (session?.user?.role === "admin") {
      router.push('/401');
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      session();
      firstRender.current = false;
    }
  }, []);

  return (
    isLoading && (
      <main className="max-w-6xl mx-auto p-10 text-center border m-10 rounded-md text-black from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">AZIX</h1>
          <h2 className="text-2xl">
            has requested <span className="font-bold"> ${amount}</span>
          </h2>
        </div>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </main>
    )
  );
}