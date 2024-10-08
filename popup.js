document.getElementById("redirectButton").addEventListener("click", () => {
 chrome.tabs.create({ url: "https://leetcode.com/problemset/" });
});
