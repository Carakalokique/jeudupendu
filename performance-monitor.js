// Performance monitoring pour le jeu du pendu
(function() {
  // Mesurer le temps de chargement de la page
  window.addEventListener('load', function() {
    if ('performance' in window) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      const resourceLoadTime = perfData.loadEventEnd - perfData.responseEnd;
      
      console.log('Performance Metrics:');
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`DOM Ready Time: ${domReadyTime}ms`);
      console.log(`Resource Load Time: ${resourceLoadTime}ms`);
      
      // Envoyer les métriques à Google Analytics si disponible
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          'event_category': 'Performance',
          'value': pageLoadTime,
          'page_load_time': pageLoadTime,
          'dom_ready_time': domReadyTime,
          'resource_load_time': resourceLoadTime
        });
      }
    }
  });
  
  // Observer les Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP non supporté
    }
    
    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // FID non supporté
    }
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    let clsEntries = [];
    
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      
      // Log CLS après stabilisation
      setTimeout(() => {
        console.log('CLS:', clsValue);
      }, 5000);
    } catch (e) {
      // CLS non supporté
    }
  }
  
  // Monitorer l'utilisation de la mémoire
  if (performance.memory) {
    setInterval(() => {
      const memInfo = performance.memory;
      const usedMemory = Math.round(memInfo.usedJSHeapSize / 1048576);
      const totalMemory = Math.round(memInfo.totalJSHeapSize / 1048576);
      
      if (usedMemory > totalMemory * 0.9) {
        console.warn(`High memory usage: ${usedMemory}MB / ${totalMemory}MB`);
      }
    }, 30000); // Vérifier toutes les 30 secondes
  }
})(); 