import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const instance = axios.create({
    baseURL: 'http://localhost:3000'
  });
  useEffect(() => {
    const uri = url;
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await instance.get(uri);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  },[uri]);

  const RefetchData = async () => {
    setLoading(true);
    const uri = url;

    try {
      const res = await instance.get(uri);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, RefetchData };
};
export default useFetch;
