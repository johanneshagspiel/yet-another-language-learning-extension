import React from 'react';
import HeadWord from "./HeadWord/HeadWord";

export default function Rom({ headWordList }) {

    const headWordElementList = headWordList.map((headWordObj, i) => {
        return (<HeadWord
            headWordObj={headWordObj}
            headWordIndex={i + 1}
            maxHeadWordCount={headWordList.length}
            key={i}
        >
        </HeadWord>)
    })

    return (
        <>
            {headWordElementList}
        </>
    )
}
