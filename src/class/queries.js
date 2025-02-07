import { Project } from "./Project";
import { isThisWeek, isToday, isTomorrow } from "date-fns";
import { Task } from "./Task";

export const getFromLocalStorage = () => {
    const data = localStorage.getItem("myToDoList");
    return data ? JSON.parse(data) : {}; // Gracefully return empty object if not found
};

export const saveToLocalStorage = (projects, tasks) => {
    localStorage.setItem("myToDoList", JSON.stringify({ projects, tasks }));
};

export const updateLocalStorage = (projects = undefined, tasks = undefined) => {
    const data = getFromLocalStorage();
    if (projects !== undefined) data.projects = projects;
    if (tasks !== undefined) data.tasks = tasks;
    localStorage.setItem("myToDoList", JSON.stringify(data));
};

export function getAllProjects() {
    const { projects = [] } = getFromLocalStorage(); // Default to empty array if no projects
    return mapProjects(projects);
}

export function getAllTasks() {
    const { tasks = [] } = getFromLocalStorage(); // Default to empty array if no tasks
    return mapTasks(tasks);
}

const mapProjects = (projects) => projects.map(({ name }) => new Project(name));

const mapTasks = (tasks) =>
    tasks.map(
        ({ title, description, dueDate, priority, project, isCompleted }) =>
            new Task(title, description, dueDate, priority, project, isCompleted)
    );

export function getAllTasksBy(isCompleted, due, project) {
    const filters = {
        today: isToday,
        tomorrow: isTomorrow,
        week: isThisWeek,
    };

    let tasks = getAllTasks();

    if (filters[due]) tasks = tasks.filter((task) => filters[due](task.dueDate));
    if (isCompleted != null) tasks = tasks.filter((task) => task.isCompleted === isCompleted);
    if (project) tasks = tasks.filter((task) => task.project === project);

    return tasks;
}

export const countAllTasksBy = (isCompleted, due, project) =>
    getAllTasksBy(isCompleted, due, project).length;

// export function updateTasksData(tasks) {
//     tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
//     localStorage.setItem("tasks", JSON.stringify({ tasks }));
// }

export function saveProject(name, id = null) {
    let projects = getAllProjects();

    if (id !== null) {
        if (projects[id]) {
            projects[id].name = name;
            updateProjectsData(projects);
        }
    } else {
        if (projects.some((pj) => pj.name.toLowerCase() === name.toLowerCase())) {
            return;
        }

        // Create a new project and add it to the list
        const project = new Project(name);
        projects.push(project);
        updateLocalStorage(projects);
    }
}
