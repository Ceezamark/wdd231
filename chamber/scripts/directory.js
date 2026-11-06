// SELECT HTML ELEMENTS

const membersContainer = document.querySelector("#members-container");

const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

const themeButton = document.querySelector("#theme-button");

// GET MEMBERSHIP LEVEL

function getMembership(level) {
    if (level === 3) {
        return "Gold Membership";
    } else if (level === 2) {
        return "Silver Membership";
    } else {
        return "Member";
    }
}

// DISPLAY BUSINESS MEMBERS

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <h2>${member.name}</h2>

            <p class="member-tagline">
                ${member.tagline}
            </p>

            <div class="member-details">

                ${member.image ? `
                    <img
                        src="images/${member.image}"
                        alt="${member.name} business"
                        loading="lazy"
                    >
                ` : ""}

                <div class="member-info">

                    <p>
                        <strong>EMAIL:</strong>
                        <a href="mailto:${member.email}">
                            ${member.email}
                        </a>
                    </p>

                    <p>
                        <strong>PHONE:</strong>
                        <a href="tel:${member.phone}">
                            ${member.phone}
                        </a>
                    </p>

                    <p>
                        <strong>URL:</strong>
                        <a href="${member.website}"
                           target="_blank"
                           rel="noopener noreferrer">
                            Visit Website
                        </a>
                    </p>

                    <p>
                        <strong>ADDRESS:</strong>
                        ${member.address}
                    </p>

                    <span class="membership">
                        ${getMembership(member.membership)}
                    </span>

                </div>

            </div>
        `;

        membersContainer.appendChild(card);

    });

}

// FETCH JSON DATA USING ASYNC/AWAIT

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member information.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error("Error loading members:", error);

        membersContainer.innerHTML = `
            <p>Sorry, business members could not be loaded.
            Please try again later.</p>
        `;

    }

}

// CALL THE FUNCTION

getMembers();

// GRID VIEW BUTTON

gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");

});

// LIST VIEW BUTTON

listButton.addEventListener("click", () => {

    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");

});

// MOBILE NAVIGATION

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

// DARK MODE

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme");

});

// DISPLAY COPYRIGHT YEAR

const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();

// DISPLAY LAST MODIFICATION DATE

const lastModified = document.querySelector("#last-modified");

const modifiedDate = new Date(document.lastModified);

lastModified.textContent = modifiedDate.toLocaleString();
