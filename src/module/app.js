import { loadSideBar, setupTaskNavEvents, sidebarDisplayEvent } from "./sidebar.js";
import { attachShowCompleted, loadMain } from "./mainContent.js";
import { loadStaticIcon } from "./imageSauce.js";
import { addModalOperation, attachCloseModalEvent, modalAction } from "./modal.js";
import { resetCurrentState, setActiveNav } from "./state.js";

export const init = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        // Sidebar
        sidebarDisplayEvent();
        setActiveNav("today-task");
        setupTaskNavEvents();
        loadSideBar();
        // Icon
        loadStaticIcon();
        // Main Content
        attachShowCompleted();
        loadMain();
        // Modal
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
