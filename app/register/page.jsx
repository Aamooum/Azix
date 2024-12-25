"use client";
import RegisterForm from '@components/RegisterForm';
import { useEffect, useRef, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const isEffectRun = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const session = async () => {
    const session = await getSession();
    if (session?.user?.role) {
      router.push('/myprofile');
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
    <RegisterForm load={isLoading} />
  );
};

export default Page;
