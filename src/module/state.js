import { se } from "date-fns/locale";

export const currentState = {
    dueQuery: "today",
    groupQuery: null,
    isCompletedQuery: false,
    heroQuery: "Today",
    activeBarQuery: "today-task",
};

export const setCurrentState = (hero, isCompleted, due, group, activeBar) => {
    Object.assign(currentState, {
        heroQuery: hero,
        isCompletedQuery: isCompleted,
        dueQuery: due,
        groupQuery: group,
        activeBarQuery: activeBar,
    });
    setActiveNav(activeBar);
};

export const resetCurrentState = () => {
    Object.assign(currentState, {
        dueQuery: "today",
        groupQuery: null,
        isCompletedQuery: false,
        heroQuery: "Today",
        activeBarQuery: "today-task",
    });
    setActiveNav("today-task");
};

export function setActiveNav(activeNav) {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
        item.classList.remove("active");
    });
    const activeItem = document.getElementById(activeNav);
    activeItem.classList.add("active");
}
