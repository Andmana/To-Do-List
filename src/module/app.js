import { loadSideBar } from "./sidebar.js";
import { loadMain } from "./mainContent.js";
import { loadStaticIcon } from "./imageSauce.js";
import { addModalOperation, attachCloseModalEvent, modalAction } from "./modal.js";
import { resetCurrentState } from "./state.js";

export const init = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        loadSideBar();
        loadStaticIcon();
        loadMain();
        addModalOperation();
        attachCloseModalEvent();
    });
})();

export const refreshPage = () => {
    resetCurrentState();
    loadSideBar();
    loadMain();
};

export const refreshPage2 = () => {
    loadSideBar();
    loadMain();
};
