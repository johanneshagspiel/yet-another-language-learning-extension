import React, {createContext} from 'react';

const SelectionContext = createContext({
    sourceLanguageCode: "de",
    saveSourceLanguageCode: () => {},
    targetLanguageCode: "en",
    saveTargetLanguageCode: () => {},
    deck: "Choose a deck...",
    saveDeck: () => {},
    model: "Basic",
    saveModel: () => {},
    storage: "Anki",
    saveStorage: () => {},
    dictionary: "PONS",
    saveDictionary: () => {},
});


export {
    SelectionContext
}