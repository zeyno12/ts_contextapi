import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hook/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    name: string
    quantity: number
}
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeCartQuantity: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}
interface ShoppingCartContextProps {
    getItemQuantity: (itemId: number) => number;
    increaseCartQuantity: (itemId: number) => void;
    decreaseCartQuantity: (itemId: number) => void;
    removeCartQuantity: (itemId: number) => void;
    cartItems: CartItem[];
    cartQuantity: number;
    openCart: () => void;
    closeCart: () => void;
}
const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);


export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({ children }:
    ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping', [])

    const cartQuantity = cartItems.reduce((quantity: number, item: any) =>
        item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id: number) {
        setCartItems((currItems: any) => {
            if (currItems.find((item: any) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map((item: any) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id: number) {
        setCartItems((currItems: any) => {
            if (currItems.find((item: any) => item.id === id)?.quantity == 1) {
                return currItems.filter((item: any) => item.id !== id)
            } else {
                return currItems.map((item: any) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeCartQuantity(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeCartQuantity, cartItems, cartQuantity, openCart, closeCart }}>
        {children}
        <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
}