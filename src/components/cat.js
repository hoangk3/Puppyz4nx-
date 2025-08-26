import { useEffect } from "react";
import "./cat.css";

export default function Sakura() {
  useEffect(() => {
    const interval = setInterval(() => {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = Math.random() * window.innerWidth + "px";
      petal.style.width = "20px";
      petal.style.height = "20px";
      petal.style.backgroundImage = "url('/meo.png')"; // lấy ảnh trong public

      // random animation duration
      petal.style.animationDuration = 5 + Math.random() * 5 + "s";

      document.body.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, 10000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
}
