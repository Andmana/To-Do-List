import { countAllTasksBy, getAllProjects } from "../class/queries.js";
import { setCurrentState } from "./state.js";
import projectIcon from "../assets/icons/project.svg";
import { loadMain } from "./mainContent.js";
import { loadProjectForm, openModal } from "./modal.js";

export const loadSideBar = () => {
    updateTaskPendingCount();
    generateProjectNavs();
};

// One Time Run / Static
export const setupTaskNavEvents = () => {
    const navItems = [
        {
            id: "#today-task",
            text: "Today",
            type: "today-task",
            value: "today",
        },
        {
            id: "#tomorrow-task",
            text: "Tomorrow",
            type: "tomorrow-task",
            value: "tomorrow",
        },
        {
            id: "#week-task",
            text: "This Week",
            type: "week-task",
            value: "week",
        },
        { id: "#all-task", text: "All", type: "all-task", value: "all" },
        {
            id: "#completed-task",
            text: "Completed",
            type: "completed-task",
            value: "all",
            isCompleted: true,
        },
    ];

    navItems.forEach(({ id, text, type, value, isCompleted = false }) => {
        const navElement = document.querySelector(id);
        navElement?.addEventListener("click", () => {
            setCurrentState(text, isCompleted, value, null, type);
            loadMain();
        });
    });
};

// Dinamis
const updateTaskPendingCount = () => {
    const countersTask = document.querySelectorAll("#tasks-nav .pending-count");
    const filters = ["today", "tomorrow", "week", null];

    countersTask.forEach((count, index) => {
        count.innerHTML = countAllTasksBy(false, filters[index]);
    });
};

const generateProjectNavs = () => {
    const projects = getAllProjects();
    const navWrapper = document.querySelector("#projects-nav");
    navWrapper.innerHTML = "";

    projects.forEach((project) => {
        const taskCount = countAllTasksBy(false, null, project.name);
        const navItem = createNavItem(projectIcon, project.name, taskCount, project.id);

        navItem.addEventListener("click", (event) => {
            if (event.target.classList.contains("edit-project")) {
                openModal();
                loadProjectForm(project.id);
                return;
            }
            setCurrentState(project.name, false, null, project.name, navItem.id);
            loadMain();
        });

        navWrapper.appendChild(navItem);
    });
};

const createNavItem = (iconSrc, name, counter, id) => {
    const navItem = document.createElement("div");
    navItem.id = `${name.toLowerCase()}-project`;
    navItem.dataset.index = id;
    navItem.className = "nav-item";

    navItem.innerHTML = `
        <img class="nav-icon" src="${iconSrc}" alt="${name}">
        <div class="nav-name">${name}</div>
        <div class="edit-project">...</div>
        <div class="pending-count">${counter}</div>
    `;

    return navItem;
};
