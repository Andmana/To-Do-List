import "./assets/css/styles.css";

import { Task } from "./class/Task";
import { Project } from "./class/Project";
import { addDays } from "date-fns";

//Run JS
import { init } from "./module/app";

import { getAllTasks, getFromLocalStorage, saveToLocalStorage } from "./class/queries";

let tasks = [new Task("Task 0", "Description 1", today, "Low", "Default", true)];

projects = [new Project("Default")];
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
