import React, { useState } from "react";
import HollowFilledCircle from "./HollowFilledCircle";
import Task from "../data/Task";
import { getSunday, setDayOfWeek } from "../scripts/utils";
import { TextInput, View, StyleSheet, Button, Text } from "react-native";
import DeleteButton from "./DeleteButton";

interface WeekPickerProps {
    onNewDate: (newDate: Date) => void;
};

const WeekPicker = ({ onNewDate }: WeekPickerProps) => {
    const [date, setDate] = useState(getSunday(new Date()));

    const goBackwards = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 7);
        setDate(newDate);
        onNewDate(newDate);
    };

    const goForwards = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 7);
        setDate(newDate);
        onNewDate(newDate);
    };

    return (
        <View style={styles.container}>
            <Button title="<" onPress={goBackwards} color="gray" />
            <Text>Week of {date.toDateString()}</Text>
            <Button title=">" onPress={goForwards} color="gray" />
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
    },
    circleContainer: {
        flexDirection: "row",
        gap: 16,
    },
});

export default WeekPicker;
