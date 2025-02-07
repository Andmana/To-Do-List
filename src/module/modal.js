import { saveProject } from "../class/queries";
import { refreshPage } from "./app";

export const modalOperation = () => {
    const projectButton = document.querySelector("#add-project");
    projectButton.addEventListener("click", () => {
        openModal();
        loadProjectForm();
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
    modalBody.innerHTML = `
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name">
                            </div>
                        `;
    const formAction = document.querySelector(".form-save");
    formAction.innerHTML = "";
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "save";
    formAction.appendChild(saveBtn);

    saveBtn.addEventListener("click", () => {
        const name = document.querySelector("#name");
        alert(name.value);
        saveProject(name.value);
        refreshPage();
        modal.style.display = "none";
    });
};
