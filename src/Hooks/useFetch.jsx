import { useEffect, useState } from "react"

function useFetch(url) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const Fetch = async () => {
            try {
                const res = await fetch(url);
                setIsLoading(true);

                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();
                setData(data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        }

        Fetch()
    }, []);

    return {data, isLoading}
}

export default useFetch
