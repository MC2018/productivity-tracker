export default class TaskWeekLog {
    weekStart: Date;
    weeklyProgress: ProgressValue[];

    constructor(weekStart: Date, weeklyProgress: ProgressValue[]) {
        this.weekStart = weekStart;
        this.weeklyProgress = weeklyProgress;
    }

    static generate(rawData: any) {
        const taskWeekLog = new TaskWeekLog(new Date(rawData.weekStart), rawData.weeklyProgress);
        return taskWeekLog;
    }
}

export type ProgressValue = 0 | 0.5 | 1;

export function getNextProgressValue(lastValue: ProgressValue): ProgressValue {
    switch (lastValue) {
        case 0:
            return 0.5;
        case 0.5:
            return 1;
        case 1:
            return 0;
    }
}