import React from 'react';
import Arab from "./Arab/Arab";
import {romanize} from "../../../../../utils/Helper/NumberHelper";

export default function HeadWord({ headWordObj, headWordIndex, maxHeadWordCount }) {

    let fullHeadWord = headWordObj["headword_full"]
    if (maxHeadWordCount > 1) {
        const romanPrefix = String(romanize(headWordIndex)) + ". ";
        fullHeadWord = romanPrefix + fullHeadWord;
    }
    const headWordH1 = <h2 dangerouslySetInnerHTML={{ __html: fullHeadWord }}></h2>

    const arabList = headWordObj["arabs"]
    const arabElementList = arabList.map((arabObj, i) => {
        return (<Arab
            arabObj={arabObj}
            key={i}
        >
        </Arab>)
    })

    return (
        <>
            {headWordH1}
            {arabElementList}
        </>
    )
}
