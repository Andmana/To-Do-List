export const currentState = {
    dueQuery: "today",
    groupQuery: null,
    isCompletedQuery: false,
    heroQuery: "Today",
    activeBarQuery: "today-task",
};

export const setCurrentState = (hero, isCompleted, due, group, activeBar) => {
    Object.assign(currentState, {
        heroQuery: hero,
        isCompletedQuery: isCompleted,
        dueQuery: due,
        groupQuery: group,
        activeBarQuery: activeBar,
    });
};

export const resetCurrentState = () => {
    Object.assign(currentState, {
        dueQuery: "today",
        groupQuery: null,
        isCompletedQuery: false,
        heroQuery: "Today",
        activeBarQuery: "today-task",
    });
};

export const printState = () => {
    console.log(currentState);
};
