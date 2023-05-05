// responsive menu
const burger = document.querySelector(".ham");
const navmenu = document.querySelector(".acc-hidden");
const closeicon = document.querySelector(".close");
burger.addEventListener("click", function () {
  navmenu.style.left = "0";
  navmenu.style.boxShadow = `0 -24px 38px rgba(40, 40, 40, 0.12),
  0 -9px 46px rgba(40, 40, 40, 0.08), 0 -11px 15px rgba(40, 40, 40, 0.04)`;
  document.body.style.overflow = "hidden";
});

closeicon.addEventListener("click", function () {
  navmenu.style.left = "-100%";
  navmenu.style.boxShadow = "none";
  document.body.style.overflow = "auto";
});
// Localstorage saved
const saveBtn = document.getElementsByClassName("bookmark");
for (let i = 0; i < saveBtn.length; i++) {
  saveBtn[i].addEventListener("click", function () {
    let elementId = this.dataset.id;
    let savedTools = JSON.parse(localStorage.getItem("savedTools")) || [];
    if (savedTools.includes(elementId)) {
      // Remove the elementId from the array if it already exists
      savedTools.splice(savedTools.indexOf(elementId), 1);
      localStorage.setItem("savedTools", JSON.stringify(savedTools));
      console.log("Element ID removed: " + elementId);
      window.location.reload();
    } else {
      // Add the elementId to the array if it doesn't exist
      savedTools.push(elementId);
      localStorage.setItem("savedTools", JSON.stringify(savedTools));
      console.log("Element ID saved: " + elementId);
      window.location.reload();
    }
  });
}
// adding style to bookmark
document.addEventListener("DOMContentLoaded", function () {
  let savedTools = JSON.parse(localStorage.getItem("savedTools")) || [];
  console.log("Saved elements: " + JSON.stringify(savedTools));
  for (j = 0; j < savedTools.length; j++) {
    let elementId = savedTools[j];
    let element = document.querySelector(`[data-id="${elementId}"]`);
    element.classList.add("bookmark_active");
  }
});
