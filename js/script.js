"use strict";

const themeSwitcher = document.querySelector("#check");
themeSwitcher.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");
});
