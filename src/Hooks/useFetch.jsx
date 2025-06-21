import { useEffect, useState } from "react"

function useFetch(url) {

    let [data, setData] = useState([]);

    useEffect(() => {

        const Fetch = async () => {
            try {
                const res = await fetch(url)

                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();
                setData(data)
            } catch (error) {
                console.error(error)
            }
        }

        Fetch()
    }, []);

    return data
}

export default useFetch
