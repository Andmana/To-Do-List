import { countAllTasksBy, getAllProjects } from "./queryLocalStorage";
import projectIcon from "../assets/icons/project.svg";
import addIcon from "../assets/icons/add.svg";
export const generateProjectNavs = (() => {
    const projects = getAllProjects();
    const navWrapper = document.querySelector("#projects-nav");
    projects.forEach((project) => {
        const navItem = document.createElement("div");
        navItem.className = "nav-item";
        navWrapper.appendChild(navItem);

        const icon = document.createElement("img");
        icon.className = "nav-icon";
        icon.src = projectIcon;
        navItem.appendChild(icon);

        const name = document.createElement("div");
        name.className = "nav-name";
        name.innerHTML = project.name;
        navItem.appendChild(name);

        const counter = document.createElement("div");
        counter.className = "pending-count";
        counter.innerHTML = countAllTasksBy(false, null, project.name);
        navItem.appendChild(counter);
    });

    // Generate Add project field
    const navItem = document.createElement("div");
    navItem.className = "nav-item";
    navWrapper.appendChild(navItem);

    const icon = document.createElement("img");
    icon.className = "nav-icon";
    icon.src = addIcon;
    navItem.appendChild(icon);

    const name = document.createElement("div");
    name.className = "nav-name";
    name.innerHTML = "Add Project";
    navItem.appendChild(name);
})();
