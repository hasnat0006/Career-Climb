import { useEffect, useState } from "react";

const url = process.env.REACT_APP_API_URL;

const fetchData = async (current, destination) => {
    try {
        const response = await fetch(`${url}/roadmap?from=${current}&to=${destination}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received Response:", data);
        return data.response || [];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const useData = (current, destination) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!current || !destination) {
            return;
        }
        setLoading(true);
        setError(null);

        fetchData(current, destination)
            .then((fetchedData) => {
                setData(fetchedData);
            })
            .catch((fetchError) => {
                setError(fetchError.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [current, destination]);

    return { data, loading, error };
};

export default useData;
