
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  let target = null;

  if (["w", "a", "s", "d"].includes(key)) {
    target = document.getElementById("key-" + key.toUpperCase());
  } else if (event.code === "Space") {
    target = document.getElementById("key-Space");
  } else if (event.key === "Shift") {
    target = document.getElementById("key-Shift");
  }

  if (target) {
    target.classList.add("active");
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();

  let target = null;

  if (["w", "a", "s", "d"].includes(key)) {
    target = document.getElementById("key-" + key.toUpperCase());
  } else if (event.code === "Space") {
    target = document.getElementById("key-Space");
  } else if (event.key === "Shift") {
    target = document.getElementById("key-Shift");
  }

  if (target) {
    target.classList.remove("active");
  }
});

document.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    document.getElementById("mouse-left").classList.add("active");
  }
  if (event.button === 2) {
    document.getElementById("mouse-right").classList.add("active");
  }
});

document.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    document.getElementById("mouse-left").classList.remove("active");
  }
  if (event.button === 2) {
    document.getElementById("mouse-right").classList.remove("active");
  }
});

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
