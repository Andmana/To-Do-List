import { countAllTasksBy, getAllTasksBy } from "../class/queries.js";
import { loadTaskForm, modalAction } from "./modal.js";
import { currentState } from "./state.js";

export const loadMain = () => {
    const { heroQuery, isCompletedQuery, dueQuery, groupQuery } = currentState;
    generateMainContent(heroQuery, isCompletedQuery, dueQuery, groupQuery);
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
        tasksContainer.appendChild(taskItem);
        taskItem.innerHTML = `
                <label class="checkbox">
                    <input type="checkbox" ${task.isCompleted ? "checked" : ""} />
                    <div class="checkmark"></div>
                </label>
                <div class="badge ${task.priority}"></div>
                <div>${task.title}</div>
                <div class="date">${task.getFormatedDueDate}</div>`;
        taskItem.addEventListener("click", () => {
            loadTaskForm(task.id);
            modalAction();
        });
    });
};
