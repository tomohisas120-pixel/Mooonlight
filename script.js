
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
