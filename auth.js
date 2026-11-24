const ownerRentLink = document.querySelector("#owner-rent-nav");
const ownerRentCallToAction = document.querySelector("#owner-rent-cta");
const loginLink = document.querySelector("#login-nav");
const logoutLink = document.querySelector("#logout-nav");
const ownerOnlyContent = document.querySelector("[data-owner-only]");
const authenticatedContent = document.querySelector("[data-authenticated-only]");

function getCurrentRole() {
    return localStorage.getItem("rentmeRole") || sessionStorage.getItem("rentmeRole");
}

function updateAuthState() {
    const currentRole = getCurrentRole();
    const isOwner = currentRole === "owner";

    if (ownerRentLink) ownerRentLink.hidden = !isOwner;
    if (ownerRentCallToAction) ownerRentCallToAction.hidden = !isOwner;
    if (loginLink) loginLink.hidden = Boolean(currentRole);
    if (logoutLink) logoutLink.hidden = !currentRole;

    if (ownerOnlyContent) {
        ownerOnlyContent.hidden = !isOwner;
        if (!isOwner) window.location.replace("login.html?account=landlord");
    }

    if (authenticatedContent) {
        const hasAccess = currentRole === "student" || isOwner;
        authenticatedContent.hidden = !hasAccess;
        if (!hasAccess) window.location.replace("login.html?account=student&returnTo=findlodging.html");
    }
}

if (logoutLink) {
    logoutLink.addEventListener("click", () => {
        localStorage.removeItem("rentmeRole");
        sessionStorage.removeItem("rentmeRole");
    });
}

window.addEventListener("storage", (event) => {
    if (event.key === "rentmeRole" || event.key === null) updateAuthState();
});

updateAuthState();
