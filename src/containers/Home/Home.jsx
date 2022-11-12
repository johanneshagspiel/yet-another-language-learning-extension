import React, {useEffect, useState} from 'react';
import DictionaryOverview from "./Dictionary/DictionaryOverview";
import StorageOverview from "./Storage/StorageOverview";

export default function Home({ setHomeState }) {

    return (
        <>
            <h3>Overview</h3>
            <DictionaryOverview setState={setHomeState}></DictionaryOverview>
            <hr></hr>
            <StorageOverview setState={setHomeState}></StorageOverview>
        </>
    )
}
