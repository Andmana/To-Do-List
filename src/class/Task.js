import { format, isDate } from "date-fns";

export class Task {
    id;
    title;
    description;
    dueDate;
    priority;
    isCompleted;

    constructor(title, description, dueDate = "No date", priority, project, isCompleted) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.isCompleted = isCompleted;
    }

    get getFormatedDueDate() {
        let date = this.dueDate;
        if (typeof date === "string") {
            date = new Date(date);
        }
        if (!(date instanceof Date) || isNaN(date)) {
            return this.dueDate; // Return original if invalid
        }
        return format(date, "EEE, dd MMM yyyy");
    }
}
