
// Select the hamburger button and navigation menu
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#primaryNav");

// Listen for clicks on the hamburger button
menuButton.addEventListener("click", () => {

    // Toggle the open class
    navigation.classList.toggle("open");

    // Check whether the menu is open
    const isOpen = navigation.classList.contains("open");

    // Update accessibility attributes
    menuButton.setAttribute("aria-expanded", isOpen);

    // Update button label
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    // Change hamburger icon
    menuButton.textContent = isOpen ? "✕" : "☰";

});
