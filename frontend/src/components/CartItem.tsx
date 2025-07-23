/* eslint-disable @typescript-eslint/no-shadow */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONT_FAMILY } from '../constants';
import { Minus, Plus } from 'lucide-react-native';
import { ItemPrice } from '../types';
import { useAppDispatch } from '../store';

type CartItemType = {
    _id: string;
    name: string;
    image: string;
    brand: string;
    prices: ItemPrice[]
}

const CartItem: React.FC<CartItemType> = ({
    _id,
    name,
    image,
    brand,
    prices,
}) => {

    const dispatch = useAppDispatch()

    const handleIncrementCartItemQuantity = (_id: string, size: string) => {
        dispatch({
            type: "cart/incrementQuantity",
            payload: { _id, selectedSize: size }
        })
    }
    const handleDecrementCartItemQuantity = (_id: string, size: string) => {
        dispatch({
            type: "cart/decrementQuantity",
            payload: { _id, selectedSize: size }
        })
    }
    const mainPrices = prices.filter(item => item.quantity !== 0)
    return (
        <View>
            {mainPrices.length > 1 ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cartItemLinearGradient}
                    colors={[COLORS.primaryVeryWhite, COLORS.primaryVeryWhite]}>

                    <View style={styles.cartItemInfoDetails}>
                        <Image source={{ uri: image }}
                            style={styles.CartImage}
                            resizeMode="cover" />

                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CardTitle}>{name}</Text>
                                <Text style={styles.CardBrandName}>{brand}</Text>
                            </View>
                        </View>

                    </View>

                    {
                        mainPrices.map((item, index) => (
                            <View key={index} style={styles.cartItemRowQntContainer} >
                                <View style={styles.CartItemSizeContainer}>
                                    <View style={styles.sizeBoxContainer}>
                                        <Text style={styles.SizeBoxText}> {item.size}</Text>
                                    </View>
                                    <Text style={styles.CardPriceCurrency}>
                                        $ <Text style={styles.CardPriceAmount}>{item.price}</Text>
                                    </Text>
                                </View>
                                <View style={styles.CartItemQntContainer}>
                                    <TouchableOpacity
                                        style={styles.AddToCardButton}
                                        onPress={() => handleDecrementCartItemQuantity(_id, item.size)}>
                                        <Minus
                                            color={COLORS.primaryWhite}
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.CartItemQnt}>
                                        <Text style={styles.CartItemQntText}> {item.quantity} </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.AddToCardButton}
                                        onPress={() => handleIncrementCartItemQuantity(_id, item.size)}
                                    >
                                        <Plus
                                            color={COLORS.primaryWhite}
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        ))
                    }
                    <View style={styles.extraPadding} />
                </LinearGradient >
            ) : (
                // single size
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cartItemSingleLinearGradient}
                    colors={[COLORS.primaryVeryWhite, COLORS.primaryVeryWhite + '40']}>
                    <View>

                        <Image source={{ uri: image }}
                            style={styles.CardSingleImage}
                            resizeMode="cover" />
                    </View>

                    {/* product details */}
                    <View style={styles.CardItemInfoSingleContainer}>
                        {/* title & brand */}
                        <View>
                            <Text style={styles.CardTitle}>{name}</Text>
                            <Text style={styles.CardBrandName}>{brand}</Text>
                        </View>
                        {/* size & price */}
                        <View style={styles.CartItemSingleSizeContainer}>
                            <View style={styles.sizeBoxContainer}>
                                <Text style={styles.SizeBoxText}> {mainPrices[0].size}</Text>
                            </View>
                            <Text style={styles.CardPriceCurrency}>
                                $ <Text style={styles.CardPriceAmount}>{mainPrices[0].price}</Text>
                            </Text>
                        </View>

                        <View style={styles.CartItemSingleQntContainer}>
                            <TouchableOpacity
                                style={styles.AddToCardButton}
                                onPress={() => handleDecrementCartItemQuantity(_id, mainPrices[0].size)}>
                                <Minus
                                    color={COLORS.primaryWhite}
                                    size={16}
                                />
                            </TouchableOpacity>
                            <View style={styles.CartItemQnt}>
                                <Text style={styles.CartItemQntText}> {mainPrices[0].quantity} </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.AddToCardButton}
                                onPress={() => handleIncrementCartItemQuantity(_id, mainPrices[0].size)}>
                                <Plus
                                    color={COLORS.primaryWhite}
                                    size={16}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </LinearGradient>
            )
            }
        </View >
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItemSingleLinearGradient: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 25,
    },
    extraPadding: {
        height: 20,
    },
    cartItemLinearGradient: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 12,
        // paddingHorizontal: 12,
        // paddingBottom : 12,
        padding: 12,
        borderRadius: 25,
    },
    cartItemRowQntContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20,
        paddingRight: 20,
        height: 55,
    },
    CartItemQntContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cartItemInfoDetails: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        flex: 1,
        // marginBottom: 12
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: 4,
        justifyContent: 'space-between'
    },
    CardItemInfoSingleContainer: {
        display: 'flex',
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around'
    },

    CartItemSizeContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between'
    },
    CartImage: {
        width: 130,
        height: 90,
        borderRadius: 10,
    },
    CardSingleImage: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    CartItemSingleSizeContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        // rowGap: 5
        justifyContent: 'space-evenly'

    },
    CartItemSingleQntContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 70,
        marginTop: -12

    },
    CartItemQnt: {
        backgroundColor: COLORS.primaryVeryWhite,
        height: 38,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primaryOrange
    },
    CartItemQntText: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryGrey,
        fontSize: 16
    },
    sizeBoxContainer: {
        backgroundColor: COLORS.primaryWhite,
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    SizeBoxText: {
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryLightGrey + 'AA'
    },
    AddToCardButton: {
        backgroundColor: COLORS.primaryOrange,
        padding: 7,
        borderRadius: 8
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 15,
        position: 'absolute',
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        top: 0,
        right: 0,
    },
    CardTitle: {
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryBlack,
        fontSize: 18,
    },
    CardBrandName: {
        fontFamily: FONT_FAMILY.poppins_light,
        color: COLORS.secondaryLightGrey,
        fontSize: 11,
    },
    CardFooterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 22
    },
    CardPriceCurrency: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryOrange,
        fontSize: 18,
    },
    CardPriceAmount: {
        color: COLORS.primaryBlack,
    },
    CardDetailsWrapper: {
        paddingHorizontal: 18
    }
});