
populatePages();
populateHosts();


async function populatePages() {

    const table = document.querySelector("#pages-table");

    const hrefs = (await chrome.storage.local.get({ 'hrefs': [] })).hrefs;
    console.log(hrefs);

    for (let i = 0; i < hrefs.length; i++) {
        const row = document.createElement('tr');

        const num = document.createElement('td');
        num.textContent = i;
        row.appendChild(num);
        
        const href = document.createElement('td');
        href.textContent = hrefs[i];
        href.setAttribute('title', hrefs[i]);
        row.appendChild(href);
        
        const rmbtn = document.createElement('td');
        const btn = document.createElement('button');
        btn.textContent = "remove";
        // btn.setAttribute('onclick', 'removePage(' + i + ')');
        btn.addEventListener('click', () => removePage(i));
        rmbtn.appendChild(btn);
        row.appendChild(rmbtn);

        table.appendChild(row);

    }




}

async function populateHosts() {

    const table = document.querySelector("#hosts-table");

    const hosts = (await chrome.storage.local.get({ 'hosts': [] })).hosts;
    console.log(hosts);

    for (let i = 0; i < hosts.length; i++) {
        const row = document.createElement('tr');

        const num = document.createElement('td');
        num.textContent = i;
        row.appendChild(num);
        
        const host = document.createElement('td');
        host.textContent = hosts[i];
        host.setAttribute('title', hosts[i]);
        row.appendChild(host);
        
        const rmbtn = document.createElement('td');
        const btn = document.createElement('button');
        btn.textContent = "remove";
        // btn.setAttribute('onclick', 'removeHost(' + i + ')');
        btn.addEventListener('click', () => removeHost(i));
        rmbtn.appendChild(btn);
        row.appendChild(rmbtn);

        table.appendChild(row);

    }

}

async function removePage(index) {
    let hrefs = (await chrome.storage.local.get({ 'hrefs': [] })).hrefs;
    hrefs.splice(index, 1);
    await chrome.storage.local.set({ 'hrefs': hrefs });
    location.reload();
}

async function removeHost(index) {
    let hosts = (await chrome.storage.local.get({ 'hosts': [] })).hosts;
    hosts.splice(index, 1);
    await chrome.storage.local.set({ 'hosts': hosts });
    location.reload();
}

