window.addEventListener("load", function () {
  if (screen.width < 768) {
    console.log("ℹ️ Live2D: Mobile screen detected, skipping load.");
    return;
  }

  // Đợi thêm một chút để đảm bảo các thư viện PIXI và Live2D Display đã sẵn sàng hoàn toàn
  setTimeout(() => {
    if (typeof Live2dLoader === "undefined") {
      console.error("❌ Live2D: Live2dLoader library not found!");
      return;
    }

    try {
      new Live2dLoader([
        {
          width: 500,
          height: 600,
          left: "-100px",
          bottom: "-20px",
          role: "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/rem/model.json",
          opacity: 1,
          scale: 0.22,
          draggable: false,
          pierceThrough: true,
        },
      ]);

      // Gán ID cho canvas để waifu-talk có thể nhận diện
      setTimeout(() => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
          canvas.id = "live2d";
          console.log("✅ Rem Live2D initialized correctly");
        }
      }, 2000);
    } catch (err) {
      console.error("❌ Live2D error:", err);
    }
  }, 1000);
});
