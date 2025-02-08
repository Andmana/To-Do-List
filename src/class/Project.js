export class Project {
    id;
    constructor(name) {
        this.name = name;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    getTasks(isCompleted) {
        return this.tasks.filter((task) => task.isCompleted === isCompleted);
    }

    countPendingTasks() {
        return this.tasks.filter((task) => task.isCompleted === false).length;
    }

    countCompletedTasks() {
        return this.tasks.filter((task) => task.isCompleted === true).length;
    }
}
