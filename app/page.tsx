"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

type Clients = {
  clientX?: number;
  clientY?: number;
};
export default function Home() {
  const [list, setList] = useState<Clients[]>([]);
  const [undo, setUndo] = useState<number[]>([]);
  const handleClick = (event: React.MouseEvent) => {
    const newCircle = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    setList((prev) => [...prev, newCircle]);

    console.log(list);
  };

  const deleteDot = (event: MouseEvent) => {
    event.stopPropagation();
    if (list.length === 0) {
      return alert("stop");
    }
    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
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

      <button onClick={deleteDot}>DELETE</button>
    </div>
  );
}
