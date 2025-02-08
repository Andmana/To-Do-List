import { isDate } from "date-fns";
import { getAllProjects, getTaskByIndex, saveProject, saveTask } from "../class/queries";
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
    let projectsOpt = "";
    projects.forEach((project) => {
        if (task.project == project.name)
            projectsOpt += `<option value="${project.name}" selected>${project.name}</option>`;
        else projectsOpt += `<option value="${project.name}">${project.name}</option>`;
    });
    const priorities = ["Low", "Medium", "High"];
    let priorityOpt = "";
    priorities.forEach((priority) => {
        if (task.priority == priority)
            priorityOpt += `<option value="${priority}" selected>${priority}</option>`;
        else priorityOpt += `<option value="${priority}">${priority}</option>`;
    });

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
                                <label for="title">Title</label>
                                <input type="text" id="title" name="title" value="${
                                    task.title || ""
                                }" required>
                            </div>

                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea id="description" name="description" rows="3" cols="40" wrap="soft" value="${
                                    task.description || ""
                                }"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="dueDate">Date</label>
                                <input type="date" id="dueDate" name="dueDate" value="${
                                    task.dueDate !== "No Date" ? task.dueDate : ""
                                }">
                            </div>

                            <div class="form-group">
                                <label for="priority">Priority</label>
                                <select name="priority" id="priority" required value="${
                                    task.priority
                                }">
                                    ${priorityOpt}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="project">Project</label>
                                <select name="project" id="project" required>
                                    ${projectsOpt}
                                </select>
                            </div>
                        `;
    form.appendChild(formInput);
    // Modal Action
    const formAction = document.createElement("div");
    formAction.className = "form-action";
    form.appendChild(formAction);

    if (index === null) {
        const btn = document.createElement("button");
        btn.textContent = "close";
        btn.type = "button";
        formAction.appendChild(btn);

        btn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    } else {
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.type = "button";
        formAction.appendChild(btn);

        btn.addEventListener("click", () => {
            alert("delete task");
            modal.style.display = "none";
        });
    }

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

        saveTask(objectForm, index);
        refreshPage2();
        modal.style.display = "none";
    });
};
