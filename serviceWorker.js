
async function getBookmarks() {

    function extractUrls(bookmarkNodes, bookmarkUrls) {
        for (const node of bookmarkNodes) {
            if (node.url) {
                bookmarkUrls.push(node.url);
            }
            if (node.children) {
                extractUrls(node.children, bookmarkUrls);
            }
        }
    }

    let bookmarkUrls = [];

    const bookmakrs = await chrome.bookmarks.getTree();
    extractUrls(bookmakrs, bookmarkUrls);
    
    return bookmarkUrls;
}

let bookmarks;
getBookmarks().then(res => bookmarks = res);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "give me those bookmarks")
            sendResponse({bookmarks});
    }
);
