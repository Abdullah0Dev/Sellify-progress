/* eslint-disable @typescript-eslint/no-shadow */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartProductType, CartSliceType, ItemPrice } from '../types';

const initialState: CartSliceType = {
    //  cartList -> the items that are in the cart
    cartList: [],
    totalPrice: 0, // -> calc the total price
    totalItems: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add to cart
        addToCart(
            state,
            action: PayloadAction<CartProductType & { selectedSize: 'S' | 'M' | 'L' }>
        ) {
            //   item that passed 
            const newItem = action.payload;
            // check if the item is in the cart already
            const existingItem = state.cartList.find(item => item._id === newItem._id)
            // item in the cart => increment the size quantity
            if (existingItem) {
                // size of that item
                const sizeObj = existingItem.prices.find(product => product.size === newItem.selectedSize)
                // if the size is already existed so we'll increase the quantity of that size if not we'll add it...
                if (sizeObj) {
                    sizeObj.quantity = (sizeObj.quantity || 0) + 1;
                    state.totalItems += 1
                    state.totalPrice += sizeObj.price
                }
            } else {
                // if not -> add the new item to the cart....
                const updatedPrices = newItem.prices.map(product => product.size === newItem.selectedSize ? { ...product, quantity: 1 } : { ...product, quantity: 0 })
                // add that to the cart list
                state.cartList.push({
                    ...newItem, prices: updatedPrices
                })
                state.totalItems += 1
                // price should calc based on the price
                state.totalPrice += getPriceForSize(updatedPrices, newItem.selectedSize)
            }
        },
        // remove from cart
        removeFromCart(
            state,
            action: PayloadAction<{ _id: string, selectedSize: 'S' | 'M' | 'L' }>
        ) {
            const payloadItem = action.payload
            // which item it is -> which size -> remove it!!!
            const removedItem = state.cartList.find(item => item._id === payloadItem._id)
            if (!removedItem) return;
            // get the size
            const sizeObj = removedItem.prices.find(product => product.size === payloadItem.selectedSize)
            // if the size is already existed so we'll increase the quantity of that size if not we'll add it...
            if (sizeObj) {
                const quantityToRemove = sizeObj.quantity || 0
                sizeObj.quantity = 0;
                state.totalItems -= quantityToRemove
                state.totalPrice -= sizeObj.price * quantityToRemove;
            }
            // if all zeros -> quantities
            const allZero = removedItem.prices.every(product => product.quantity === 0)
            if (allZero) {
                state.cartList = state.cartList.filter(item => item._id !== removedItem._id)
            }

        },
        // increment the quantity
        incrementQuantity(
            state,
            action: PayloadAction<{ _id: string, selectedSize: 'S' | 'M' | 'L' }>
        ) {
            const payloadItem = action.payload
            const item = state.cartList.find(item => item._id === payloadItem._id)
            const sizeObj = item?.prices.find(product => product.size === payloadItem.selectedSize)


            if (item && sizeObj) {
                sizeObj.quantity += 1;
                state.totalItems += 1
                state.totalPrice += sizeObj.price;
            }
        },
        // decrement the quantity
        decrementQuantity(
            state,
            action: PayloadAction<{ _id: string, selectedSize: 'S' | 'M' | 'L' }>
        ) {
            const payloadItem = action.payload
            const item = state.cartList.find(item => item._id === payloadItem._id)
            const sizeObj = item?.prices.find(product => product.size === payloadItem.selectedSize)


            if (item && sizeObj && sizeObj.quantity > 0) {
                sizeObj.quantity -= 1;
                state.totalItems -= 1
                state.totalPrice -= sizeObj.price;
            }
            // if all quantities are 0 -> remove the product completely
            const totalQuantities = item?.prices.reduce((sum, p) => sum + p.quantity, 0)
            if (totalQuantities === 0) {
                // remove the complete product form the cartList
                state.cartList = state.cartList.filter(itm => itm._id !== item?._id)
            }
        },
        // clear the cart
        clearCart(state) {
            state.cartList = [];
            state.totalItems = 0
            state.totalPrice = 0
        }


    }
});

// helper func => calc the price
function getPriceForSize(prices: ItemPrice[], size: 'S' | 'M' | 'L'): number {
    return prices.find(p => p.size === size)?.price || 0
}
export const { 
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} = cartSlice.actions

export default cartSlice.reducer