import React, {useContext, useState} from "react";
import {SelectionContext} from "../../../SelectionContext/SelectionContext";
import Select from "react-select";

function ModelOptions({ modelNameList }) {
    const {model, saveModel} = useContext(SelectionContext);

    function selectNewModel(e) {
        const modelName = e.value;
        saveModel(modelName);
    }

    const optionList = modelNameList.map(((modelName) => {
        let obj = {}
        obj["value"] = modelName
        obj["label"] = modelName
        return obj
    }))

    const modelDefault = {}
    modelDefault["value"] = model
    modelDefault["label"] = model

    return (
        <div key={model}>
            <label>Model: </label>
            <Select options={optionList} defaultValue={modelDefault} onChange={selectNewModel}></Select>
        </div>
    )
}

export {
    ModelOptions
}