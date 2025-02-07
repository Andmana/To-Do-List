import { loadSideBar } from "./sidebar.js";
import { loadMain } from "./mainContent.js";
import { loadStaticIcon } from "./imageSauce.js";
import { modalOperation } from "./modal.js";
import { resetCurrentState } from "./state.js";

export const init = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        loadSideBar();
        loadStaticIcon();
        loadMain();
        modalOperation();
    });
})();

export const refreshPage = () => {
    resetCurrentState();
    loadSideBar();
    loadMain();
};
