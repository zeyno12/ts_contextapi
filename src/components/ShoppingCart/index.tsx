import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import CartItem from '../CartItem'
import { formatCurrency } from '../../utils/formatCurrency'
import storeItems from '../../data/item.json'
type ShoppingCartProviderProps = {
    isOpen: boolean
}
const ShoppingCart = ({ isOpen }: ShoppingCartProviderProps) => {
    const { closeCart, cartItems } = useShoppingCart()!
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    CART
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id}  {...item} />
                    ))}
                    <div className='ms-auto fs-5 fw-bold'>
                        Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(i => i.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart