console.info("background script loaded");

chrome.contextMenus.create({
  id: "countCharacters",
  title: "Text Counter: Count Characters",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "countCharacters") {
    const selectedText = info.selectionText;
    const characterCount = selectedText.length;

    console.info("Count Characters: " + characterCount);
    chrome.tabs.sendMessage(tab.id, { characterCount });
  }
});
