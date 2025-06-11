document.addEventListener('DOMContentLoaded', () => {
  const checkButton = document.getElementById('check-btn');

  checkButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ['content.js']
      }, () => {
        chrome.tabs.sendMessage(activeTab.id, { action: "checkAll" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Could not send message:", chrome.runtime.lastError.message);
          } else if (response) {
            console.log(`Popup initiated check. Clicked ${response.count} checkboxes.`);
            // You could update the popup UI here, e.g., to show a success message.
            window.close(); // Closes the popup after clicking.
          }
        });
      });
    });
  });
});
