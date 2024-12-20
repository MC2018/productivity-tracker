import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TaskTracker from "../components/TaskTracker";
import Task from "../data/Task";
import { useEffect, useState } from "react";
import TaskGroup from "../components/TaskGroup";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
    return (
        <View style={{
            backgroundColor: Colors.custom.background,
            width: "100%",
            height: "100%"
        }}>
            <TaskGroup></TaskGroup>
        </View>
    );
}
