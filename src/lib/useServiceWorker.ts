import { useEffect, useRef } from 'react';

export function useServiceWorker() {
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register service worker when component mounts
    const registerServiceWorker = async () => {
      try {
        if ('serviceWorker' in navigator) {
          console.log('[SW] Registering service worker...');
          
          // Unregister all existing service workers first
          const registrations = await navigator.serviceWorker.getRegistrations();
          console.log('[SW] Found', registrations.length, 'existing registrations');
          
          for (const registration of registrations) {
            try {
              await registration.unregister();
              console.log('[SW] Unregistered existing service worker');
            } catch (error) {
              console.log('[SW] Error unregistering:', error);
            }
          }

          // Register new service worker
           const registration = await navigator.serviceWorker.register('/sw.js', {
             scope: '/',
             updateViaCache: 'none'
           });

          registrationRef.current = registration;
          console.log('[SW] Service Worker registered successfully');

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[SW] New service worker available');
                  // Notify user of update (optional)
                  const event = new Event('sw-update-available');
                  window.dispatchEvent(event);
                }
              });
            }
          });
        }
      } catch (error) {
        console.error('[SW] Registration failed:', error);
      }
    };

    // Delay registration slightly to ensure page loads smoothly
    const timeoutId = setTimeout(registerServiceWorker, 1000);

    // Handle page unload - unregister service worker
    const handleBeforeUnload = async () => {
      console.log('[SW] Page unloading, preparing to unregister...');
      // Don't actually unregister immediately as user might just be refreshing
      // Instead, we'll let the SW handle it based on user visibility
    };

    // Better approach: use visibility API to detect tab closure
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        console.log('[SW] Tab hidden');
      } else {
        console.log('[SW] Tab visible - ensuring SW is registered');
        try {
          if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.register('/sw.js', {
              scope: '/',
              updateViaCache: 'none'
            });
            registrationRef.current = registration;
          }
        } catch (error) {
          console.error('[SW] Re-registration failed:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Function to unregister SW if needed
  const unregisterServiceWorker = async () => {
    try {
      if (registrationRef.current) {
        const success = await registrationRef.current.unregister();
        if (success) {
          console.log('[SW] Service Worker unregistered');
          registrationRef.current = null;
        }
      }
    } catch (error) {
      console.error('[SW] Unregistration failed:', error);
    }
  };

  // Function to update SW
  const updateServiceWorker = async () => {
    try {
      if (registrationRef.current) {
        await registrationRef.current.update();
        console.log('[SW] Update check performed');
      }
    } catch (error) {
      console.error('[SW] Update check failed:', error);
    }
  };

  return {
    unregisterServiceWorker,
    updateServiceWorker,
    registration: registrationRef.current
  };
}
