import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppWrite = (fn) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const posts = await fn();
            setData(posts);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, refetch }
}

export default useAppWrite;
