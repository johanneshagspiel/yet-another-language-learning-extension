
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "title": 'Create a flashcard for "%s"',
        "contexts": ["selection"],
        "id": "myConextMenuId"
    });
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {

    const obj = {
        "selectionText":  info.selectionText,
        "checkStorage": true,
        "checkTranslation": true,
        "translation": "",
        "cardExists": false,
        "wordExists": true,
    };

    const result = {
        "lastSearchText": obj
    };
    await chrome.storage.local.set(result);

    const stateObj = {
        "popupState": "WordSearch"
    };
    await chrome.storage.local.set(stateObj);

});
