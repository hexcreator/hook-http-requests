// injected.js
(function () {
    if (window.__HybridInterceptorActive) return;
    window.__HybridInterceptorActive = true;
  
    const sendDataToDevtools = (data) => {
      window.postMessage({
        type: "FROM_PAGE", // Custom type to identify our messages
        payload: data
      }, "*");
    };
  
    /**
     * Generates a stack trace string.
     * @returns {string} The formatted stack trace.
     */
    const getStackTrace = () => {
      try {
        throw new Error();
      } catch (e) {
        return e.stack ? e.stack.split("\n").slice(2).join("\n") : 'Stack trace not available';
      }
    };
  
    // --- XHR Interception ---
    const originalXhrOpen = XMLHttpRequest.prototype.open;
    const originalXhrSend = XMLHttpRequest.prototype.send;
  
    XMLHttpRequest.prototype.open = function (method, url) {
      this._interceptorData = {
        type: 'XHR',
        method,
        url,
        headers: {},
        start: performance.now(),
        trace: getStackTrace()
      };
      return originalXhrOpen.apply(this, arguments);
    };
    
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
        if (this._interceptorData && this._interceptorData.headers) {
            this._interceptorData.headers[key] = value;
        }
        return originalSetRequestHeader.apply(this, arguments);
    };
  
    XMLHttpRequest.prototype.send = function (body) {
      if (this._interceptorData) {
        this._interceptorData.body = body || null;
      }
      const onStateChange = () => {
        if (this.readyState === 4 && this._interceptorData) {
          this._interceptorData.end = performance.now();
          this._interceptorData.duration = this._interceptorData.end - this._interceptorData.start;
          this._interceptorData.status = this.status;
          this._interceptorData.response = this.responseText;
          this._interceptorData.timestamp = new Date().toISOString();
          
          sendDataToDevtools(this._interceptorData);
        }
      };
      this.addEventListener("readystatechange", onStateChange);
      return originalXhrSend.apply(this, arguments);
    };
    
    // --- Fetch Interception ---
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const [url, config] = args;
      const fetchData = {
        type: 'Fetch',
        method: config?.method || 'GET',
        url: url.toString(),
        headers: config?.headers ? new Headers(config.headers).toJSON() : {},
        body: config?.body || null,
        start: performance.now(),
        trace: getStackTrace(),
        timestamp: new Date().toISOString()
      };
  
      return originalFetch(...args)
        .then(response => {
          const responseClone = response.clone();
          fetchData.status = response.status;
          fetchData.end = performance.now();
          fetchData.duration = fetchData.end - fetchData.start;
          
          responseClone.text().then(text => {
            fetchData.response = text;
            sendDataToDevtools(fetchData);
          });
          
          return response;
        })
        .catch(error => {
          fetchData.status = 'Error';
          fetchData.response = error.message;
          fetchData.end = performance.now();
          fetchData.duration = fetchData.end - fetchData.start;
          sendDataToDevtools(fetchData);
          throw error;
        });
    };
      
    // Helper to convert Headers object to a plain object
    if (!Headers.prototype.toJSON) {
        Headers.prototype.toJSON = function() {
          const obj = {};
          this.forEach((value, key) => { obj[key] = value; });
          return obj;
      }
    }
  
  })();