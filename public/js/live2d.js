addEventListener("DOMContentLoaded", function () {
  if (screen.width < 768) return;

  new Live2dLoader([
    {
      width: 350,
      height: 475,
      left: "0px",
      bottom: "0px",
      role: "https://model.zulma.id/assets/models/ReZero/rem_1/rem.json",
      opacity: 1,
      scale: 0.2,
      draggable: false,
      pierceThrough: true, // không chặn click web
    },
  ]);

  console.log("✅ Rem Live2D loaded");
});
