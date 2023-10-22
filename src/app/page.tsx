"use client";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [a] = useState(0);

  useEffect(() => {
    console.log(a);
  }, []);

  const s = useMemo(() => a, []);

  return <div>Hello world</div>;
}
