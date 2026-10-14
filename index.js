const colorsGrid = document.getElementById("colors-grid");
const form = document.querySelector("form");
const colorPicker = document.getElementById("color-picker");
const colorMode = document.getElementById("color-mode");

const colorUrlAPI = function (color, mode, count) {
  return `https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=${count}`;
};

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(colorUrlAPI(colorPicker.value.slice(1, 7), colorMode.value, 5), {
    method: "GET",
    headers: myHeaders,
  })
    .then((res) => res.json())
    .then((data) => {
      const colorsGridHTML = data.colors
        .map((color) => {
          return `
              <div class="color-block">
              <div class="color-fluid" style="background-color: ${color.hex.value}"></div>
              <div class="color-hex">${color.hex.value}</div>
              </div>
              `;
        })
        .join("");
      colorsGrid.innerHTML = colorsGridHTML;
    });
});
