import React, { useEffect, useState } from "react";
import TaskTracker from "./TaskTracker";
import Task from "../data/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import WeekPicker from "./WeekPicker";
import { Colors } from "@/constants/Colors";

const TaskGroup = () => {
    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [ dayInWeek, setDayInWeek ] = useState<Date>(new Date(Date.now()));

    const addTask = () => {
        const newTask = new Task("New Task");
        setTasks([...tasks, newTask]);
    };

    const updateTask = async (task: Task) => {
        const newTasks = tasks.map(x => x.guid == task.guid ? task : x);
        setTasks(newTasks);
        await saveTasks();
    }

    const saveTasks = async (newTasks: Task[] = tasks) => {
        await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
    }

    const deleteTask = async (guid: string) => {
        const newTasks = tasks.filter(x => x.guid != guid);
        setTasks(newTasks);
        await saveTasks(newTasks);
    };

    const loadTasks = async () => {
        const tasksStr = await AsyncStorage.getItem("tasks");

        if (tasksStr == null) {
            return;
        }

        const rawTasks = JSON.parse(tasksStr);
        const result: Task[] = [];

        for (const rawTask of rawTasks) {
            result.push(Task.generate(rawTask));
        }

        setTasks(result);
    };

    useEffect(() => {
        (async () => {
            await loadTasks();
        })();
    }, []);

    const handleNewDate = (newDate: Date) => {
        setDayInWeek(newDate);
        tasks
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.weekPicker}>
                <WeekPicker onNewDate={handleNewDate} />
            </View>
            {tasks.map((task, index) => (
                <TaskTracker
                    key={task.guid}
                    index={index}
                    dayInWeek={dayInWeek}
                    task={task}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                />
            ))}

            <Button title="+ Add Task" onPress={addTask} color={Colors.custom.button} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    weekPicker: {
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export default TaskGroup;
