// type: module


export async function clearStorage() {
    chrome.storage.local.clear(function() {
        console.log("chrome.storage.local cleared.");
    });
    chrome.storage.sync.clear(function() {
        console.log("chrome.storage.sync cleared.");
    });
}

export async function printStorage() {
    chrome.storage.local.get(result => console.log(result));
    chrome.storage.sync.get(result => console.log(result));
}

