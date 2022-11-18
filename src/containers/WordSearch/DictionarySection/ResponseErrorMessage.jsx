import React from 'react';
import {getLanguageFromCode} from "../../../../utils/Helper/LanguageHelper";

function ResponseErrorMessage({ statusCode, selectionText, sourceLanguageCode, targetLanguageCode }) {

    let errorMessage = null
    if (statusCode === 204) {
        errorMessage =  <p>No translation was found for "{selectionText}" from {sourceLanguageCode} to {getLanguageFromCode(targetLanguageCode)}.</p>
    } else if (statusCode === 404) {
        errorMessage =  <p>A dictionary to translate "{selectionText}" from {sourceLanguageCode} to {targetLanguageCode} does not exist.</p>
    } else if (statusCode === 704) {
        errorMessage =  <p>A server error was encounter translating "{selectionText}" from {sourceLanguageCode} to {targetLanguageCode}.</p>
    }

    return (
        <>
            {errorMessage}
        </>
    )
}

export {
    ResponseErrorMessage
}
