import React from 'react';
import { Form, Input, Button, Card, Divider } from 'antd';

const InfoForm = ({ selectedData, onEditClick, onConfirmClick }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    // You can handle form submission logic here
  };

  return (
    <div>
      <h2>{selectedData.restaurantName}</h2>
      <p>Date and Time: {selectedData.dateAndTime}</p>
      <p>Number of People: {selectedData.numberOfPeople}</p>
      <Button type="primary" onClick={onEditClick}>
        Edit
      </Button>

      <Divider />

      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Requests" name="requests">
          <Input.TextArea />
        </Form.Item>

        <Divider />

        <Card title="Notes about this booking">
          <p>This is a sample note about the booking.</p>
        </Card>

        <Divider />

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={onConfirmClick}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InfoForm;
