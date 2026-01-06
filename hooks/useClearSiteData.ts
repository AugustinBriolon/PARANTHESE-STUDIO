const useClearSiteData = () => {
  const clearSiteData = async () => {
    try {
      console.info('🧹 Starting complete cache and storage cleanup...');

      // 1. Clear localStorage
      try {
        localStorage.clear();
        console.info('✅ localStorage cleared');
      } catch (error) {
        console.warn('⚠️ Error clearing localStorage:', error);
      }

      // 2. Clear sessionStorage
      try {
        sessionStorage.clear();
        console.info('✅ sessionStorage cleared');
      } catch (error) {
        console.warn('⚠️ Error clearing sessionStorage:', error);
      }

      // 3. Clear all cookies
      try {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
        }
        console.info('✅ Cookies cleared');
      } catch (error) {
        console.warn('⚠️ Error clearing cookies:', error);
      }

      // 4. Clear IndexedDB
      try {
        if ('indexedDB' in window) {
          // eslint-disable-next-line no-undef
          const databases = await indexedDB.databases();
          for (const db of databases) {
            if (db.name) {
              // eslint-disable-next-line no-undef
              indexedDB.deleteDatabase(db.name);
              console.info(`✅ IndexedDB "${db.name}" deleted`);
            }
          }
        }
      } catch (error) {
        console.warn('⚠️ Error clearing IndexedDB:', error);
      }

      // 5. Clear Cache Storage (Service Worker caches)
      try {
        if ('caches' in window) {
          // eslint-disable-next-line no-undef
          const cacheNames = await caches.keys();
          // eslint-disable-next-line no-undef
          await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
          console.info(`✅ ${cacheNames.length} cache(s) deleted`);
        }
      } catch (error) {
        console.warn('⚠️ Error clearing Cache Storage:', error);
      }

      // 6. Unregister all Service Workers
      try {
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((registration) => registration.unregister()));
          if (registrations.length > 0) {
            console.info(`✅ ${registrations.length} service worker(s) unregistered`);
          }
        }
      } catch (error) {
        console.warn('⚠️ Error unregistering service workers:', error);
      }

      console.info('🎉 Complete cleanup finished! Reloading page...');

      setTimeout(() => {
        window.location.replace(window.location.href);
      }, 500);
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
      window.location.reload();
    }
  };

  return { clearSiteData };
};

export default useClearSiteData;
