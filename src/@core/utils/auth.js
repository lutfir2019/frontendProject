'use client'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie'

const auth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const token = Cookies.get('token')
    
    useEffect(() => {
      // Check if the user is not logged in, redirect to login page
      if (!token) {
        router.replace('/pages/login');
      }
    }, [token, router]);

    return <WrappedComponent {...props} />;
  };

  // Copy static methods
  if (WrappedComponent.getInitialProps) {
    Wrapper.getInitialProps = WrappedComponent.getInitialProps;
  }

  return Wrapper;
};

export default auth;
