export const createNavItem = (iconSrc, name, counter, index) => {
    const navItem = document.createElement("div");
    navItem.id = `${name.toLowerCase()}-project`;
    navItem.dataset.index = index;
    navItem.className = "nav-item";

    navItem.innerHTML = `
        <img class="nav-icon" src="${iconSrc}" alt="${name}">
        <div class="nav-name">${name}</div>
        <div class="edit-project">...</div>
        <div class="pending-count">${counter}</div>
    `;

    return navItem;
};
