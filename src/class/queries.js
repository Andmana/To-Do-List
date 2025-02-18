import { Project } from "./Project";
import { isThisWeek, isToday, isTomorrow } from "date-fns";
import { Task } from "./Task";

export const getFromLocalStorage = () => {
    const data = localStorage.getItem("myToDoList");
    return data ? JSON.parse(data) : {};
};

export const saveToLocalStorage = (projects, tasks) => {
    localStorage.setItem("myToDoList", JSON.stringify({ projects, tasks }));
};

export const updateLocalStorage = (projects = undefined, tasks = undefined) => {
    const data = getFromLocalStorage();
    if (projects != undefined) data.projects = projects;
    if (tasks != undefined) {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        data.tasks = tasks;
    }
    localStorage.setItem("myToDoList", JSON.stringify(data));
};

// Projects
export function getAllProjects() {
    let { projects = [] } = getFromLocalStorage();
    projects = mapProjects(projects);
    return projects;
}
const mapProjects = (projects) => projects.map(({ name }, index) => new Project(name, index));

export function getProjectByIndex(index) {
    return getAllProjects()[index];
}

export function saveProject(name, id = null) {
    let projects = getAllProjects();
    let exists = projects.some(
        (pj, index) => pj.name.toLowerCase() == name.toLowerCase() && index != id
    );
    if (exists) return;

    if (id != null && projects[id]) {
        projects[id].name = name;
    } else {
        projects.push(new Project(name));
    }
    updateLocalStorage(projects);
}

export function deleteProjectBy(index) {
    const projects = getAllProjects();
    const project = getProjectByIndex(index);
    let tasks = getAllTasks();
    tasks = tasks.filter((task) => task.project != project.name);
    projects.splice(index, 1);
    updateLocalStorage(projects, tasks);
}

// Tasks
export function getAllTasks() {
    let { tasks = [] } = getFromLocalStorage();
    tasks = mapTasks(tasks);
    return tasks;
}

const mapTasks = (tasks) =>
    tasks.map(
        ({ title, description, dueDate, priority, project, isCompleted }, index) =>
            new Task(title, description, priority, project, isCompleted, dueDate, index)
    );

export function getTaskByIndex(index) {
    return getAllTasks()[index];
}

export function getAllTasksBy(isCompleted, due, project) {
    const filters = {
        today: isToday,
        tomorrow: isTomorrow,
        week: isThisWeek,
    };

    let tasks = getAllTasks();

    if (filters[due]) tasks = tasks.filter((task) => filters[due](task.dueDate));
    if (isCompleted != null) tasks = tasks.filter((task) => task.isCompleted == isCompleted);
    if (project) tasks = tasks.filter((task) => task.project == project);

    return tasks;
}

export function updateTaskProgress(index) {
    const tasks = getAllTasks();
    tasks[index].isCompleted = tasks[index].isCompleted ? false : true;
    updateLocalStorage(undefined, tasks);
}

export function deleteTaskBy(index) {
    const tasks = getAllTasks();
    tasks.splice(index, 1);
    updateLocalStorage(undefined, tasks);
}

export const countAllTasksBy = (isCompleted, due, project) =>
    getAllTasksBy(isCompleted, due, project).length;

export function saveTask(objectForm, id = null) {
    let tasks = getAllTasks();
    let exists = tasks.some(
        (t, index) => t.title.toLowerCase() == objectForm.title.toLowerCase() && index != id
    );
    if (exists) return;

    const taskData = {
        title: objectForm.title,
        description: objectForm.description,
        dueDate: objectForm.dueDate || "No Date",
        priority: objectForm.priority,
        project: objectForm.project,
    };

    if (id != null && tasks[id]) {
        Object.assign(tasks[id], taskData);
    } else {
        tasks.push(
            new Task(
                taskData.title,
                taskData.description,
                taskData.priority,
                taskData.project,
                false,
                taskData.dueDate
            )
        );
    }
    updateLocalStorage(undefined, tasks);
}
