import { countAllTasksBy, getAllTasksBy, updateTaskProgress } from "../class/queries.js";
import { refreshPage2 } from "./app.js";
import { loadTaskForm } from "./modal.js";
import { currentState, setIsCompletedtState } from "./state.js";

export const loadMain = () => {
    const { heroQuery, isCompletedQuery, dueQuery, groupQuery } = currentState;
    generateMainContent(heroQuery, isCompletedQuery, dueQuery, groupQuery);
    attachEventListeners();
};

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
    document.querySelector("#pending-count").style.display = hero === "Completed" ? "none" : "flex";
    document.querySelector("#completed-count").className =
        hero === "Completed" ? "" : "show-completed";

    const tasksContainer = document.querySelector("#task-list");
    tasksContainer.innerHTML = "";

    const tasks = getAllTasksBy(isCompleted, due, groupProject);
    tasks.forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.className = `task-item ${task.isCompleted ? "text-striked" : ""}`;
        taskItem.dataset.index = task.id;
        taskItem.innerHTML = `
            <label class="checkbox">
                <input type="checkbox" data-index="${task.id}" ${
            task.isCompleted ? "checked" : ""
        } />
                <p class="checkmark"></p>
            </label>
            <div class="badge ${task.priority}"></div>
            <div>${task.title}</div>
            <div class="date">${task.getFormatedDueDate}</div>`;
        tasksContainer.appendChild(taskItem);
    });
};

export const attachShowCompleted = () => {
    const showComplete = document.querySelector("#completed-count");
    showComplete.addEventListener("click", () => {
        const { heroQuery, isCompletedQuery } = currentState;
        if (heroQuery == "Completed") return;

        setIsCompletedtState(isCompletedQuery == false ? null : false);
        loadMain();
    });
};

const attachEventListeners = () => {
    document.querySelectorAll(".checkbox > input").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const parent = checkbox.parentElement.parentElement; // Corrected this line
            const id = checkbox.getAttribute("data-index");

            parent.classList.toggle("task-flip");
            updateTaskProgress(id);

            setTimeout(() => {
                refreshPage2();
            }, 1100);
        });
    });

    document.querySelectorAll(".task-item").forEach((task) => {
        task.addEventListener("click", (event) => {
            if (event.target.tagName === "DIV") {
                const id = task.getAttribute("data-index");
                loadTaskForm(id);
                document.querySelector("#modal-wrapper").style.display = "flex";
            }
        });
    });
};
