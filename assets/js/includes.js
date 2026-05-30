document.addEventListener("DOMContentLoaded", function () {
  loadInclude("site-header", "/includes/header.html");
  loadInclude("site-footer", "/includes/footer.html");
});

function loadInclude(elementId, filePath) {
  const element = document.getElementById(elementId);

  if (!element) return;

  fetch(filePath)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load " + filePath);
      }
      return response.text();
    })
    .then(function (html) {
      element.innerHTML = html;

      if (elementId === "site-header") {
        initMobileMenu();
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function initMobileMenu() {
  const openMobile = document.getElementById("openMobile");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!openMobile || !mobileMenu) return;

  openMobile.addEventListener("click", function () {
    const isOpen = openMobile.getAttribute("aria-expanded") === "true";

    openMobile.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });
}