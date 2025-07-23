import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PaymentFooter from '../components/PaymentFooter'
import { MotiView } from 'moti'
import CartItem from '../components/CartItem'
import { AppRootState, useAppDispatch, useAppSelector } from '../store'

const CartScreen = () => {
  const CartList = useAppSelector((state: AppRootState) => state.cart.cartList)
  const totalPrice = useAppSelector((state: AppRootState) => state.cart.totalPrice)

  const dispatch = useAppDispatch()

  return (
    <SafeAreaView style={styles.cartContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.ItemsContainer}>
          {CartList.length === 0 ? (
            <EmptyListAnimation title='Cart Is Empty' />
          ) : (
            <View style={styles.listItemContainer}>
              {
                CartList.map((item, index) => (
                  <MotiView
                    key={index}
                  >
                    <CartItem
                      brand={item.brand}
                      _id={item._id ?? ""}

                      prices={item.prices}
                      name={item.name}
                      image={item.images[0]}
                    />
                  </MotiView>
                ))
              }
            </View>
          )}
        </View>
        <PaymentFooter
          price={totalPrice}
          onPress={() => dispatch({
            type: "cart/clearCart",
            payload: {}
          })}
          buttonTitle={"Order Now"}
          loading={false}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  ItemsContainer: {
    flex: 1
  },
  listItemContainer: {
    gap: 20,
    // paddingHorizontal: 20
  }
})