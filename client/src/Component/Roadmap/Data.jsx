import { use, useEffect, useState } from "react";

const url = process.env.REACT_APP_API_URL;

const generateNewRoadmap = async (current, destination) => {
    const local_data = JSON.parse(localStorage.getItem("user"));
    let user_id = '112';
    if (local_data)
        user_id = local_data.uuid;

    try {
        const response = await fetch(`${url}/roadmap?from=${current}&to=${destination}&user_id=${user_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.response || [];
    } catch (error) {
        throw error;
    }
};

const saveRoadmap = async (current, destination, roadmap, user_id) => {
    const insert_data = {
        from: current,
        to: destination,
        user_id: user_id,
        roadmap: roadmap,
    };

    try {
        const response = await fetch(`${url}/save/roadmap`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(insert_data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};


const fetchExistingRoadmap = async (current, destination, user_id) => {

    const response = user_id ?
        await fetch(`${url}/find/roadmap?from=${current}&to=${destination}&user_id=${user_id}`)
        :
        await fetch(`${url}/find/roadmap?from=${current}&to=${destination}`);

    if (!response || response.status === 220) {
        return "NOT_FOUND";
    }
    else {
        const data = await response.json();
        return data.roadmap;
    }

};


const useData = (current, destination) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const local_data = JSON.parse(localStorage.getItem("user"));
    let user_id = null;
    if (local_data)
        user_id = local_data.uuid;

    useEffect(() => {
        if (!current || !destination) {
            return;
        }
        setData([]);
        setLoading(true);
        setError(null);

        // if (user_id) {
        fetchExistingRoadmap(current, destination, user_id)
            .then((fetchedData) => {
                if (fetchedData === "NOT_FOUND") {
                    generateNewRoadmap(current, destination)
                        .then((fetchedData) => {
                            setData(fetchedData);
                            saveRoadmap(current, destination, fetchedData, user_id)
                                .then((response) => {
                                }).catch((error) => {
                                    setError(error.message);
                                });
                        })
                        .catch((fetchError) => {
                            setError(fetchError.message);
                            // setLoading(false);
                        })
                }
                else {
                    setData(fetchedData);
                }
            })
            .catch((fetchError) => {
                setError(fetchError.message);
            })
            .finally(() => {
                // setLoading(false);
            });
    }, [current, destination]);

    useEffect(() => {
        if (data.length > 0) {
            setLoading(false);
        }

    }, [data]);

    return { data, loading, error };

};






export default useData;
