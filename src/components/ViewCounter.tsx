import { useEffect, useState } from "react";

export default function ViewCounter({ pathname }: { pathname: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const api = "/api/pagecount.json?slug=" + pathname;

    fetch(api)
      .then((res) => res.json())
      .then((res) => setCount(res.message));
  }, []);
  return (
    <p>
      {count} views for {pathname}
    </p>
  );
}
