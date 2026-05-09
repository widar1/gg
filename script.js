const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const drawer = card.querySelector(".drawer");

  // randomizerar vart fotona dyker upp
  card.style.left = Math.random() * (window.innerWidth - 220) + "px";
  card.style.top = Math.random() * (window.innerHeight - 220) + "px";

  // randomizerar lutning på fotona för att immitera poloroid foton på ett bord
  const tilt = (Math.random() * 8 - 4).toFixed(2);
  card.style.transform = `rotate(${tilt}deg)`;
  card.dataset.tilt = tilt;

  let dragging = false;
  let hasMoved = false;
  let offsetX, offsetY;

  card.addEventListener("mousedown", (e) => {
    dragging = true;
    hasMoved = false;
    offsetX = e.clientX - card.offsetLeft;
    offsetY = e.clientY - card.offsetTop;

    // tar fram det klickade kortet
    cards.forEach((c) => (c.style.zIndex = 1));
    card.style.zIndex = 10;

    e.preventDefault();
  });
     // gör så att man kan dra korten
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    hasMoved = true;
    card.style.left = e.clientX - offsetX + "px";
    card.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    if (dragging && !hasMoved) {
      card.classList.toggle("expanded");
      if (drawer) drawer.classList.toggle("open");
    }
    dragging = false;
  });
  // försökte få dra funktionen att fungera på mobilen men inte fixad ännu
  card.addEventListener("touchstart", (e) => {
    dragging = true;
    hasMoved = false;
    offsetX = e.touches[0].clientX - card.offsetLeft;
    offsetY = e.touches[0].clientY - card.offsetTop;

    // tar fram det klickade kortet
    cards.forEach((c) => (c.style.zIndex = 1));
    card.style.zIndex = 10;

    e.preventDefault();
  });
  // försökte få dra funktionen att fungera på mobilen men inte fixad ännu
  document.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    hasMoved = true;
    card.style.left = e.touches[0].clientX - offsetX + "px";
    card.style.top = e.touches[0].clientY - offsetY + "px";
  });

  document.addEventListener("touchend", () => {
    if (dragging && !hasMoved) {
      card.classList.toggle("expanded");
      if (drawer) drawer.classList.toggle("open");
    }
    dragging = false;
  });
});
