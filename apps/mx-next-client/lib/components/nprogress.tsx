'use client';

import { Suspense, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function NProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      showSpinner: false,
      minimum: 0.3,
      easing: 'ease',
      speed: 500,
      trickleSpeed: 200,
    });

    // Start the progress bar
    NProgress.start();

    // Complete the progress bar after a short delay
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}

// Wrapper component that provides Suspense boundary
export function NProgressProvider() {
  return (
    <Suspense>
      <NProgressBar />
    </Suspense>
  );
}
