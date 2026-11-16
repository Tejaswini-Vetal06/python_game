export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => {
          console.log('[Python Quest PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[Python Quest PWA] Service Worker registration failed:', err);
        });
    });
  }
}
