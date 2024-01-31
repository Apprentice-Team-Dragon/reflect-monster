import useFetch from "@/hooks/useFetch";

export function useGetMonster(monsterId) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters/${monsterId}`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data, isLoading, hasError, errorMessage } = useFetch(url, {
    ...config,
  });
  return { data, isLoading, hasError, errorMessage };
}

// TODO APIが修正されたらこっちを使う
// export function useGetMonster() {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters`;
//   const config = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const { data, isLoading, hasError, errorMessage } = useFetch(url, {
//     ...config,
//   });
//   return { data, isLoading, hasError, errorMessage };
// }
