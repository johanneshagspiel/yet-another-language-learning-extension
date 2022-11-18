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

async function getModelTemplateFieldCount(modelName) {
    let searchParam = {}
    searchParam["modelName"] = modelName;

    const fieldListArray = await invoke('modelFieldNames', 6, searchParam);
    return fieldListArray.length;
}

async function getModels() {
    const modelList = await invoke('modelNames', 6);
    const fieldCountList = await Promise.all(modelList.map(async (modelName) => await getModelTemplateFieldCount(modelName)))
    const combineList = modelList.map((modelName, i) => [modelName, fieldCountList[i]]);
    return combineList
}

async function addNote(searchParam) {
    const result = await invoke("addNote", 6, searchParam);

    if (result) {
        return true;
    } else {
        return false;
    }
}

async function getDeckname() {
    return await invoke('deckNames', 6);
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
    getDeckname,
    addNote,
    getModels
};