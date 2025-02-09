import { isDate } from "date-fns";
import {
    deleteProjectBy,
    deleteTaskBy,
    getAllProjects,
    getProjectByIndex,
    getTaskByIndex,
    saveProject,
    saveTask,
} from "../class/queries";
import { refreshPage, refreshPage2 } from "./app";

export const addModalOperation = () => {
    document.querySelector("#add-project").addEventListener("click", () => openProjectForm());
    document.querySelector("#add-task").addEventListener("click", () => openTaskForm());
};

const openModal = () => {
    document.querySelector("#modal-wrapper").style.display = "flex";
};

export const attachCloseModalEvent = () => {
    const modal = document.querySelector("#modal-wrapper");
    document.querySelector(".close").onclick = () => (modal.style.display = "none");
    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = "none";
    };
};

const openProjectForm = (index = null) => {
    openModal();
    loadProjectForm(index);
};

const openTaskForm = (index = null) => {
    openModal();
    loadTaskForm(index);
};

const createForm = (innerHTML) => {
    const form = document.createElement("form");
    form.innerHTML = innerHTML;
    return form;
};

export const loadProjectForm = (index = null) => {
    const project = getProjectByIndex(index) || {};
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";

    const form = createForm(`
        <div class="form-input">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" value="${project.name || ""}" required>
            </div>
        </div>
        <div class="form-action">
            <button type="button" id="close-btn">Close</button>
            ${index !== null ? `<button type="button" id="delete-btn" >Delete</button>` : ""}
            <button type="submit" >Save</button>
        </div>
    `);

    modalBody.appendChild(form);

    document.querySelector("#close-btn").addEventListener("click", () => closeModal());
    document.querySelector("#delete-btn")?.addEventListener("click", () => {
        deleteProjectBy(project.id);
        closeModal();
        refreshPage();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        saveProject(new FormData(form).get("name"), index);
        closeModal();
        refreshPage();
    });
};

export const loadTaskForm = (index = null) => {
    const task = getTaskByIndex(index) || {};
    const projects = getAllProjects().map((p) => p.name);

    const generateOptions = (items, selectedItem) =>
        items
            .map(
                (item) =>
                    `<option value="${item}" ${
                        item === selectedItem ? "selected" : ""
                    }>${item}</option>`
            )
            .join("");

    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";

    const form = createForm(`
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
                <select name="priority" id="priority" required>${generateOptions(
                    ["Low", "Medium", "High"],
                    task.priority
                )}</select>
            </div>
            <div class="form-group">
                <label for="project">Project</label>
                <select name="project" id="project" required>${generateOptions(
                    projects,
                    task.project
                )}</select>
            </div>
        </div>
        <div class="form-action">
            <button type="button" id="close-btn">Close</button>
            ${index !== null ? `<button type="button" id="delete-btn" >Delete</button>` : ""}
            <button type="submit" >Save</button>
        </div>
    `);

    modalBody.appendChild(form);

    document.querySelector("#close-btn").addEventListener("click", () => closeModal());
    document.querySelector("#delete-btn")?.addEventListener("click", () => {
        deleteTaskBy(task.id);
        closeModal();
        refreshPage2();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        saveTask(Object.fromEntries(new FormData(form).entries()), index);
        closeModal();
        refreshPage2();
    });
};

const closeModal = () => {
    document.querySelector("#modal-wrapper").style.display = "none";
};
