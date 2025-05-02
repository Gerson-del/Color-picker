import { generateRandomColor } from "./colorGenerator.js";
import { updateColorDisplay, showToast } from "./ui.js";
import { copyToClipboard } from "./clipboard.js";

const colorContainer = document.getElementById("color_container");
const colorSwatch = document.getElementById("color-swatch");
let colors = [];
let currentColor = "";

document.getElementById("generar").addEventListener("click", () => {
  currentColor = generateRandomColor();
  updateColorDisplay(colorContainer, currentColor);

  if (colors.length < 5) {
    colors.push(currentColor);
  } else {
    colors.shift(); // Eliminar el primer color si hay más de 6
    colors.push(currentColor);
  }

  showColors(); // Llamar a showColors() para actualizar los colores en la interfaz
  showToast("Has generado un nuevo color");
});

function showColors() {
  colorSwatch.innerHTML = ""; // Limpiar los colores existentes antes de agregar nuevos
  for (let index = 0; index < colors.length; index++) {
    const color = document.createElement("div");
    color.className = "color"; // This now applies the CSS class
    color.style.backgroundColor = colors[index]; // Set the background color dynamically
    colorSwatch.appendChild(color);
    color.addEventListener("click", () => copyToClipboard(colors[index]));
  }
}

colorContainer.addEventListener("click", () => copyToClipboard(currentColor));

colorContainer.addEventListener("mouseenter", () => {
  document.body.style.backgroundColor = currentColor;
  colorContainer.textContent = currentColor;
});

colorContainer.addEventListener("mouseleave", () => {
  document.body.style.backgroundColor = "white";
  colorContainer.textContent = "";
});

colorContainer.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === "Space") {
    e.preventDefault();
    copyToClipboard(currentColor);
  }
});
