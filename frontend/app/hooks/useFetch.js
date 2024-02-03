import { useState, useEffect } from "react";

export default function useFetch(url, config) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          const error = await response.json();
          setErrorMessage(error);
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, hasError, errorMessage };
}
