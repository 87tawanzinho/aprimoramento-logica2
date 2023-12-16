"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

type Clients = {
  clientX?: number;
  clientY?: number;
};
export default function Home() {
  const [list, setList] = useState<Clients[]>([]);

  const handleClick = (event: React.MouseEvent) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
    setList((prev) => [...prev, newDot]);
    localStorage.setItem("list", JSON.stringify(list));
  };

  useEffect(() => {
    const data = localStorage.getItem("list");
    if (data) {
      setList(JSON.parse(data));
    }
  }, []);

  const undoClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (list.length === 0) {
      return alert("await");
    }
    setList((prev) => {
      const undoList = [...prev].slice(0, -1);
      localStorage.removeItem("list");
      localStorage.setItem("list", JSON.stringify(undoList));
      return undoList;
    });
  };
  return (
    <div className="page" onClick={handleClick}>
      {list.map((item) => (
        <p
          className="dot"
          style={{ left: item.clientX, top: item.clientY }}
        ></p>
      ))}

      <button onClick={undoClick}>del</button>
    </div>
  );
}
