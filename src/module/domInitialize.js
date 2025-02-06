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
export const generateProjectNavs = (() => {
    const projects = getAllProjects();
    const navWrapper = document.querySelector("#projects-nav");

    // Create nav items for each project
    projects.forEach((project) => {
        const taskCount = countAllTasksBy(false, null, project.name);
        const navItem = createNavItem(projectIcon, project.name, taskCount);
        navWrapper.appendChild(navItem);
    });

    // Create Add Project nav item
    const addProjectNavItem = createNavItem(addIcon, "Add Project");
    navWrapper.appendChild(addProjectNavItem);
})();

export const generateMainContent = (hero, isCompleted, due, groupProject) => {
    document.querySelector("#main-hero").innerHTML = hero;
    document.querySelector("#pending-count h2").innerHTML = countAllTasksBy(
        false,
        due,
        groupProject
    );
    document.querySelector("#completed-count h2").innerHTML = countAllTasksBy(
        true,
        due,
        groupProject
    );

    const tasksContainer = document.querySelector("#task-list");
    tasksContainer.innerHTML = "";
    const tasks = getAllTasksBy(isCompleted, due, groupProject);

    tasks.forEach((task) => {
        const navItem = document.createElement("div");
        navItem.className = "task-item";
        navItem.innerHTML = `
                        <label class="checkbox">
                            <input type="checkbox" ${
                                task.isCompleted ? "checked" : ""
                            } />
                            <div class="checkmark"></div>
                        </label>
                        <div class="badge ${task.priority}"></div>
                        <div>${task.title}</div>
                        <div class="date">${task.getFormatedDueDate}</div>`;
        tasksContainer.appendChild(navItem);
    });
};
