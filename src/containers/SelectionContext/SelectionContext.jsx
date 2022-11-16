import React, {createContext} from 'react';

const SelectionContext = createContext({
    sourceLanguageCode: "de",
    saveSourceLanguageCode: () => {},
    targetLanguageCode: "en",
    saveTargetLanguageCode: () => {},
});


export {
    SelectionContext
}