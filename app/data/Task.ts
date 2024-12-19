import { generateGuid, getSunday } from "../scripts/utils";
import TaskWeekLog, { ProgressValue } from "./TaskWeekLog";

export default class Task {
    guid: string;
    name: string;
    weekLogs: TaskWeekLog[] = [];


    constructor(name: string) {
        this.name = name;
        this.guid = generateGuid();
    }

    static generate(rawData: any) {
        const task = new Task(rawData.name);
        const weekLogs: TaskWeekLog[] = [];
        
        for (const rawWeekLog of rawData.weekLogs) {
            weekLogs.push(TaskWeekLog.generate(rawWeekLog));
        }

        task.weekLogs = weekLogs;
        task.guid = rawData.guid;
        return task;
    }

    getWeekLog(date: Date) {
        const sunday = getSunday(date);
        this.ensureWeekLogExists(sunday);
        const weekLog = this.weekLogs.filter(x => x.weekStart.getTime() == sunday.getTime())[0];
        
        return weekLog;
    }

    private ensureWeekLogExists(date: Date) {
        const sunday = getSunday(date);
        const weekLog = this.weekLogs.filter(x => x.weekStart.getTime() == sunday.getTime());

        if (weekLog.length) {
            return weekLog[0];
        }

        const newWeekLog = {
            weekStart: sunday,
            weeklyProgress: Array(7).fill(0)
        };
        this.weekLogs.push(newWeekLog);
        return newWeekLog;
    }

    updateLog(dateToUpdate: Date, completed: ProgressValue) {
        this.ensureWeekLogExists(dateToUpdate);
        const dayIndex = dateToUpdate.getDay();
        const weekLog = this.getWeekLog(dateToUpdate);
        weekLog.weeklyProgress[dayIndex] = completed;
    }
}