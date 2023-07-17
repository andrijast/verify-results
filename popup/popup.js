
async function build() {

    const url = await getURL();

    const div = document.querySelector('#buttons');

    const btnPage = document.createElement('button');
    const hrefs = (await chrome.storage.local.get({ 'hrefs': [] })).hrefs;
    console.log(hrefs);
    if (hrefs.includes(url.href)) {
        btnPage.textContent = "Page verified";
        btnPage.setAttribute('disabled', true);
    } else {
        btnPage.textContent = "Verify current page";
        btnPage.addEventListener('click', handleAddPage);
    }
    

    const btnHost = document.createElement('button');
    const hosts = (await chrome.storage.local.get({ 'hosts': [] })).hosts;
    if (hosts.includes(url.hostname)) {
        btnHost.textContent = "Host verified";
        btnHost.setAttribute('disabled', true);
    } else {
        btnHost.textContent = "Verify current host";
        btnHost.addEventListener('click', handleAddHost);
    }

    div.appendChild(btnPage);
    div.appendChild(btnHost);
    
}
build();

async function handleAddPage() {
    const url = await getURL();
    const href = url.href;
    console.log("adding page", href);
    let hrefs = (await chrome.storage.local.get({ 'hrefs': [] })).hrefs;
    console.log(hrefs);
    hrefs.push(href);
    await chrome.storage.local.set({ 'hrefs': hrefs });
    location.reload();
}

async function handleAddHost() {
    const url = await getURL();
    const host = url.hostname;
    console.log("adding host", host);
    let hosts = (await chrome.storage.local.get({ 'hosts': [] })).hosts;
    console.log(hosts);
    hosts.push(host);
    await chrome.storage.local.set({ 'hosts': hosts });
    location.reload();
}

async function getURL() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return new URL(tab.url);
}

// document.querySelector("#verifyPageButton").addEventListener("click", handleAddPage);
// document.querySelector("#verifyHostButton").addEventListener("click", handleAddHost);
