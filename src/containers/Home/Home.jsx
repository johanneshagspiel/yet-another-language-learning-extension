import React, {useEffect, useState} from 'react';
import DictionaryOverview from "./Dictionary/DictionaryOverview";
import StorageOverview from "./Storage/StorageOverview";

export default function Home({ setHomeState }) {

    return (
        <>
            <p>Overview</p>
            <DictionaryOverview setState={setHomeState}></DictionaryOverview>
            <hr></hr>
            <StorageOverview setState={setHomeState}></StorageOverview>
        </>
    )
}

// const selectedDictionaryP = document.getElementById("selectedDictionaryP");
// const selectedSourceLangP = document.getElementById("selectedSourceLangP");
// const selectedTargetLangP = document.getElementById("selectedTargetLangP");
// const selectedStorageP = document.getElementById("selectedStorageP");
//
// const dictionaryButton = document.getElementById("dictionaryButton");
// dictionaryButton.addEventListener("click", async function () {
//     await chrome.action.setPopup({popup: "popup/add_dictionary.html"});
// });
//
// const dictionaryOptionsObject = await chrome.storage.sync.get("dictionary");
// const dictionaryList = dictionaryOptionsObject["dictionary"];
// const dictionaryListType = typeof dictionaryList;
//
// if (dictionaryListType === "undefined") {
//     const dictionaryNameP = document.getElementById("dictionaryNameP");
//     dictionaryNameP.hidden = false;
//
// } else {
//
//     const dictionaryForm = document.getElementById("dictionaryForm");
//     const dictionaryTemplate = document.getElementById("dictionaryTemplate");
//
//     for (var i = 0; i < dictionaryList.length; i++) {
//
//         const dictionaryObj = dictionaryList[i]
//
//         const element = dictionaryTemplate.content.cloneNode(true);
//
//         const label = element.querySelector("label");
//         label.innerHTML = dictionaryObj["type"];
//
//         if (i === 0) {
//             const input = element.querySelector("input");
//             input.checked = true;
//         }
//
//         dictionaryForm.appendChild(element);
//     }
//     dictionaryButton.hidden = true;
//
//     const sourceLanguageLabel = document.getElementById("sourceLanguageLabel");
//     const sourceLanguageSelect = document.getElementById("sourceLanguageSelect");
//     const targetLanguageLabel = document.getElementById("targetLanguageLabel");
//     const targetLanguageSelect = document.getElementById("targetLanguageSelect");
//
//     sourceLanguageLabel.hidden = false;
//     sourceLanguageSelect.hidden = false;
//     targetLanguageLabel.hidden = false;
//     targetLanguageSelect.hidden = false;
//
//     const supportedLanguageDic = getSupportedLanguageDic();
//     const supportedSourceLanguagesArray = Object.keys(supportedLanguageDic);
//     const supportedSourceLanguagesFullArray = supportedSourceLanguagesArray.map(x => getLanguageFromCode(x).split(",")[0]);
//
//     for (var i = 0; i < supportedSourceLanguagesFullArray.length; i++) {
//         var newOption = document.createElement('option');
//         newOption.value = i;
//         newOption.innerHTML = supportedSourceLanguagesFullArray[i];
//         sourceLanguageSelect.appendChild(newOption);
//     }
//
//     //section to change the target language selection options based on the selected source langauge
//     sourceLanguageSelect.addEventListener("change", function(e){
//         console.log("change detected");
//
//         const selectedSourceLanguage = supportedSourceLanguagesArray[sourceLanguageSelect.options[sourceLanguageSelect.selectedIndex].value];
//
//         const targetLanguageArray = supportedLanguageDic[selectedSourceLanguage];
//         const targetLanguagesFullArray = targetLanguageArray.map(x => getLanguageFromCode(x).split(",")[0]);
//
//         let optionsSize = targetLanguageSelect.options.length - 1;
//         for(var i = optionsSize; i >= 0; i--) {
//             targetLanguageSelect.remove(i);
//         }
//
//         for (var i = 0; i < targetLanguagesFullArray.length; i++) {
//             var newOption = document.createElement('option');
//             newOption.value = i;
//             newOption.innerHTML = targetLanguagesFullArray[i];
//             targetLanguageSelect.appendChild(newOption);
//         }
//
//         selectedSourceLangP.textContent = supportedSourceLanguagesArray[sourceLanguageSelect.options[sourceLanguageSelect.selectedIndex].value];
//         selectedTargetLangP.textContent = supportedSourceLanguagesArray[targetLanguageSelect.options[targetLanguageSelect.selectedIndex].value];
//         // selectedSourceLangP.textContent = supportedSourceLanguagesArray[sourceLanguageSelect.options[sourceLanguageSelect.selectedIndex].value];
//         // selectedSourceLangP.textContent = supportedSourceLanguagesArray[sourceLanguageSelect.options[sourceLanguageSelect.selectedIndex].value];
//     });
//
//
//     var changeSourceLanguageEvent = document.createEvent("HTMLEvents");
//     changeSourceLanguageEvent.initEvent("change",true,true);
//     sourceLanguageSelect.dispatchEvent(changeSourceLanguageEvent);
//
// }
//
// const storageButton = document.getElementById("storageButton");
// storageButton.addEventListener("click", async function () {
//     await chrome.action.setPopup({popup: "popup/add_storage.html"});
// });
//
// const storageOptionsObject = await chrome.storage.sync.get("storage");
// const storageList = storageOptionsObject["storage"];
// const storageOptionType = typeof storageList;
//
// if (storageOptionType === "undefined") {
//     const storageNameP = document.getElementById("storageNameP");
//     storageNameP.hidden = false;
//
// } else {
//
//     const storageForm = document.getElementById("storageForm");
//     const storageTemplate = document.getElementById("storageTemplate");
//
//     for (var i = 0; i < storageList.length; i++) {
//
//         const storageObj = storageList[i]
//
//         const element = storageTemplate.content.cloneNode(true);
//
//         const label = element.querySelector("label");
//         label.innerHTML = storageObj["type"];
//
//         if (i === 0) {
//             const input = element.querySelector("input");
//             input.checked = true;
//         }
//
//         storageForm.appendChild(element);
//     }
//     storageButton.hidden = true;
//
//     let isConnectedToAnki = connectedToAnki();
//
//     const ankiConnectionErrorP = document.getElementById("ankiConnectionErrorP");
//     const deckDropDownSelect = document.getElementById("deckDropDownSelect");
//     const deckDropDownLabel = document.getElementById("deckDropDownLabel");
//
//     if (!isConnectedToAnki) {
//
//         ankiConnectionErrorP.hidden = false;
//         deckDropDownSelect.hidden = true;
//         deckDropDownLabel.hidden = true;
//
//         const ankiErrorConnectLink = document.getElementById("ankiErrorConnectLink");
//         ankiErrorConnectLink.addEventListener('click', function () {
//             let ankiConnectionWebsite = "https://ankiweb.net/shared/info/2055492159";
//             chrome.tabs.create({ url: ankiConnectionWebsite });
//         });
//
//         const ankiErrorSettingLink = document.getElementById("ankiErrorSettingLink");
//         ankiErrorSettingLink.addEventListener('click', function () {
//             let ankiErrorSettingLink = "chrome-extension://dljffoalomgjkjgmdbfcafbdkldahkpa/options/options.html";
//             chrome.tabs.create({ url: ankiErrorSettingLink });
//         });
//
//
//     } else {
//         ankiConnectionErrorP.hidden = true;
//
//         //There is a "default deck" that we want to filter out.
//         let deckNames = await invoke('deckNames', 6);
//         let deckNamesList = String(deckNames).split(",")
//
//         let cleanedDeckNamesList = []
//
//         for (var i = 0; i < deckNamesList.length; i++) {
//             let deckName = String(deckNamesList[i]).trim();
//             if (deckName !== "Default") {
//                 cleanedDeckNamesList.push(deckName)
//             }
//         }
//
//         const ankiNoDeckErrorP = document.getElementById("ankiNoDeckErrorP");
//
//         //show the error message ankiNoDeckErrorP if no deck exists
//         if (cleanedDeckNamesList.length === 0) {
//             ankiNoDeckErrorP.hidden = false;
//
//         } else {
//             ankiNoDeckErrorP.hidden = true;
//             deckDropDownSelect.hidden = false;
//             deckDropDownLabel.hidden = false;
//
//             for (var j = 0; j < cleanedDeckNamesList.length; j++) {
//                 var newOption = document.createElement('option');
//                 newOption.value = j;
//                 newOption.innerHTML = cleanedDeckNamesList[j];
//                 deckDropDownSelect.appendChild(newOption);
//             }
//
//         }
//     }
// }