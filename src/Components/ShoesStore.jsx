import React, { Component } from 'react'
import { Button, Divider, Layout, Badge } from 'antd';

import ProductCart from './ProductCart'
import ProductPreview from './ProductPreview'
import ProductsList from './ProductsList'

import data from "../data/shoes.json"

export default class ShoesStore extends Component {
    state = {
        isModalOpen: false,
        previewItem: data[0],
        isCartOpen: false,
        carts: []
    }

    toggleModalPreview = (item = null) => {
        this.setState(
            {
                isModalOpen: !this.state.isModalOpen,
                previewItem: item
            })
    }

    toggleModalCart = () => {
        this.setState(
            {
                isCartOpen: !this.state.isCartOpen,
            })
    }

    handleAddToCart = (item) => {
        const cartItem = this.state.carts.find(cartItem => item.id === cartItem.id)
        if (cartItem) {
            cartItem.quantity++
            this.setState({ carts: [...this.state.carts] })
            return
        }

        const newCartItem = { ...item, quantity: 1 }
        this.setState({ carts: [...this.state.carts, newCartItem] })
    }

    handleChangeQuantity = (id, quantity) => {
        const cartItem = this.state.carts.find(cartItem => id === cartItem.id)
        if (!cartItem) return

        const currentQuantity = cartItem.quantity + quantity
        if (currentQuantity <= 0) {
            return
        }

        cartItem.quantity = currentQuantity
        this.setState({ carts: [...this.state.carts] })
    }

    handleDeleteItem = (id) => {
        this.setState({ carts: this.state.carts.filter(item => item.id !== id) })
    }

    render() {
        console.log("store")
        return (
            <Layout style={{ padding: "12px 20px" }}>
                <div className="wrapper" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <h1 style={{ fontSize: 36, textAlign: "center" }}>ShoeShop</h1>
                    <Badge count={this.state.carts.reduce((total, item) => total + item.quantity, 0)} showZero size="large">
                        <Button
                            size='large'
                            style={{ alignSelf: "center" }}
                            onClick={this.toggleModalCart}
                        >
                            Open Cart
                        </Button>
                    </Badge>
                    <Divider orientation="center">Danh sách tất cả sản phẩm</Divider>
                    <ProductsList
                        data={data}
                        onToggleModal={this.toggleModalPreview}
                        onAddToCart={this.handleAddToCart}
                    />
                    <ProductPreview
                        item={this.state.previewItem}
                        isModalOpen={this.state.isModalOpen}
                        onToggleModal={this.toggleModalPreview}
                    />
                    <ProductCart
                        carts={this.state.carts}
                        isCartOpen={this.state.isCartOpen}
                        onToggleModal={this.toggleModalCart}
                        onChangeQuantity={this.handleChangeQuantity}
                        onDeleteItem={this.handleDeleteItem}
                    />
                </div>
            </Layout>
        )
    }
}
