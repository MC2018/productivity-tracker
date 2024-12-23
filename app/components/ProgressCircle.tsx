import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Pressable } from "react-native";
import { getNextProgressValue, ProgressValue } from "../data/TaskWeekLog";
import { Colors } from "@/constants/Colors";

interface ProgressCircleProps {
    index: number,
    progressValue: ProgressValue,
    onCircleClick: (index: number, nextValue: ProgressValue) => void;
};

const ProgressCircle = ({ index, progressValue, onCircleClick }: ProgressCircleProps) => {
    return (
        <Pressable style={[styles.container]} onPress={() => {
            onCircleClick(index, getNextProgressValue(progressValue));
        }}>
            <View
                style={[
                    styles.circle,
                    {
                        backgroundColor: progressValue == 0 ? "transparent" : Colors.custom.progressCircleColor,
                        position: "absolute"
                    }
                ]}>
            </View>
            
            {progressValue == 0.5 ? <View style={styles.hideSemicircle}></View> : <></>}
            <View style={[
                styles.circle,
                { backgroundColor: "transparent" }
            ]}>

            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        position: "relative"
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Colors.custom.progressCircleColor
    },hideSemicircle: {
        width: 50,
        height: 25,
        backgroundColor: Colors.custom.background,
        position: "absolute"
    }
});

export default ProgressCircle;