document.addEventListener('DOMContentLoaded', () => {
  const requestsContainer = document.getElementById('requests-container');
  const requestTemplate = document.getElementById('request-template');
  const clearButton = document.getElementById('clear-button');

  const backgroundPageConnection = chrome.runtime.connect({ name: "devtools-panel" });
  backgroundPageConnection.postMessage({ name: 'init', tabId: chrome.devtools.inspectedWindow.tabId });

  backgroundPageConnection.onMessage.addListener((message) => {
    if (message.type === 'INTERCEPTED_REQUEST' && message.data) {
      addRequestToView(message.data);
    }
  });

  clearButton.addEventListener('click', () => {
    requestsContainer.innerHTML = '';
  });

  function addRequestToView(data) {
    const template = requestTemplate.content.cloneNode(true);
    const statusBadge = template.querySelector('.status-badge');
    const statusStr = data.status ? data.status.toString() : '???';
    statusBadge.textContent = `${data.type} ${statusStr}`;
    
    if (statusStr.startsWith('2')) {
      statusBadge.classList.add('status-ok');
    } else if (statusStr.startsWith('4') || statusStr.startsWith('5') || statusStr === 'Error') {
       statusBadge.classList.add('status-error');
    } else {
       statusBadge.classList.add('status-other');
    }

    template.querySelector('.method-badge').textContent = data.method;
    template.querySelector('.url').textContent = data.url;
    template.querySelector('.full-url').textContent = data.url;
    template.querySelector('.duration').textContent = data.duration ? `${data.duration.toFixed(0)}ms` : '';
    template.querySelector('.timestamp').textContent = data.timestamp;
    
    template.querySelector('.headers').textContent = JSON.stringify(data.headers || {}, null, 2);
    template.querySelector('.request-body').textContent = formatBody(data.body);
    template.querySelector('.response-body').textContent = formatBody(data.response);
    template.querySelector('.trace').textContent = data.trace || 'N/A';
    
    requestsContainer.appendChild(template);
  }
  
  function formatBody(body) {
    if (body === null || body === undefined) return 'N/A';
    // For XHR, body might be a string, for Fetch it can be various types
    if (typeof body === 'string') {
        try {
            // Try to parse and pretty-print if it's JSON
            return JSON.stringify(JSON.parse(body), null, 2);
        } catch (e) {
            return body; // It's just a string
        }
    }
    if (typeof body === 'object') {
        return JSON.stringify(body, null, 2);
    }
    return body.toString();
  }
});