// pages/_app.js

import '@/styles/globals.css'; // or your main CSS
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
