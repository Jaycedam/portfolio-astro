import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);
  const url = "/api/pagecount.json?slug=" + slug;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setCount(res.message));
  }, []);
  return <p>{count} views</p>;
}
