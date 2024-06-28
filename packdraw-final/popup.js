
// Function to handle checkbox change event
function handleCheckboxChange(event) {
    var data = {};
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        data[checkbox.id] = checkbox.checked;
    });
    // Save checkbox state to local storage
    chrome.storage.local.set(data);
}

// Function to load checkbox states from local storage
function loadCheckboxStates() {
    // Loop through each checkbox
    chrome.storage.local.get().then((data) => {
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            if (data[checkbox.id] != false) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    });
}

// Attach change event listener to each checkbox
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
});

// Load checkbox states from local storage on page load
window.addEventListener('load', loadCheckboxStates);