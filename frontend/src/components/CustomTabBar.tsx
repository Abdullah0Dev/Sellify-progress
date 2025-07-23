/* eslint-disable @typescript-eslint/no-shadow */
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { icons } from 'lucide-react-native'
import { COLORS } from '../constants'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MotiView } from 'moti'
import Animated, { LinearTransition, FadeInRight, FadeOutRight } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../store'

type iconName = keyof typeof icons
type iconProps = {
    name: iconName;
    color: string;
    size?: number;
}

function Icon({ name, color, size = 20 }: iconProps) {
    const IconComponent = icons[name]

    return <IconComponent color={color} size={size} />
}
type dataItem = {
    label: string;
    route: string;
    name: iconName
}
type CustomTabBarType = BottomTabBarProps & {
    data: dataItem[],
    onChange: (index: any) => void;

}
const CustomTabBar: React.FC<CustomTabBarType> = ({ data, onChange, state }) => {
    const { bottom } = useSafeAreaInsets()
    const { width } = Dimensions.get('window')
    const navigation = useNavigation()
    const cartList = useAppSelector((state: any) => state.cart.cartList)
    console.log("cartList", cartList.length);

    return (
        <MotiView
            from={{ marginBottom: 0, opacity: 0 }}
            animate={{ marginBottom: bottom, opacity: 1 }}
            transition={{
                type: 'spring',
                damping: 80,
                stiffness: 500,
            }}
            style={[styles.container, { marginHorizontal: width * 0.06 }]}>
            {data.map((item, index) => {
                const isSelected = state.index === index

                return (
                    <MotiView
                        key={index}
                        layout={LinearTransition.springify().damping(80).stiffness(200)}
                        animate={styles.itemView}
                    >
                        {!isSelected && item.route === 'Cart' && cartList.length > 0 && (
                            <View style={styles.productNumberContainer}>
                                <Text style={styles.productNumber}>{cartList.length} </Text>
                            </View>
                        )}

                        <Pressable
                            onPress={() => {
                                onChange?.(index)
                                navigation.navigate('MainTabs', { screen: item.route })
                            }}
                            style={[styles.itemButton, { backgroundColor: isSelected ? COLORS.primaryOrange : COLORS.primaryVeryWhite }]}>

                            <Icon name={item.name} color={isSelected ? COLORS.primaryVeryWhite : COLORS.primaryBlack} />

                            {isSelected && (
                                <Animated.Text
                                    style={[styles.text, { color: isSelected ? COLORS.primaryVeryWhite : COLORS.primaryBlack }]}
                                    exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                                    entering={FadeInRight.springify().damping(80).stiffness(200)}
                                >{item.label}
                                </Animated.Text>
                            )}
                        </Pressable>
                    </MotiView>
                )
            })}

        </MotiView>
    )
}

export default CustomTabBar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.primaryVeryWhite,
        borderRadius: 50,
        overflow: 'hidden',
        paddingVertical: 12,
    },
    itemView: {
        overflow: 'hidden',
    },
    itemButton: {
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 4,
    },
    text: {
        fontSize: 15,
        fontWeight: 'medium',
    },
    productNumberContainer: {
        position: 'absolute',
        top: 0,
        right: 1,
        width: 22,
        height: 22,
        backgroundColor: COLORS.primaryRed,
        borderRadius: 50,
        zIndex: 70,
        alignItems: 'center',
        justifyContent: 'center'

    },
    productNumber: {
        color: COLORS.primaryVeryWhite,
        alignSelf: 'center'
    }
})