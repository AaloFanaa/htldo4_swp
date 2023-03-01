import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <span>On Login Page</span>
      <button onClick={() => {}}>Login</button>
    </>
  );
}
