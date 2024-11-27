import { useState } from "react";

export const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

        const fetchData = async (customOptions) => {
            setLoading(true);
            setError(null);
            setData(null)
            try{
                const res = await fetch(url, {...options, ...customOptions});
                if(!res.ok){
                    if(res.status == 401){
                        throw new Error(`E-mail ou senha incorretos`);
                    }else{
                        throw new Error(`Erro interno do servidor: ${res.status}`);
                    }
                }
                const json = await res.json();
                setData(json)
                return json;
            }catch(err){
                setError(err.message || "Ocorreu um erro desconhecido")
                throw err;
            }
            finally{
                setLoading(false)
            }            
        }

    return { data, error, loading, fetchData };
}