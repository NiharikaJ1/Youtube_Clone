import React, {createContext, useState, useEffect} from "react";
import {fetchData} from "../utils/api";

export const Context = createContext();

export const AppContext= (props)=>{
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectCategories, setSelectCategories] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect((query)=>{
        fetchSelectedCategoriesData(selectCategories)
    },[selectCategories])
    const fetchSelectedCategoriesData=(query)=>{
        setLoading(true);
        fetchData(`search/?q=${query}`).then(({data})=>{
            console.log(data.contents)
            setSearchResults(data.contents)
            setLoading(false);
        })
    }


return(
    <Context.Provider value={{loading, setLoading, searchResults, setSearchResults, selectCategories, setSelectCategories,mobileMenu, setMobileMenu }}>
        {props.children}
    </Context.Provider>
)
}