"use client"

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export const dynamic = 'force-static';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');

  const handleBackToShopping = () => {
    router.push('/shop');
  };

  return (
    <main className="max-w-6xl mx-auto p-10 text-center border m-10 rounded-md bg-gradient-to-tr from-green-500 to-green-700 shadow-xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2 text-white">Thank You!</h1>
        <h2 className="text-2xl text-gray-100">You successfully sent</h2>
        <div className="bg-white p-4 rounded-md text-green-700 mt-5 text-4xl font-bold shadow-md">
          ${amount}
        </div>
      </div>
      <button
        onClick={handleBackToShopping}
        className="mt-5 px-4 py-2 bg-white text-green-700 rounded-md font-semibold shadow-md hover:bg-green-100"
      >
        Back to Shopping
      </button>
    </main>
  );
}
