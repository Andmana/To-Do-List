import { Project } from "../class/Project";
import { isThisWeek, isToday, isTomorrow } from "date-fns";
import { Task } from "../class/Task";

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

export function getAllTasksBy(isCompleted, due, project) {
    const filters = {
        today: isToday,
        tomorrow: isTomorrow,
        week: isThisWeek,
    };

    let tasks = getAllTasks();

    if (filters[due])
        tasks = tasks.filter((task) => filters[due](task.dueDate));
    if (isCompleted != null)
        tasks = tasks.filter((task) => task.isCompleted === isCompleted);
    if (project) tasks = tasks.filter((task) => task.project === project);

    return tasks;
}

export const countAllTasksBy = (isCompleted, due, project) =>
    getAllTasksBy(isCompleted, due, project).length;

export function updateProjectsData(projects) {
    localStorage.setItem("projects", JSON.stringify({ projects }));
}

export function updateTasksData(tasks) {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    localStorage.setItem("tasks", JSON.stringify({ tasks }));
}
