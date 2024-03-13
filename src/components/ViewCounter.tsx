import { useEffect, useState } from "react";

export default function ViewCounter({ url }: { url: string }) {
  const [count, setCount] = useState(0);
  const api = "/api/pagecount.json?slug=" + url;

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((res) => setCount(res.message));
  }, []);
  return <p>{count} views</p>;
}
