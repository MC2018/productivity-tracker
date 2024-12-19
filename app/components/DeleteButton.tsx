import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from "react-native";

interface DeleteButtonProps {
    onConfirm: () => void;
    itemName?: string;
}

const DeleteButton = ({ onConfirm, itemName }: DeleteButtonProps) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteClick = () => setShowConfirm(true);

    const handleConfirm = () => {
        setShowConfirm(false);
        onConfirm();
    };

    const handleCancel = () => setShowConfirm(false);

    return (
        <View>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteClick}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>

            <Modal
                transparent
                visible={showConfirm}
                animationType="slide"
                onRequestClose={handleCancel}
            >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Confirm Deletion</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to delete{" "}
                            <Text style={styles.itemName}>{itemName || "this item"}</Text>?
                        </Text>
                        <View style={styles.modalButtons}>
                            <Button title="Confirm" onPress={handleConfirm} color="red" />
                            <Button title="Cancel" onPress={handleCancel} color="gray" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: 300,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    itemName: {
        fontWeight: "bold",
    },
    modalButtons: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

export default DeleteButton;
