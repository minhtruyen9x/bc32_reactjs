import React, { memo, useState } from 'react'
import { Button, Modal, Image, InputNumber, Table, Space, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const { Text, Title } = Typography

const ProductCart = ({ carts, isCartOpen, onToggleModal, onChangeQuantity, onDeleteItem }) => {
    console.log("cart")

    const [currentPage, setCurrentPage] = useState(1)
    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
            render: (id, record, index) => <span>{(currentPage - 1) * 3 + index + 1}</span>
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (src) => <Image width={50} src={src} preview={false} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name - b.name,
            render: (name) => <Text ellipsis={{ tooltip: name }} >{name}</Text>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => <span>{price} {console.log("row")}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity, record, index) => (
                <Space size="middle">
                    <Button shape="circle" icon={<MinusOutlined />} onClick={() => onChangeQuantity(record.id, -1)} />
                    <InputNumber value={quantity} readOnly min={1} size="large" controls={false} style={{ width: 40 }} />
                    <Button shape="circle" icon={<PlusOutlined />} onClick={() => onChangeQuantity(record.id, 1)} />
                </Space>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            render: (_, { price, quantity }) => <span>{price * quantity} $</span>
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (id) => <Button type='danger' onClick={() => onDeleteItem(id)}>Delete</Button>
        },
    ]
    return (
        <Modal
            title="Giỏ hàng"
            open={isCartOpen}
            onOk={onToggleModal}
            onCancel={onToggleModal}
            width="80%"
            centered
        >
            <Table
                columns={columns}
                rowKey="id"
                bordered
                dataSource={carts}
                pagination={{
                    pageSize: 3,
                    onChange(current) {
                        console.log(current)
                        setCurrentPage(current);
                    }
                }}
                scroll={{ x: "100%" }}
                footer={() => (
                    <Title level={3}>Total Purchase: {carts.reduce((total, item) => {
                        return total + item.price * item.quantity
                    }, 0)} $</Title>
                )}>
            </Table>
        </Modal>
    )
}

// sử dụng memo, để tránh render lại cart khi các prop,
// [carts, isCartOpen]
// không thay đổi
// => tránh ảnh hưởng render lại bởi action khi bật tắt modal preview chi tiết sản phẩm

export default memo(ProductCart)