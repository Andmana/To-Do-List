import { countAllTasksBy, getAllProjects } from "../class/queries.js";
import { setCurrentState } from "./state.js";
import projectIcon from "../assets/icons/project.svg";
import { createNavItem } from "./utils.js";
import { generateMainContent } from "./mainContent.js";

export const loadSideBar = () => {
    updatePendingCount();
    setupSideBarEvents();
    generateProjectNavs();
};

const setupSideBarEvents = () => {
    const navItems = [
        {
            id: "#task-today",
            text: "Today",
            type: "today-task",
            value: "today",
        },
        {
            id: "#task-tomorrow",
            text: "Tomorrow",
            type: "tomorrow-task",
            value: "tomorrow",
        },
        {
            id: "#task-week",
            text: "This Week",
            type: "week-task",
            value: "week",
        },
        { id: "#task-all", text: "All", type: "all-task", value: "all" },
        {
            id: "#task-completed",
            text: "Completed",
            type: "completed-task",
            value: "all",
            isCompleted: true,
        },
    ];

    navItems.forEach(({ id, text, type, value, isCompleted = false }) => {
        const navElement = document.querySelector(id);
        navElement?.addEventListener("click", () => {
            generateMainContent(text, isCompleted, value, null);
            setCurrentState(text, isCompleted, value, null, type);
        });
    });
};

const generateProjectNavs = () => {
    const projects = getAllProjects();
    const navWrapper = document.querySelector("#projects-nav");
    navWrapper.innerHTML = "";

    projects.forEach((project) => {
        const taskCount = countAllTasksBy(false, null, project.name);
        const navItem = createNavItem(projectIcon, project.name, taskCount);

        navItem.addEventListener("click", () => {
            generateMainContent(project.name, false, null, project.name);
            setCurrentState(
                project.name,
                false,
                null,
                project.name,
                navItem.id
            );
        });

        navWrapper.appendChild(navItem);
    });
};

const updatePendingCount = () => {
    const counters = document.querySelectorAll("#tasks-nav .pending-count");
    const filters = ["today", "tomorrow", "week", null];

    counters.forEach((count, index) => {
        count.innerHTML = countAllTasksBy(false, filters[index]);
    });
};
