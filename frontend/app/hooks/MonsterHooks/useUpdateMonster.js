import useFetch from "../useFetch";

export function useUpdateMonster(monsterId, monsterObject) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters/${monsterId}`;
  const raw = JSON.stringify(monsterObject);
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  };
  const { data, isLoading, hasError, errorMessage } = useFetch(url, {
    ...config,
  });
  return { data, isLoading, hasError, errorMessage };
}
