import { useState } from "react";

export const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

        const fetchData = async (customOptions) => {
            setLoading(true);
            try{
                const res = await fetch(url, {...options, ...customOptions});
                if(!res.ok){
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const json = await res.json();
                setData(json)
            }catch(err){
                setError(err.message)
            }
            finally{
                setLoading(false)
            }            
        }

    return { data, error, loading, fetchData };
}