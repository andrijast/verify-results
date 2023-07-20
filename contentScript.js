
const greenCheck = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path fill="#32CD32" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg>';
const yellowCheck = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path fill="#FFA500" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg>';
const orangeCheck = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path fill="#FFD700" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg>';
const bookmarkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path fill="#2ca9bc" d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"></path></svg>';

const analyzeResults = async () => {

    
    let results = document.getElementsByClassName("MjjYud");
    results = Array.from(results).filter(result => result.querySelector("h3.LC20lb"));
    const parent = results[0].parentNode;

    // const parent = document.querySelector('#rso');
    // const results = Array.from(parent.children).map(elem => elem.firstChild);

    // for (let result of results) {
    //     result.style.border = "2px solid red";
    // }

    // console.log(results);

    const [ verifiedPage, verifiedHost, bookmarked ] = await findVerified(results);
    // console.log(verifiedPage);
    // console.log(verifiedHost);
    // console.log(bookmarked);
    
    var style = document.createElement('style');
    style.innerHTML = `
        .tagger {
            border-radius: 3px;
            margin-right: 8px;
            margin-bottom: 6px;
            line-height: 20px;
            background-color: transparent;
            color: #dadce0;
            display: inline-block;
            font-family: inherit;
            font-size: 14px;
            font-weight: bold;
            margin-left: 0px;
            white-space: nowrap;
        }

        svg {
            height: 1em;
            width: 1em;
            position: relative;
            top: 0.2em;
            right: 0.1em;
        }
    `; // classes: U3A9Ac qV8iec
    document.head.appendChild(style);


    // modify
    for (let i in results) {
        i = Number(i); // ??
        let tag = '<span class="tagger">';
        if (verifiedPage.includes(i)) {
            tag += greenCheck;
        }
        if (verifiedHost.includes(i)) {
            tag += orangeCheck;
        }
        if (verifiedPage.includes(i) || verifiedHost.includes(i)) {
            tag += 'verified';
        }
        if (bookmarked.includes(i)) {
            tag += ' ' + bookmarkIcon + 'bookmarked';
        }
        tag += '</span>';
        // console.log(i, tag);
        results[i].insertAdjacentHTML('afterbegin', tag);
    }

    // sort
    for (let i of verifiedHost) {
        parent.insertBefore(results[i], parent.firstChild);
    }
    for (let i of verifiedPage) {
        parent.insertBefore(results[i], parent.firstChild);
    }



}


const findVerified = async (results) => {

    const hrefs = (await chrome.storage.local.get({'hrefs': []})).hrefs;
    const hosts = (await chrome.storage.local.get({'hosts': []})).hosts;
    const bookmarks = (await chrome.runtime.sendMessage({msg: "give me those bookmarks"})).bookmarks;
    // console.log('hrefs', hrefs);
    // console.log('hosts', hosts);

    let verifiedHrefs = [];
    let verifiedHosts = [];
    let bookmarked = [];

    for (let i in results) {
        const link = results[i].querySelector('a').href;
        const url = new URL(link);
        // console.log(url);
        
        if (hrefs.includes(url.href)) {
            verifiedHrefs.push(Number(i));
        }
        if (hosts.includes(url.hostname)) {
            verifiedHosts.push(Number(i));
        }
        if (bookmarks.includes(url.href)) {
            bookmarked.push(Number(i));
        }
        
    }

    return [ verifiedHrefs, verifiedHosts, bookmarked ];
}


console.log("content script begins");
analyzeResults();

