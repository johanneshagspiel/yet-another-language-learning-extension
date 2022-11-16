import React from 'react';

export default function Translation({ translationObj }) {

    const definition = translationObj["source"]
    const definitionElement = <td dangerouslySetInnerHTML={{ __html: definition }}></td>

    const translation = translationObj["target"]
    const translationElement = <td dangerouslySetInnerHTML={{ __html: translation }}></td>

    return (
        <tr>
            {definitionElement}
            {translationElement}
        </tr>
    )
}
