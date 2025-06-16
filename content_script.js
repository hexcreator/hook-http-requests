// content_script.js

// 1. Inject the 'injected.js' script into the page
const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(script);
script.onload = () => script.remove();

// 2. Listen for messages from the injected script
window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source !== window || !event.data.type || event.data.type !== "FROM_PAGE") {
    return;
  }

  // 3. Forward the data to the background script
  chrome.runtime.sendMessage({
    type: 'INTERCEPTED_REQUEST',
    data: event.data.payload
  });
}, false);