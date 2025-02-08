import { isDate } from "date-fns";
import {
    deleteTaskBy,
    getAllProjects,
    getTaskByIndex,
    saveProject,
    saveTask,
} from "../class/queries";
import { refreshPage, refreshPage2 } from "./app";

export const addModalOperation = () => {
    const projectButton = document.querySelector("#add-project");
    projectButton.addEventListener("click", () => {
        loadProjectForm();
        modalAction();
    });

    const taskButton = document.querySelector("#add-task");
    taskButton.addEventListener("click", () => {
        loadTaskForm(null);
        modalAction();
    });
};

export const modalAction = () => {
    openModal();
    closeModal();
};

const openModal = () => {
    const modal = document.querySelector("#modal-wrapper");
    modal.style.display = "flex";
};

const closeModal = () => {
    const modal = document.querySelector("#modal-wrapper");
    const closeIcon = document.querySelector(".close");

    closeIcon.onclick = () => (modal.style.display = "none");
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

const loadProjectForm = () => {
    const modal = document.querySelector("#modal-wrapper");
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";

    const form = document.createElement("form");
    form.id = "project-form";
    modalBody.appendChild(form);

    const formInput = document.createElement("div");
    formInput.className = "form-input";
    formInput.innerHTML = `
                             <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" required>
                            </div>`;
    form.appendChild(formInput);

    const formAction = document.createElement("div");
    formAction.className = "form-action";
    form.appendChild(formAction);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "close";
    closeBtn.type = "button";
    formAction.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "save";
    submitBtn.type = "submit";
    formAction.appendChild(submitBtn);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const objectForm = {};

        formData.forEach(function (value, key) {
            objectForm[key] = value;
        });

        saveProject(objectForm.name);
        refreshPage();
        modal.style.display = "none";
    });
};

export const loadTaskForm = (index = null) => {
    const task = getTaskByIndex(index) || {};
    const projects = getAllProjects();

    const generateOptions = (items, selectedItem) => {
        return items
            .map(
                (item) =>
                    `<option value="${item}" ${
                        item === selectedItem ? "selected" : ""
                    }>${item}</option>`
            )
            .join("");
    };

    const projectsOpt = generateOptions(
        projects.map((p) => p.name),
        task.project
    );
    const priorityOpt = generateOptions(["Low", "Medium", "High"], task.priority);

    const modal = document.querySelector("#modal-wrapper");
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";

    const form = document.createElement("form");
    form.id = "project-form";
    modalBody.appendChild(form);

    form.innerHTML = `
        <div class="form-input">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value="${task.title || ""}" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description" rows="3" cols="40">${
                    task.description || ""
                }</textarea>
            </div>
            <div class="form-group">
                <label for="dueDate">Date</label>
                <input type="date" id="dueDate" name="dueDate" value="${
                    task.dueDate !== "No Date" ? task.getFormatedDueDate2 || "" : ""
                }">
            </div>
            <div class="form-group">
                <label for="priority">Priority</label>
                <select name="priority" id="priority" required>${priorityOpt}</select>
            </div>
            <div class="form-group">
                <label for="project">Project</label>
                <select name="project" id="project" required>${projectsOpt}</select>
            </div>
        </div>
        <div class="form-action">
            ${
                index === null
                    ? `<button type="button" id="close-btn">Close</button>`
                    : `<button type="button" id="delete-btn">Delete</button>`
            }
            <button type="submit">Save</button>
        </div>
    `;

    const closeBtn = document.querySelector("#close-btn");
    const deleteBtn = document.querySelector("#delete-btn");
    if (closeBtn) closeBtn.addEventListener("click", () => (modal.style.display = "none"));
    if (deleteBtn)
        deleteBtn.addEventListener("click", () => {
            deleteTaskBy(task.id);
            modal.style.display = "none";
            refreshPage2();
        });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const objectForm = Object.fromEntries(formData.entries());
        saveTask(objectForm, index);
        refreshPage2();
        modal.style.display = "none";
    });
};
