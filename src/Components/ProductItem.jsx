import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Button, Tooltip, Image } from 'antd';
const { Meta } = Card;

const ProductItem = ({ item, onToggleModal, onAddToCart }) => (
    <Card
        hoverable
        style={{
            width: "100%",
        }}
        cover={<Image width="100%" src={item.image} />}
    >
        <Meta title={item.name} description={`${item.price} $`} />
        <Tooltip title="Show more desciption">
            <Button
                style={{ position: "absolute", top: 20, left: 20 }}
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => onToggleModal(item)}
            />
        </Tooltip>

        {console.log("Item")}
        <Button
            type="primary"
            style={{ marginLeft: "auto", display: "block" }}
            onClick={() => onAddToCart(item)}
        >Add to cart</Button>
    </Card >
);

export default ProductItem;