import "./assets/css/styles.css";
import { generateIcon } from "./module/imageSauce";
import { updatePendingCount } from "./module/domManipulation";
import { generateProjectNavs } from "./module/domInitialize";
import { Task } from "./class/Task";
import { Project } from "./class/Project";
import { countAllTasksBy } from "./module/queryLocalStorage";
import { addDays } from "date-fns";
console.log("Hi Webpack");

let today = new Date();
const tasks = [
    new Task("Task 1", "Description 1", today, "Low", "Default", false),
    new Task("Task 1", "Description 1", today, "Medium", "Default", false),
    new Task("Task 2", "Description 2", today, "High", "Autonomous", false),
    new Task(
        "Task 3",
        "Description 3",
        addDays(today, 1),
        "Low",
        "Default",
        false
    ),
    new Task(
        "Task 4",
        "Description 4",
        addDays(today, 3),
        "High",
        "Autonomous",
        false
    ),
];

const projects = [new Project("Default"), new Project("Autonomous")];

window.count = (is, by) => {
    console.log(countAllTasksBy(is, by));
};
