export const createNavItem = (iconSrc, name, counter) => {
    const navItem = document.createElement("div");
    navItem.id = `${name.toLowerCase()}-project`;
    navItem.className = "nav-item";

    navItem.innerHTML = `
        <img class="nav-icon" src="${iconSrc}" alt="${name}">
        <div class="nav-name">${name}</div>
        <div class="pending-count">${counter}</div>
    `;

    return navItem;
};
