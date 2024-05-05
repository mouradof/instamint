// pages/logout.jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    router.push('/login');
  }, [router]);

  return (
    <div>Logging out... Please wait.</div>
  );
};

export default Logout;
