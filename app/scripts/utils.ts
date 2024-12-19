import uuid from "react-native-uuid";

export function getSunday(date: Date) {
    const dayOfWeek = date.getDay(); // 0 is Sunday
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - dayOfWeek);
    sunday.setHours(0, 0, 0, 0);
    return sunday;
}

export function setDayOfWeek(date: Date, dayIndex: number): Date {
    const newDate = new Date(date); // Clone the date to avoid modifying the original
    const currentDay = newDate.getDay(); // 0 is Sunday
    newDate.setDate(newDate.getDate() + (dayIndex - currentDay));
    return newDate;
}

export function generateGuid() {
    return uuid.v4();
}