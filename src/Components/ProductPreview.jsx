import React, { memo } from 'react';
import { Modal, Row, Col, Image, Descriptions, Typography } from 'antd';
const { Paragraph } = Typography

const ProductPreview = ({ isModalOpen, onToggleModal, item }) => {
    console.log("preview")
    return (
        <Modal title="Thông tin sản phẩm" centered open={isModalOpen} onOk={onToggleModal} onCancel={onToggleModal} width="80%">
            <Row align="middle">
                <Col sm={24} md={10} lg={8}>
                    <Image
                        preview={false}
                        width="100%"
                        src={item.image}
                    />
                </Col>
                <Col sm={24} md={14} lg={16}>
                    <Descriptions title={item.name} layout="horizontal" bordered column={1} size="small">
                        <Descriptions.Item label="Type">{item.alias}</Descriptions.Item>
                        <Descriptions.Item label="Price">{item.price}$</Descriptions.Item>
                        <Descriptions.Item label="Description">
                            <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
                                {item.description}
                            </Paragraph>
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </Modal>
    );
};

// sử dụng memo, để tránh render lại khi các prop,
// [isModalOpen, onToggleModal, item ]
// không thay đổi
// => tránh ảnh hưởng render lại bởi action khi thêm item vào cart
export default memo(ProductPreview);