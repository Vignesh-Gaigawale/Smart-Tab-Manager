let tabTimes = {};
let currentTab = null;
let startTime = null;

// When user switches tab
chrome.tabs.onActivated.addListener(function (info) {

    let now = Date.now();

    if (currentTab !== null) {
        let duration = now - startTime;
    }

    currentTab = info.tabId;
    startTime = now;

    tabTimes[currentTab] = now;
});


// Check every 1 minute for inactive tabs
setInterval(function () {

    chrome.tabs.query({}, function (tabs) {

        let now = Date.now();

        tabs.forEach(function (tab) {

            let lastActive = tabTimes[tab.id] || now;

            let inactive = now - lastActive;

            // 30 minutes = 1800000 ms
            if (inactive > 1800000) {
                chrome.tabs.remove(tab.id);
            }

        });

    });

}, 60000);