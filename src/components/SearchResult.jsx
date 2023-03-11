import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';

import { fetchData } from '../utils/api';
import { Context } from '../context/contextApi';
import LeftNav from "./LeftNav";
import SearchResultVideoCard from './SearchResultVideoCard';

export default function SerachResults() {

  const [result, setResult] =useState([]);
  const {searchQuery} = useParams();
  const {setLoading} = useContext(Context);

  useEffect(()=>{
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResuts();
  },[searchQuery]);

  const fetchSearchResuts=()=>{
    setLoading(true);

    fetchData(`search/?q=${searchQuery}`).then((res)=>{
      setResult(res?.data?.contents)
      setLoading(false);

    })

  }
  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNav></LeftNav>
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-400 scrollbar-track-black-100 bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result.map((item, index)=>{
            if(item?.type!=="video") return false;
                return (
                  <SearchResultVideoCard key={index} video= {item?.video}></SearchResultVideoCard>
                )
          })}
        </div>
      </div>
    </div>
  )
}
