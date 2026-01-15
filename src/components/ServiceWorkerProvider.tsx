'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useServiceWorker } from '@/lib/useServiceWorker';

interface ServiceWorkerProviderProps {
  children: ReactNode;
}

export function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  const [swReady, setSwReady] = useState(false);
  const { unregisterServiceWorker, updateServiceWorker } = useServiceWorker();
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    setSwReady(true);

    // Listen for SW update available event
    const handleSwUpdate = () => {
      setUpdateAvailable(true);
      // Optionally show a notification to user
      console.log('[App] New version available');
    };

    window.addEventListener('sw-update-available', handleSwUpdate);

    // Optional: Handle SW update
    const handleUpdate = async () => {
      if (updateAvailable) {
        // Reload the page to get the new version
        window.location.reload();
      }
    };

    // Listen for online event to trigger update check
    const handleOnline = () => {
      console.log('[App] Back online');
      updateServiceWorker();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('sw-update-available', handleSwUpdate);
      window.removeEventListener('online', handleOnline);
    };
  }, [updateAvailable, updateServiceWorker]);

  useEffect(() => {
    // Unregister SW when component unmounts (tab closes)
    return () => {
      if (process.env.NODE_ENV === 'development') {
        // In development, unregister to make testing easier
        unregisterServiceWorker();
      }
    };
  }, [unregisterServiceWorker]);

  return <>{children}</>;
}
