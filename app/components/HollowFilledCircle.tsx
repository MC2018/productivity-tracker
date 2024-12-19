import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Pressable } from "react-native";
import { getNextProgressValue, ProgressValue } from "../data/TaskWeekLog";

interface HollowFilledCircleProps {
    index: number,
    progressValue: ProgressValue,
    onCircleClick: (index: number, nextValue: ProgressValue) => void;
};

const HollowFilledCircle = ({ index, progressValue, onCircleClick }: HollowFilledCircleProps) => {
    return (
        <Pressable style={[styles.container]} onPress={() => {
            onCircleClick(index, getNextProgressValue(progressValue));
        }}>
            <View
                style={[
                    styles.circle,
                    { backgroundColor: progressValue == 1 ? "blue" : "transparent" }
                ]}>
            </View>
            <View
                style={[
                    styles.semicircle,
                    { backgroundColor: progressValue == 0.5 ? "blue" : "transparent" }
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
        borderColor: "blue",
        zIndex: 2
    },semicircle: {
        width: 50,
        height: 25,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginTop: 25,
        zIndex: 1,
        position: "absolute"
    },
});

export default HollowFilledCircle;