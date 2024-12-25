"use client";
import { useEffect, useRef, useState } from 'react';
import SignInForm from '@components/SignInForm';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const isEffectRun = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const session = async () => {
        const session = await getSession();
        if (session?.user?.role) {
            router.push('/');
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
        <SignInForm load={isLoading} />
    );
};

export default Page;
