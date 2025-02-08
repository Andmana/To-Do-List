import { getAllProjects, saveProject, saveTask } from "../class/queries";
import { refreshPage, refreshPage2 } from "./app";

export const modalProjectOperation = () => {
    const projectButton = document.querySelector("#add-project");
    projectButton.addEventListener("click", () => {
        openModal();
        loadProjectForm();
    });
    closeModal();
};

export const modalTaskOperation = () => {
    const projectButton = document.querySelector("#add-task");
    projectButton.addEventListener("click", () => {
        openModal();
        loadTaskForm();
    });
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

const loadTaskForm = () => {
    const projects = getAllProjects();
    let projectsOpt = "";
    projects.forEach((project) => {
        projectsOpt += `<option value="${project.name}">${project.name}</option>`;
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
                                <input type="text" id="title" name="title" required>
                            </div>

                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea id="description" name="description" rows="3" cols="40" wrap="soft"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="dueDate">Date</label>
                                <input type="date" id="dueDate" name="dueDate">
                            </div>

                            <div class="form-group">
                                <label for="priority">Priority</label>
                                <select name="priority" id="priority" required>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
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

        alert(JSON.stringify(objectForm));

        saveTask(objectForm);
        refreshPage2();
        modal.style.display = "none";
    });
};
