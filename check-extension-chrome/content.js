// Listen for a message from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkAll") {

    // --- NEW LOGIC ---
    // The website uses a custom checkbox. We identify the unchecked ones by their SVG icon's data-testid.
    const uncheckedIcons = document.querySelectorAll('svg[data-testid="CheckBoxOutlineBlankIcon"]');
    let clickCount = 0;

    console.log(`Found ${uncheckedIcons.length} unchecked custom checkboxes.`);

    uncheckedIcons.forEach(icon => {
      // Based on the provided HTML, the <input> element is the direct sibling just before the <svg>.
      const checkboxInput = icon.previousElementSibling;

      // We perform a sanity check to make sure we're clicking the right thing.
      if (checkboxInput && checkboxInput.tagName === 'INPUT' && checkboxInput.type === 'checkbox') {
        // We simulate a click event. This is crucial because it triggers the
        // website's own JavaScript to handle the state change and update the SVG.
        checkboxInput.click();
        clickCount++;
      } else {
        // If the structure is different, we can try clicking the parent.
        // For the provided HTML, clicking the input is best.
        // icon.parentElement.click(); 
        console.warn("Could not find the corresponding input for an unchecked icon:", icon);
      }
    });

    console.log(`Clicked ${clickCount} checkboxes.`);

    // Send a response back with the count of checkboxes we clicked.
    sendResponse({ count: clickCount });
  }

  // Return true to indicate you wish to send a response asynchronously.
  return true;
});
