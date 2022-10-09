import React, { memo } from 'react'
import { Col, Row } from 'antd';

import ProductItem from './ProductItem'

const ProductsList = ({ data, onToggleModal, onAddToCart }) => {
    console.log("List")
    return (
        <div className="container">
            <Row gutter={[16, 16]}>
                {data.map(shoe => (
                    <Col xs={24} sm={12} md={8} lg={6} key={shoe.id}>
                        <ProductItem
                            item={shoe}
                            onToggleModal={onToggleModal}
                            onAddToCart={onAddToCart}
                        />
                    </Col>
                ))}

            </Row>
        </div>
    )
}
// sử dụng memo, để tránh render lại danh sách sản phẩm khi các prop,
// [data ]
// không thay đổi
// => tránh ảnh hưởng render lại bởi action khác
export default memo(ProductsList)