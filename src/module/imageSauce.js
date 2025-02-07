import allIcon from "../assets/icons/all.svg";
import completedIcon from "../assets/icons/completed.svg";
import logoIcon from "../assets/icons/logo.svg";
import addIcon from "../assets/icons/add.svg";
import todayIcon from "../assets/icons/today.svg";
import tomorrowIcon from "../assets/icons/tomorrow.svg";
import weekIcon from "../assets/icons/week.svg";
import sidebarIcon from "../assets/icons/sidebar.svg";

export const loadStaticIcon = () => {
    const taskIcons = [
        todayIcon,
        tomorrowIcon,
        weekIcon,
        allIcon,
        completedIcon,
    ];
    const taskImgs = document.querySelectorAll(".task-link > img");
    taskImgs.forEach((link, index) => {
        link.src = taskIcons[index];
    });

    document.querySelector("#sidebar-logo > img").src = sidebarIcon;
    document.querySelector("#header > img").src = logoIcon;
    document.querySelector("#add-task > img").src = addIcon;
    document.querySelector("#add-project > img").src = addIcon;
};
