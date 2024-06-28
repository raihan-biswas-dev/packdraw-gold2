chrome.runtime.onInstalled.addListener(() => {
    // Open the URL when the action button is clicked
    chrome.tabs.create({ url: "https://packdraw.com/clw080sq61lfk52lccsqkg6mc" });
});