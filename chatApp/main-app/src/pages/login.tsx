import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <span>On Login Page</span>
      <span
        onClick={() => {
          router.push('/');
        }}>
        Go back
      </span>
    </>
  );
}
