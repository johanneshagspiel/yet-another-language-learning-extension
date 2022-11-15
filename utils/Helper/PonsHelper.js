function lookUpWordPons(word, targetLanguage, inLanguage) {

    let ponsRequest = new XMLHttpRequest();

    const secret = "82955b813b1c11accb751b9cb7c2811d6522968c23055f674b9e61b1b179e64b";
    const url = "https://api.pons.com/v1/dictionary?q=" + word + "&l=" + targetLanguage+ inLanguage + "&in=" + inLanguage;

    try {
        ponsRequest.open("GET", url, false);
        ponsRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        ponsRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        ponsRequest.setRequestHeader("X-Secret", secret);
        ponsRequest.send(null);
        return ponsRequest.responseText;
    } catch (Exception) {
        return Exception;
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