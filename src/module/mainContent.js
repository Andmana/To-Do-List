import { countAllTasksBy, getAllTasksBy, updateTaskProgress } from "../class/queries.js";
import { refreshPage2 } from "./app.js";
import { loadTaskForm, openModal } from "./modal.js";
import { currentState } from "./state.js";

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

    const tasksContainer = document.querySelector("#task-list");
    tasksContainer.innerHTML = "";

    getAllTasksBy(isCompleted, due, groupProject).forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.setAttribute("data-index", task.id);
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

const attachEventListeners = () => {
    document.querySelectorAll(".checkbox > input").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const id = checkbox.getAttribute("data-index");
            updateTaskProgress(id);
            refreshPage2();
        });
    });

    document.querySelectorAll(".task-item").forEach((task) => {
        task.addEventListener("click", (event) => {
            if (event.target.tagName === "DIV") {
                const id = task.getAttribute("data-index");
                loadTaskForm(id);
                openModal();
            }
        });
    });
};
