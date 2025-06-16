// background.js
const connections = {};
const messageQueue = {};

chrome.runtime.onConnect.addListener(port => {
  const extensionListener = (message) => {
    if (message.name === "init") {
      const tabId = message.tabId;
      connections[tabId] = port;
      
      if (messageQueue[tabId]) {
        messageQueue[tabId].forEach(msg => port.postMessage(msg));
        delete messageQueue[tabId];
      }

      port.onDisconnect.addListener(() => {
        delete connections[tabId];
      });
    }
  };
  port.onMessage.addListener(extensionListener);
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (sender.tab) {
    const tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      if (!messageQueue[tabId]) {
        messageQueue[tabId] = [];
      }
      messageQueue[tabId].push(request);
    }
  }
  return true;
});