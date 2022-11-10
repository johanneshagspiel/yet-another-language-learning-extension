
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "title": 'Create a flashcard for "%s"',
        "contexts": ["selection"],
        "id": "myConextMenuId"
    });
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {

    const obj = {
        "selection_text":  info.selectionText,
        "to_look_up": true,
        "translation": "",
        "card_exists": false,
        "word_exists": true,
    };

    const result = {
        "last_search_text": obj
    };

    await chrome.storage.local.set(result);
});
