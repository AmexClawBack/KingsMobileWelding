// Wait until the CMS library is available, then start it and wait for state.
(function boot() {
  if (!(window.CMS && typeof window.CMS.init === 'function')) {
    return setTimeout(boot, 50);
  }

  // Optional: load your site CSS inside the preview pane
  // CMS.registerPreviewStyle('/assets/css/main.css');

  CMS.init(); // reads /admin/config.yml

  // Poll for Redux state becoming available, then route to the collection
  (function waitForState(tries = 0) {
    if (CMS.getState && typeof CMS.getState === 'function') {
      try {
        const state = CMS.getState().toJS();
        console.log('Decap ready. State snapshot:', state);

        // If we're at the dashboard (#/), push to the Blog collection
        if (!location.hash || location.hash === '#/') {
          location.hash = '#/collections/blog';
        }
        return;
      } catch (e) {
        // fall through to retry
      }
    }
    if (tries < 200) { // ~10 seconds max
      return setTimeout(() => waitForState(tries + 1), 50);
    }
    console.error('CMS loaded but state never became available.');
  })();
})();
