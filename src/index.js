import "./assets/css/styles.css";

import { Task } from "./class/Task";
import { Project } from "./class/Project";
import { addDays } from "date-fns";

import { getAllProjects, getAllTasks, updateProjectsData, updateTasksData } from "./class/queries";

let today = new Date();
let projects = getAllProjects();
let tasks = getAllTasks();
if (!projects) {
    tasks = [
        new Task("Task 0", "Description 1", today, "Low", "Default", false),
        new Task("Task 1", "Description 1", undefined, "Medium", "Default", true),
        new Task("Task 2", "Description 2", addDays(today, 1), "High", "Default", false),
        new Task("Task 3", "Description 3", addDays(today, 8), "Low", "Default", true),
    ];

    projects = [new Project("Default")];

    updateProjectsData(projects);
    updateTasksData(tasks);
}

window.retrive = (is, by, group) => {
    console.log(getAllTasksBy(is, by, group));
};

window.get = () => {
    console.log(getAllTasks());
};

import { init } from "./module/app";

import { printState } from "./module/state";
window.state = () => printState();
