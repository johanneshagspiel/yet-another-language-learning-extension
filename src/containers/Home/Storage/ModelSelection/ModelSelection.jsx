import React, {useEffect, useState} from 'react';
import {getModels} from "../../../../../utils/Helper/AnkiHelper";
import {ModelOptions} from "./ModelOptions";

function ModelSelection() {
    const [models, setModels] = useState(null);

    async function asyncGetModels() {
        const promiseModelList = await getModels();
        if (JSON.stringify(promiseModelList) !== JSON.stringify(models)) {
            setModels(promiseModelList);
        }

    }

    useEffect(() => {
            asyncGetModels();
            return () => {}
        }, [])

    let modelOptionList = null;
    if(models) {
        const cleanedModelList = models.filter(([modelName, fieldCount]) => fieldCount == 2)
        const modelNameList =  cleanedModelList.map(([modelName, fieldCount]) => modelName)
        modelOptionList = <ModelOptions modelNameList={modelNameList}></ModelOptions>
    }

    return (
        <>
            {modelOptionList}
        </>
    )
}
export {
    ModelSelection
}