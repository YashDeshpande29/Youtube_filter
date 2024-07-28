// initally it was empty

document.getElementById('save').addEventListener('click', () => {
    const keyword = document.getElementById('keyword').value.trim();
    chrome.storage.sync.set({ keyword: keyword }, () => {
        alert('Keyword saved!');
    });
});

// Load the saved keyword and populate the input field
chrome.storage.sync.get('keyword', (data) => {
    document.getElementById('keyword').value = data.keyword || '';
});
