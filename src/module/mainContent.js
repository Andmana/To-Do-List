import { countAllTasksBy, getAllTasksBy, updateTaskProgress } from "../class/queries.js";
import { refreshPage2 } from "./app.js";
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
        taskItem.setAttribute("data-index", task.id);
        tasksContainer.appendChild(taskItem);
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
    });
    taskEvent();
    checkboxEvent();
};

const checkboxEvent = () => {
    const checkboxs = document.querySelectorAll(".checkbox > input");
    checkboxs.forEach((checkbox) => {
        const id = checkbox.getAttribute("data-index");
        checkbox.addEventListener("change", () => {
            alert(id);
            updateTaskProgress(id);
            refreshPage2();
        });
    });
};

const taskEvent = () => {
    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach((task) => {
        task.addEventListener("click", (event) => {
            const id = task.getAttribute("data-index"); // Get the data-index of the clicked task
            const target = event.target;

            if (target.tagName === "DIV") {
                loadTaskForm(id);
                modalAction();
            }
        });
    });
};
