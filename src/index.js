import "./assets/css/styles.css";

import { Task } from "./class/Task";
import { Project } from "./class/Project";
import { addDays } from "date-fns";

//Run JS
import { init } from "./module/app";

import {
    getAllProjects,
    getAllTasks,
    getFromLocalStorage,
    getTaskByIndex,
    saveToLocalStorage,
} from "./class/queries";

const today = new Date();
let tasks = [new Task("Task1", "", "High", "Default", false, today)];

const projects = [new Project("Default")];
let data = getFromLocalStorage();
if (Object.keys(data).length === 0) {
    saveToLocalStorage(projects, tasks);
}

window.retrive = (is, by, group) => {
    console.log(getAllTasksBy(is, by, group));
};

window.get = () => {
    console.log(getAllTasks());
};
window.getId = () => {
    console.log(getTaskByIndex(0));
};

window.getProjects = () => getAllProjects();
