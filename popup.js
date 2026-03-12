function getCategory(url) {

    url = url.toLowerCase();

    if (
        url.includes("github") ||
        url.includes("leetcode") ||
        url.includes("stackoverflow") ||
        url.includes("codeforces") ||
        url.includes("hackerrank") ||
        url.includes("geeksforgeeks") ||
        url.includes("kaggle") ||
        url.includes("gitlab") ||
        url.includes("bitbucket") ||
        url.includes("replit") ||
        url.includes("codesandbox") ||
        url.includes("dev.to")
    )
        return "Coding";


    if (
        url.includes("youtube") ||
        url.includes("netflix") ||
        url.includes("primevideo") ||
        url.includes("hotstar") ||
        url.includes("spotify") ||
        url.includes("twitch") ||
        url.includes("dailymotion") ||
        url.includes("vimeo") ||
        url.includes("reddit") ||
        url.includes("9gag") ||
        url.includes("buzzfeed") ||
        url.includes("pinterest")
    )
        return "Entertainment";


    if (
        url.includes("gmail") ||
        url.includes("docs") ||
        url.includes("drive") ||
        url.includes("slack") ||
        url.includes("notion") ||
        url.includes("trello") ||
        url.includes("asana") ||
        url.includes("zoom") ||
        url.includes("meet") ||
        url.includes("teams") ||
        url.includes("dropbox") ||
        url.includes("office")
    )
        return "Work";


    return "Other";
}


// SHOW TABS BUTTON
document.getElementById("showTabs").addEventListener("click", function () {

    chrome.tabs.query({}, function (tabs) {

        let list = document.getElementById("tabList");
        let search = document.getElementById("searchInput").value.toLowerCase();

        list.innerHTML = "";

        document.getElementById("tabCount").textContent =
            "Open Tabs: " + tabs.length;

        let visited = {};

        tabs.forEach(function (tab) {

            let title = tab.title.toLowerCase();

            if (title.includes(search)) {

                let li = document.createElement("li");
                li.textContent = tab.title;

                if (visited[tab.url]) {

                    let warn = document.createElement("span");
                    warn.textContent = " ⚠ duplicate";
                    li.appendChild(warn);

                } else {

                    visited[tab.url] = true;

                }

                let btn = document.createElement("button");
                btn.textContent = "❌";

                btn.addEventListener("click", function () {
                    chrome.tabs.remove(tab.id);
                });

                li.appendChild(btn);
                list.appendChild(li);
            }

        });

        generateReport(tabs);

    });

});


// CLOSE DUPLICATE TABS
document.getElementById("closeDuplicates").addEventListener("click", function () {

    chrome.tabs.query({}, function (tabs) {

        let visited = {};
        let duplicates = [];

        tabs.forEach(function (tab) {

            if (visited[tab.url]) {
                duplicates.push(tab.id);
            } else {
                visited[tab.url] = true;
            }

        });

        chrome.tabs.remove(duplicates);

    });

});


// FOCUS MODE (close distraction sites)
document.getElementById("focusMode").addEventListener("click", function () {

    chrome.tabs.query({}, function (tabs) {

        let distractions = [
            "youtube",
            "instagram",
            "facebook",
            "netflix",
            "twitter",

            "tiktok",
            "snapchat",
            "reddit",
            "pinterest",
            "twitch",

            "discord",
            "whatsapp",
            "telegram",
            "primevideo",
            "hotstar",

            "spotify",
            "9gag",
            "buzzfeed",
            "tumblr",
            "vk",

            "imgur",
            "dailymotion",
            "vimeo",
            "quora",
            "yahoo"
        ];

        tabs.forEach(function (tab) {

            let url = tab.url.toLowerCase();

            distractions.forEach(function (site) {

                if (url.includes(site)) {
                    chrome.tabs.remove(tab.id);
                }

            });

        });

    });

});


// GENERATE CATEGORY REPORT
function generateReport(tabs) {

    let stats = {
        Coding: 0,
        Entertainment: 0,
        Work: 0,
        Other: 0
    };

    tabs.forEach(function (tab) {

        let category = getCategory(tab.url);
        stats[category]++;

    });

    let report = document.getElementById("report");

    report.innerHTML =
        "Coding: " + stats.Coding + "<br>" +
        "Work: " + stats.Work + "<br>" +
        "Entertainment: " + stats.Entertainment + "<br>" +
        "Other: " + stats.Other;
}