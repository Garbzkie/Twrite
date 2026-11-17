const currentRole = sessionStorage.getItem("rentmeRole");
const isOwner = currentRole === "owner";
const ownerRentLink = document.querySelector("#owner-rent-nav");
const ownerRentCallToAction = document.querySelector("#owner-rent-cta");
const loginLink = document.querySelector("#login-nav");
const logoutLink = document.querySelector("#logout-nav");
const ownerOnlyContent = document.querySelector("[data-owner-only]");

if (ownerRentLink) ownerRentLink.hidden = !isOwner;
if (ownerRentCallToAction) ownerRentCallToAction.hidden = !isOwner;
if (loginLink) loginLink.hidden = Boolean(currentRole);
if (logoutLink) logoutLink.hidden = !currentRole;

if (logoutLink) {
    logoutLink.addEventListener("click", () => {
        sessionStorage.removeItem("rentmeRole");
    });
}

if (ownerOnlyContent) {
    if (isOwner) {
        ownerOnlyContent.hidden = false;
    } else {
        window.location.replace("login.html?account=landlord");
    }
}
