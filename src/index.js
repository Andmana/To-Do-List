import "./assets/css/styles.css";

import { Task } from "./class/Task";
import { Project } from "./class/Project";
import {
    countAllTasksBy,
    getAllTasks,
    getAllTasksBy,
    updateProjectsData,
    updateTasksData,
} from "./module/queryLocalStorage";
import { addDays } from "date-fns";

console.log("Hi Webpack");

let today = new Date();
const tasks = [
    new Task("Task 0", "Description 1", today, "Low", "Default", false),
    new Task("Task 1", "Description 1", today, "Medium", "Default", true),
    new Task("Task 2", "Description 2", today, "High", "Autonomous", false),
    new Task(
        "Task 3",
        "Description 3",
        addDays(today, 10),
        "Low",
        "Default",
        true
    ),
    new Task(
        "Task 4",
        "Description 4",
        addDays(today, 3),
        "High",
        "Autonomous",
        true
    ),
    new Task("Task 5", "Description 4", undefined, "High", "Default", true),
    new Task("Task 6", "Description 4", undefined, "High", "Autonomous", true),
    new Task("Task 7", "Description 4", today, "High", "Autonomous", false),
    new Task("Task 8", "Description 4", today, "High", "Autonomous", false),
    new Task(
        "Task 9",
        "Description 4",
        addDays(today, 1),
        "High",
        "Autonomous",
        false
    ),
    new Task(
        "Task 10",
        "Description 4",
        addDays(today, 1),
        "High",
        "Autonomous",
        false
    ),
];

const projects = [new Project("Default"), new Project("Autonomous")];

updateProjectsData(projects);
updateTasksData(tasks);

window.retrive = (is, by, group) => {
    console.log(getAllTasksBy(is, by, group));
};

window.get = () => {
    console.log(getAllTasks());
};

import { renderUI } from "./module/renderUi";
