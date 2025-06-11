// This function will be called when the shortcut is used or popup is clicked
function executeCheckboxCheck(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js']
  }, () => {
    // After the script is injected, send a message to the content script
    chrome.tabs.sendMessage(tabId, { action: "checkAll" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
      } else if (response) {
        console.log(`Response from content script: ${response.count} checkboxes clicked.`);
      }
    });
  });
}

// Listener for the keyboard shortcut command
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "check_all") {
    executeCheckboxCheck(tab.id);
  }
});
