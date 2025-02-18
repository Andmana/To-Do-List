export class Project {
    id;
    constructor(name, id = null) {
        this.name = name;
        this.id = id;
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
