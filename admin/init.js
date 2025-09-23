// Wait until the CMS library is available, then start it.
(function startWhenReady() {
  if (window.CMS && typeof window.CMS.init === 'function') {
    // Optional: add your site CSS into the preview pane
    // CMS.registerPreviewStyle('/assets/css/main.css');

    CMS.init(); // This reads /admin/config.yml automatically

    // Debug: log the state a bit later so you can confirm it's alive
    setTimeout(() => {
      if (CMS.getState) {
        console.log('Decap state:', CMS.getState().toJS());
      } else {
        console.warn('CMS loaded, but getState not yet available');
      }
    }, 300);
  } else {
    // If CMS isn't ready yet, wait a bit and try again
    setTimeout(startWhenReady, 50);
  }
})();
