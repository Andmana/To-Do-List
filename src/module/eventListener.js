import { generateMainContent } from "./domInitialize";

export const sideBarEvent = () => {
    const navToday = document.querySelector("#task-today");
    const navTomorrow = document.querySelector("#task-tomorrow");
    const navWeek = document.querySelector("#task-week");
    const navAll = document.querySelector("#task-all");
    const navCompleted = document.querySelector("#task-completed");

    navToday.addEventListener("click", () => {
        generateMainContent("Today Task", false, "today", null);
    });
    navTomorrow.addEventListener("click", () => {
        generateMainContent("Tomorrow Task", false, "tomorrow", null);
    });
    navWeek.addEventListener("click", () => {
        generateMainContent("This Week Task", false, "week", null);
    });
    navAll.addEventListener("click", () => {
        generateMainContent("All Task", false, "all", null);
    });
    navCompleted.addEventListener("click", () => {
        generateMainContent("Completed Task", true, null, null);
    });
};
