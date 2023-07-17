

const analyzeResults = async () => {

    
    let results = document.getElementsByClassName("MjjYud");
    results = Array.from(results).filter(result => result.querySelector("h3.LC20lb"));
    const parent = results[0].parentNode;

    // for (let result of results) {
    //     result.style.border = "2px solid red";
    // }

    // console.log(results);

    const [ verifiedPage, verifiedHost ] = await findVerified(results);
    // console.log(verifiedPage);
    // console.log(verifiedHost);

    // modify verified
    for (let i of verifiedPage) {
        // console.log(i);
        let title = results[i].querySelector("h3");
        title.innerHTML = "✅verified | " + title.innerHTML;
    }
    for (let i of verifiedHost) {
        // console.log(i);
        let title = results[i].querySelector("h3");
        title.innerHTML = "☑️verified | " + title.innerHTML;
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
    // console.log('hrefs', hrefs);
    // console.log('hosts', hosts);

    let verifiedHrefs = [];
    let verifiedHosts = [];

    for (let i in results) {
        const link = results[i].querySelector('a').href;
        const url = new URL(link);
        // console.log(url);
        
        if (hrefs.includes(url.href)) {
            verifiedHrefs.push(Number(i));
        } else if (hosts.includes(url.hostname)) {
            verifiedHosts.push(Number(i));
        }
        
    }

    // console.log("ret is " + ret);
    return [ verifiedHrefs, verifiedHosts ];
}


console.log("content script begins");
analyzeResults();

