import React, { useEffect, useState } from "react";
import ProgressCircle from "./ProgressCircle";
import Task from "../data/Task";
import { getSunday, setDayOfWeek } from "../scripts/utils";
import { TextInput, View, StyleSheet } from "react-native";
import DeleteButton from "./DeleteButton";
import { ProgressValue } from "../data/TaskWeekLog";
import { Colors } from "@/constants/Colors";

interface TaskTrackerProps {
    task: Task;
    index: number;
    dayInWeek: Date;
    onDelete: (guid: string) => void;
    onUpdate: (task: Task) => void;
};

const TaskTracker = ({ task, dayInWeek, onDelete, onUpdate }: TaskTrackerProps) => {
    const weeklyProgress = task.getWeekLog(dayInWeek).weeklyProgress;

    const handleCircleClick = (dayIndex: number, newValue: ProgressValue) => {
        const sunday = getSunday(dayInWeek);
        task.updateLog(setDayOfWeek(sunday, dayIndex), newValue);
        onUpdate(task);
    };

    const updateName = (name: string) => {
        task.name = name;
        onUpdate(task);
    };

    const handleDeleteConfirm = () => {
        onDelete(task.guid);
    };

    return (
        <View style={styles.container}>
            <DeleteButton onConfirm={handleDeleteConfirm} itemName={task.name}></DeleteButton>
            <TextInput
                style={styles.input}
                value={task.name}
                onChangeText={updateName}
                placeholder="Enter Topic Name"
            />
            <View style={styles.circleContainer}>
                {Array.from({ length: weeklyProgress.length }).map((_, index) => (
                    <ProgressCircle
                        key={index}
                        progressValue={weeklyProgress[index]}
                        index={index}
                        onCircleClick={handleCircleClick}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginVertical: 8,
    },
    input: {
        padding: 10,
        fontSize: 16,
        width: 200,
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 4,
        color: Colors.custom.text
    },
    circleContainer: {
        flexDirection: "row",
        gap: 16,
    },
});

export default TaskTracker;
