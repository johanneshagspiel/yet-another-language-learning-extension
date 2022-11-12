import React from "react";

export default function DeckOptions({ deckNameList }) {

    const optionList = deckNameList.map(((option, i) => {
        return (
            <option dangerouslySetInnerHTML={{ __html: option }} key={"option" + i} ></option>
        )
    }))

    return (
        <div>
            <label>Deck: </label>
            <select>
                {optionList}
            </select>
        </div>
    )
}