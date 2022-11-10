function invoke(action, version, params={}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to issue request'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (Object.getOwnPropertyNames(response).length != 2) {
                    throw 'response has an unexpected number of fields';
                }
                if (!response.hasOwnProperty('error')) {
                    throw 'response is missing required error field';
                }
                if (!response.hasOwnProperty('result')) {
                    throw 'response is missing required result field';
                }
                if (response.error) {
                    throw response.error;
                }
                resolve(response.result);
            } catch (e) {
                reject(e);
            }
        });

        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({action, version, params}));
    });
}

async function checkWordExists(searchParam) {
    const idsExistingCards = await invoke('findCards', 6, searchParam);
    return idsExistingCards.length > 0;
}

function connectedToAnki() {

    let connectedToAnkiRequest = new XMLHttpRequest();

    try {
        connectedToAnkiRequest.open("GET", "http://127.0.0.1:8765", false);
        connectedToAnkiRequest.send(null);
        const result = connectedToAnkiRequest.responseText;
        return true;
    } catch (Exception) {
        return false
    }
}

export {
    connectedToAnki,
    checkWordExists,
    invoke
};