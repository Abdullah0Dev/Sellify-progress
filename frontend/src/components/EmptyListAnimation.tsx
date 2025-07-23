import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { COLORS, FONT_FAMILY, lottieUrl } from '../constants';
type EmptyListAnimationType = {
    title: string;
}
const EmptyListAnimation: React.FC<EmptyListAnimationType> = ({ title }) => {
    return (
        <View style={styles.EmptyCardContainer}>
            <LottieView
                style={styles.LottieStyle}
                source={{ uri: lottieUrl }}
                autoPlay
                loop
            />
            <Text style={styles.LottieText}>{title}</Text>
        </View>
    )
}

export default EmptyListAnimation

const styles = StyleSheet.create({
    EmptyCardContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    LottieStyle: {
        height: 300

    },
    LottieText: {
        fontSize: 16,
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryOrange,
        textAlign: 'center',
    }
})