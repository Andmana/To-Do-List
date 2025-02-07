import { saveProject } from "../class/queries";
import { refreshPage } from "./app";

export const modalOperation = () => {
    const projectButton = document.querySelector("#add-project");
    projectButton.addEventListener("click", () => {
        openModal();
        loadProjectForm();
    });
    // closeModal();
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

        saveProject(objectForm.name);
        refreshPage();
        modal.style.display = "none";
    });
};
