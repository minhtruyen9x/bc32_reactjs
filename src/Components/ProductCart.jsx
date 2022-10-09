import React, { memo } from 'react'
import { Button, Modal, Image, InputNumber, Table, Space, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const { Text } = Typography

const ProductCart = ({ carts, isCartOpen, onToggleModal, onChangeQuantity, onDeleteItem }) => {
    console.log("cart")

    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
            render: (id, record, index) => <span>{index + 1}</span>
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
            render: (name) => <Text ellipsis={true} >{name}</Text>,
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
        <Modal title="Giỏ hàng" open={isCartOpen} onOk={onToggleModal} onCancel={onToggleModal} width="80%">
            <Table
                columns={columns}
                rowKey="id"
                dataSource={carts}
                pagination={false}
                bordered
                summary={(carts) => {
                    let totalPrice = carts.reduce((total, item) => {
                        return total + item.price * item.quantity
                    }, 0)
                    return (
                        <Table.Summary.Row>
                            {console.log("table")}
                            <Table.Summary.Cell index={0} colSpan={4}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Text type="danger">Total: </Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2} colSpan={2}>
                                <Text>{totalPrice} $</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    );
                }}
            >
            </Table>
        </Modal>
    )
}

// sử dụng memo, để tránh render lại cart khi các prop,
// [carts, isCartOpen]
// không thay đổi
// => tránh ảnh hưởng render lại bởi action khi bật tắt modal preview chi tiết sản phẩm

export default memo(ProductCart)