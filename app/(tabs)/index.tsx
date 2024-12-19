import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TaskTracker from "../components/TaskTracker";
import Task from "../data/Task";
import { useEffect, useState } from "react";
import TaskGroup from "../components/TaskGroup";

export default function HomeScreen() {
    return (
        <TaskGroup></TaskGroup>
    );
}
