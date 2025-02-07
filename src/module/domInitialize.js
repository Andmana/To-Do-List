import {
    countAllTasksBy,
    getAllProjects,
    getAllTasksBy,
} from "./queryLocalStorage";
import projectIcon from "../assets/icons/project.svg";
import addIcon from "../assets/icons/add.svg";

// Helper function to create a nav item
const createNavItem = (iconSrc, name, counter = null) => {
    const navItem = document.createElement("div");
    navItem.className = "nav-item";

    const icon = document.createElement("img");
    icon.className = "nav-icon";
    icon.src = iconSrc;
    navItem.appendChild(icon);

    const nameElement = document.createElement("div");
    nameElement.className = "nav-name";
    nameElement.innerHTML = name;
    navItem.appendChild(nameElement);

    if (counter !== null) {
        const counterElement = document.createElement("div");
        counterElement.className = "pending-count";
        counterElement.innerHTML = counter;
        navItem.appendChild(counterElement);
    }

    return navItem;
};

// Function to generate project navigation
export const generateProjectNavs = () => {
    const projects = getAllProjects();
    const navWrapper = document.querySelector("#projects-nav");

    // Create nav items for each project
    projects.forEach((project) => {
        const taskCount = countAllTasksBy(false, null, project.name);
        const navItem = createNavItem(projectIcon, project.name, taskCount);
        navItem.addEventListener("click", () => {
            generateMainContent(
                project.name + " Task",
                false,
                null,
                project.name
            );
        });
        navWrapper.appendChild(navItem);
    });

    // Create Add Project nav item
    const addProjectNavItem = createNavItem(addIcon, "Add Project");
    navWrapper.appendChild(addProjectNavItem);
};

export const generateMainContent = (hero, isCompleted, due, groupProject) => {
    const setInnerHTML = (selector, value) =>
        (document.querySelector(selector).innerHTML = value);
    const setDisplay = (selector, value) =>
        (document.querySelector(selector).style.display = value);

    setInnerHTML("#main-hero", hero);
    setInnerHTML(
        "#pending-count h2",
        countAllTasksBy(false, due, groupProject)
    );
    setInnerHTML(
        "#completed-count h2",
        countAllTasksBy(true, due, groupProject)
    );

    setDisplay("#pending-count", hero === "Completed" ? "none" : "flex");

    const tasksContainer = document.querySelector("#task-list");
    tasksContainer.innerHTML = "";

    getAllTasksBy(isCompleted, due, groupProject).forEach((task) => {
        tasksContainer.innerHTML += `
            <div class="task-item">
                <label class="checkbox">
                    <input type="checkbox" ${
                        task.isCompleted ? "checked" : ""
                    } />
                    <div class="checkmark"></div>
                </label>
                <div class="badge ${task.priority}"></div>
                <div>${task.title}</div>
                <div class="date">${task.getFormatedDueDate}</div>
            </div>`;
    });
};
