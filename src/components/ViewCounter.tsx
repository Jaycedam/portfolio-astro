import { useEffect, useState } from "react";

export default function ViewCounter({ pathname }: { pathname: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const api = "/api/pagecount.json";

    fetch(api, { method: "POST", body: JSON.stringify({ slug: pathname }) })
      .then((res) => res.json())
      .then((res) => setCount(res.message));
  }, []);
  return (
    <p>
      {count} views for {pathname}
    </p>
  );
}
