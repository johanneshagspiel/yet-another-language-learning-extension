import React from 'react';
import Translation from "./Translation/Translation";

export default function Arab({ arabObj }) {

    const header = arabObj["header"]
    const headerH3 = <h3 dangerouslySetInnerHTML={{ __html: header }}></h3>

    const translationList = arabObj["translations"]
    const translationElementList = translationList.map((translationObj, i) => {
        return (<Translation
            translationObj={translationObj}
            key={i}
        >
        </Translation>)
    });

    return (
        <>
            {headerH3}
            <table>
                {translationElementList}
            </table>
        </>
    )
}
