import React from "react"
import { Cart, CartItem } from "./types/Cart"

type AppState = {
   cart: Cart 
}

const initialState: AppState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") 
                    ? JSON.parse(localStorage.getItem("cartItems")!) 
                    : [],
        deliveryInfo: localStorage.getItem("deliveryInfo") 
                    ? JSON.parse(localStorage.getItem("deliveryInfo")!) 
                    :{},
        totalPrice: 0,
    },
}

type Action = {type: 'ADD_TO_CART' , payload: CartItem}
            | { type: 'REMOVE_FROM_CART', payload: CartItem}

function reducer(state: AppState, action: Action): AppState {
    switch(action.type) {
        case 'ADD_TO_CART': {
            const newCartItem = action.payload
            const existCartItem = state.cart.cartItems.find((item : CartItem) => item.id === newCartItem.id)
            const cartItems = existCartItem 
                            ? state.cart.cartItems.map((item: CartItem) => item.id === existCartItem.id ? newCartItem : item)
                            : [...state.cart.cartItems, newCartItem]
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        }
        case "REMOVE_FROM_CART":{
            const cartItems = state.cart.cartItems.filter((item: CartItem) => item.id !== action.payload.id)
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        }
        default:{
            return state
        }
    }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<object>) {
    const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
        reducer,
        initialState
    )

    return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }