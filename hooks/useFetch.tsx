import { useEffect, useState } from "react";

interface Props {
  url: string;
}

function useFetch({ url }: Props) {
  const [data, setData] = useState(null);

  const token = process.env.GITHUB_TOKEN;

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [url]);

  return { data };
}
export default useFetch;
