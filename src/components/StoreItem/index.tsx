import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';
import { useShoppingCart } from '../../context/ShoppingCartContext';

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgURL: string;
};

const StoreItem = ({ id, name, price, imgURL }: StoreItemProps) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeCartQuantity } = useShoppingCart()!;
    const quantity = getItemQuantity(id);

    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={imgURL} height={'auto'} style={{ objectFit: 'cover' }} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between mb-4'>
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 0 ? (
                        <Button className='w-100' onClick={() => increaseCartQuantity(id)}>
                            + Add to cart
                        </Button>
                    ) : (
                        <div className='d-flex align-items-center flex-column' style={{ gap: '.5rem' }}>
                            <div className='d-flex align-items-center justify-content-center' style={{ gap: '.5rem' }}>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                                <span className='fs-2'>{quantity}</span>
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                            </div>
                            <Button variant='danger' size='sm' onClick={() => removeCartQuantity(id)}>
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default StoreItem;
