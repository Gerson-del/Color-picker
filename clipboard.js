import { showToast } from "./ui.js";

export function copyToClipboard(text) {
  if (!text) {
    showToast("No hay color que copiar");
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => showToast("Color copiado"))
    .catch(() => showToast("Error al copiar el color"));
}
