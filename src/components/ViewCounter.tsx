import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const pathname = window.location.pathname;
    const api = "/api/pagecount.json";

    fetch(api, { method: "POST", body: JSON.stringify({ slug: pathname }) })
      .then((res) => res.json())
      .then((res) => setCount(res.message));
  }, []);
  return <p>{count} views</p>;
}
