import React from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import storeItems from '../../data/item.json'
import { Stack, Button } from 'react-bootstrap'
import { formatCurrency } from '../../utils/formatCurrency'
type CartItemProps = {
    id: number
    quantity: number
}
const CartItem = ({ id, quantity }: CartItemProps) => {
    const { removeCartQuantity } = useShoppingCart()!
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
            <img src={item.imgURL} alt="img"
                style={{ width: "125px", objectFit: "cover", height: "75px" }}
            />
            <div className='me-auto'>
                <div>
                    <span >{item.name}</span>
                    {quantity > 1 && <span className='text-muted' style={{ fontSize: ".65rem" }}>{quantity}x</span>}
                </div>
                <div className='text-muted' style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <span> {formatCurrency(item.price * quantity)}</span>
            <Button variant='outline-danger' size='sm' onClick={() => removeCartQuantity(item.id)}>
                &times;
            </Button>
        </Stack>
    )
}

export default CartItem