import { format } from "date-fns";

export class Task {
    title;
    description;
    dueDate;
    priority;
    isCompleted;

    constructor(
        title,
        description,
        dueDate = "No date",
        priority,
        project,
        isCompleted
    ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.isCompleted = isCompleted;
    }

    get getFormatedDueDate() {
        return format(this.dueDate, "EEE, dd MMM yyyy");
    }
}
