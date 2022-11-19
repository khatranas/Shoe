import axiosApi from "../../api/axios";
import React from 'react'
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, cartTotal, removeCart } from '../../features/cart/cartState';
import EmptyProduct from '../EmptyWishlist/EmptyProduct'

const Cart = () => {
    const [cart, setCart] = useRecoilState(cartState)
    const total = useRecoilValue(cartTotal);
    const [remove, setRemove] = useRecoilState(cartState)
    const checkToken = localStorage.getItem('accessToken')


    const handleRemove = (id) => {
        if (window.confirm("Do you want to delete this item?")) {
            const newCart = removeCart(cart, id);
            setRemove(newCart)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        alert("Do you want to pay this cart ?")

        await axiosApi.post("Order_Admin", cart).then(res => {
            setCart([])
            const newCart = []

            const storeCart = JSON.stringify(newCart)
            localStorage.setItem('cart', storeCart);
        }
        ).catch('Error posting')


    }

    return (
        <div>
            {cart.length === 0 ? <EmptyProduct /> :
                <div className="Carts">
                    <table>
                        <thead>
                            <tr className="Carts-info">
                                <th>#</th>
                                <th>Product</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Size</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        {cart.map((item, id) => {
                            return (
                                <tbody key={id}>
                                    <tr className="Carts-product">
                                        <td>{id + 1}</td>
                                        <td>
                                            <img className="Carts-product-img" src={item.productImage} alt="" />
                                        </td>
                                        <td>{item.productName}</td>
                                        <td>
                                            {item.price * item.quantity}
                                        </td>
                                        <td className="Carts-product-qnt">
                                            <div className="Carts-product-qnt-field">
                                                <p>{item.quantity}</p>
                                            </div>
                                        </td>
                                        <td className="Carts-product-size">
                                            <div className="Carts-product-size-field">
                                                <p>{item.size}</p>
                                            </div>
                                        </td>
                                        <td className="Carts-product-rm">
                                            <p
                                                className="Carts-product-rm-text"
                                                onClick={() => handleRemove(item.productId)}
                                            >
                                                Remove
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                        }
                    </table>
                    <div className="Carts_pay">
                        <h3>Total: {total}</h3>
                        <br />
                        <Link
                            className="Carts_pay_btn"
                            to={checkToken ? null : `/login`}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Payment
                        </Link>
                    </div>
                </div>
            }

        </div >
    )
}

export default Cart