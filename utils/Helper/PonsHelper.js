import {getCorrectLanguageConnection} from "./LanguageHelper";
import {secret1} from "../../secrets.react";

function lookUpWordPons(word, targetLanguage, inLanguage) {

    let ponsRequest = new XMLHttpRequest();

    const correctMapping = getCorrectLanguageConnection(targetLanguage + inLanguage)

    console.log(targetLanguage)
    console.log(inLanguage)
    console.log(correctMapping)
    console.log(secret1)
    console.log("^")

    if (correctMapping === "dictionary_not_found") {
        return [404, "No result"]

    } else {

        const url = "https://api.pons.com/v1/dictionary?q=" + word + "&l=" + correctMapping;

        try {
            ponsRequest.open("GET", url, false);
            ponsRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            ponsRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
            ponsRequest.setRequestHeader("X-Secret", secret1);
            ponsRequest.send(null);
            return [ponsRequest.status, ponsRequest.responseText];
        } catch (Exception) {
            console.log(Exception)
            return [704, "Exception"];
        }
    }
}

function tryConnection(secret) {
    const word = "tester";
    const targetLanguage = "de";
    const inLanguage = "fr"

    let ponsRequest = new XMLHttpRequest();

    const url = "https://api.pons.com/v1/dictionary?q=" + word + "&l=" + targetLanguage+ inLanguage + "&in=" + inLanguage;

    try {
        ponsRequest.open("GET", url, false);
        ponsRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        ponsRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        ponsRequest.setRequestHeader("X-Secret", secret);
        ponsRequest.send(null);

        const responseText = ponsRequest.responseText;
        return responseText.length > 0;

    } catch (Exception) {
        return false;
    }
}

export {
    lookUpWordPons,
    tryConnection
}