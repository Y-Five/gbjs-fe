/**
 * Performance optimization utilities for the tour search feature
 */

// Debounce function to limit API calls
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function for scroll events
export const throttle = (func, delay) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, delay);
    }
  };
};

// Lazy loading helper for images
export const createImageLoader = () => {
  const imageCache = new Map();
  
  return {
    loadImage: (src) => {
      if (imageCache.has(src)) {
        return Promise.resolve(imageCache.get(src));
      }
      
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          imageCache.set(src, img);
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    },
    
    clearCache: () => {
      imageCache.clear();
    }
  };
};

// Memoization utility for expensive calculations
export const memoize = (fn, keyGenerator = (...args) => JSON.stringify(args)) => {
  const cache = new Map();
  
  return (...args) => {
    const key = keyGenerator(...args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Request batching utility
export const createRequestBatcher = (batchSize = 5, delay = 100) => {
  let batch = [];
  let timeoutId;
  
  return {
    add: (request) => {
      batch.push(request);
      
      if (batch.length >= batchSize) {
        return this.flush();
      }
      
      if (!timeoutId) {
        timeoutId = setTimeout(() => this.flush(), delay);
      }
    },
    
    flush: () => {
      if (batch.length === 0) return Promise.resolve([]);
      
      const currentBatch = [...batch];
      batch = [];
      clearTimeout(timeoutId);
      timeoutId = null;
      
      return Promise.allSettled(currentBatch);
    }
  };
};