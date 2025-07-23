/* eslint-disable react-hooks/exhaustive-deps */
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { ProductCardType } from '../types'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONT_FAMILY } from '../constants';
import { Plus, Star } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { AppRootState, useAppSelector } from '../store';

const IMAGE_WIDTH = Dimensions.get('window').width * 0.32
const ProductCard: React.FC<ProductCardType> = ({
  _id,
  image,
  name,
  brand,
  average_rate,
  price,
  onPress,
}) => {
  const opacity = useSharedValue(1)
  const inCard = useAppSelector((state: AppRootState) => state.cart.cartList.some(item => item._id === _id))
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
  // know if that product is existed in the cartList -> to disable the button
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })
  // animate the opacity to 0.5 when in card
  useEffect(() => {
    opacity.value = withSpring(inCard ? 0.5 : 1)
  }, [inCard])
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
      colors={[COLORS.primaryVeryWhite, COLORS.primaryVeryWhite + '40']}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.CardImage}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <Star
            color={COLORS.primaryOrange}
            size={16}
          />
          <Text style={styles.CardRatingText}>{Number(average_rate).toFixed(1)}</Text>
        </View>
      </ImageBackground>
      <View style={styles.CardDetailsWrapper}>

        <Text style={styles.CardTitle}>{name.length >= 22 ? name.slice(0, 22) + "..." : name}</Text>
        <Text style={styles.CardBrandName}>{brand}</Text>
        <View style={styles.CardFooterContainer}>
          <Text style={styles.CardPriceCurrency}>
            $ <Text style={styles.CardPriceAmount}>{price}</Text>
          </Text>
          <AnimatedTouchableOpacity
            disabled={inCard}
            style={[animatedStyle, styles.AddToCardButton]}
            onPress={onPress}>
            <Plus
              color={COLORS.primaryWhite}
              size={16}
            />
          </AnimatedTouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingVertical: 15,
    // paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 25,
    width: 175,
    minHeight: 300,
    display: 'flex',
  },
  CardImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
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
  CardRatingText: {
    fontFamily: FONT_FAMILY.poppins_medium,
    color: COLORS.primaryWhite,
    lineHeight: 22,
    fontSize: 14,
  },
  CardTitle: {
    fontFamily: FONT_FAMILY.poppins_medium,
    color: COLORS.primaryBlack,
    fontSize: 16,
  },
  CardBrandName: {
    fontFamily: FONT_FAMILY.poppins_light,
    color: COLORS.secondaryLightGrey,
    fontSize: 10,
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

export default ProductCard 
