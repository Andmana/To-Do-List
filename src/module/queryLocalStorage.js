import { Project } from "./Project";
import { isThisWeek, isToday, isTomorrow } from "date-fns";
import { Task } from "./Task";

const getFromLocalStorage = (key) =>
    JSON.parse(localStorage.getItem(key)) || [];

const mapProjects = (projects) => projects.map(({ name }) => new Project(name));

const mapTasks = (tasks) =>
    tasks.map(
        ({ title, description, dueDate, priority, project, isCompleted }) =>
            new Task(
                title,
                description,
                dueDate,
                priority,
                project,
                isCompleted
            )
    );

export function getAllProjects() {
    return mapProjects(getFromLocalStorage("projects").projects || []);
}

export function getAllTasks() {
    return mapTasks(getFromLocalStorage("tasks").tasks || []);
}

export function getAllTasksBy(isPending, due, project) {
    const filters = {
        today: isToday,
        tomorrow: isTomorrow,
        week: isThisWeek,
    };

    let tasks = getAllTasks();

    if (filters[due])
        tasks = tasks.filter((task) => filters[due](task.dueDate));
    if (isPending) tasks = tasks.filter((task) => !task.isCompleted);
    if (project) tasks = tasks.filter((task) => task.project === project);

    return tasks;
}

export const countAllTasksBy = (isPending, due, project) =>
    getAllTasksBy(isPending, due, project).length;

export function updateProjectsData(projects) {
    localStorage.setItem("projects", JSON.stringify({ projects }));
}

export function updateTasksData(tasks) {
    localStorage.setItem("tasks", JSON.stringify({ tasks }));
}
