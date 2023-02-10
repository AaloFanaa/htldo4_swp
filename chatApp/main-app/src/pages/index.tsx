import { Inter } from '@next/font/google';
import styles from '@/styles/Chat.module.css';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  //  useEffect(()=> {
  //   if()
  //  }, [])

  return (
    <>
      <span
        onClick={() => {
          router.push('/login');
        }}>
        Change Page
      </span>
    </>
  );
}
