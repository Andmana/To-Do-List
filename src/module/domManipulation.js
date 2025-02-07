import { countAllTasksBy } from "./queryLocalStorage";

export const updatePendingCount = () => {
    const counters = document.querySelectorAll("#tasks-nav .pending-count");
    const filters = ["today", "tomorrow", "week", null];

    counters.forEach((count, index) => {
        count.innerHTML = countAllTasksBy(false, filters[index]);
    });
};
