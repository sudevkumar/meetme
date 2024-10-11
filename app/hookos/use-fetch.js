import { useState } from "react";

const useFetch = (cb) => {
  // for calling the apis
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fc = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const res = await cb(...args);
      setData(res);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fc };
};

export default useFetch;
