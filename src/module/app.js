import { loadSideBar, setupTaskNavEvents, sidebarDisplayEvent } from "./sidebar.js";
import { loadMain } from "./mainContent.js";
import { loadStaticIcon } from "./imageSauce.js";
import { addModalOperation, attachCloseModalEvent, modalAction } from "./modal.js";
import { resetCurrentState, setActiveNav } from "./state.js";

export const init = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        sidebarDisplayEvent();
        setActiveNav("today-task");
        setupTaskNavEvents();
        loadSideBar();
        loadStaticIcon();
        loadMain();
        addModalOperation();
        attachCloseModalEvent();
    });
})();

// Today
export const refreshPage = () => {
    resetCurrentState();
    loadSideBar();
    loadMain();
};

// Current
export const refreshPage2 = () => {
    loadSideBar();
    loadMain();
};
