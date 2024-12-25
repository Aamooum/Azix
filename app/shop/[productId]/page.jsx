"use client";
import React, { useEffect, useRef, useState } from 'react';
import SingleProduct from '@components/SingleProduct';
import { getSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Page = () => {
    const isEffectRun = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const session = async () => {
        const session = await getSession();
        if (session?.user?.role === "admin") {
            router.push('/401');
        } else {
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (!isEffectRun.current) {
            session();
            isEffectRun.current = true;
        }
    }, []);

    return (
        isLoading && <SingleProduct />
    );
};

export default Page;