// Function to filter thumbnails based on the user-defined keyword
function filterThumbnails(keyword) {
    let videoElements = document.querySelectorAll('ytd-rich-grid-media, ytd-video-renderer, ytd-compact-video-renderer, ytd-compact-autoplay-renderer, ytd-compact-playlist-renderer, ytd-compact-radio-renderer');

    videoElements.forEach((video) => {
        let titleElement = video.querySelector('#video-title, #video-title-link, yt-formatted-string#video-title, yt-formatted-string#video-title-link, yt-formatted-string#video-title-text, h3.title-and-badge, .title.style-scope.ytd-video-renderer');
        
        if (titleElement && titleElement.textContent.toLowerCase().includes(keyword.toLowerCase())) {
            let thumbnail = video.querySelector('.yt-core-image--fill-parent-height, .style-scope.ytd-thumbnail, .style-scope.ytd-thumbnail-overlay-time-status-renderer, img');
            if (thumbnail) {
                thumbnail.style.display = "block";
            }
            titleElement.style.display = "block";
        } else {
            let thumbnail = video.querySelector('.yt-core-image--fill-parent-height, .style-scope.ytd-thumbnail, .style-scope.ytd-thumbnail-overlay-time-status-renderer, img');
            if (thumbnail) {
                thumbnail.style.display = "none";
            }
            if (titleElement) {
                titleElement.style.display = "none";
            }
        }
    });
}

// Load the user-defined keyword from local storage
chrome.storage.sync.get('keyword', (data) => {
    filterThumbnails(data.keyword || '');
});

// Set interval to continuously apply filter to dynamically loaded content
const interval = setInterval(() => {
    chrome.storage.sync.get('keyword', (data) => {
        filterThumbnails(data.keyword || '');
    });
}, 1000);
