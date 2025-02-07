import { generateMainContent, generateProjectNavs } from "./domInitialize";
import { updatePendingCount } from "./domManipulation";
import { countAllTasksBy, getAllProjects } from "./queryLocalStorage";
import { loadStaticIcon } from "./imageSauce";

import projectIcon from "../assets/icons/project.svg";

export const renderUI = (() => {
    let currentState = {
        dueQuery: "today",
        groupQuery: null,
        isCompletedQuery: false,
        heroQuery: "Today",
        activeBarQuery: "today-task",
    };

    const setCurrentState = (hero, isCompleted, due, group, activeBar) => {
        Object.assign(currentState, {
            heroQuery: hero,
            isCompletedQuery: isCompleted,
            dueQuery: due,
            groupQuery: group,
            activeBarQuery: activeBar,
        });
    };

    const init = (() => {
        document.addEventListener("DOMContentLoaded", () => {
            loadSideBar();
            loadMain();
        });
    })();

    const loadSideBar = () => {
        updatePendingCount();
        setupSideBarEvents();
        generateProjectNavs();
    };

    const loadMain = () => {
        const { heroQuery, isCompletedQuery, dueQuery, groupQuery } =
            currentState;
        generateMainContent(heroQuery, isCompletedQuery, dueQuery, groupQuery);
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

    return { init };
})();

const createNavItem = (iconSrc, name, counter) => {
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
