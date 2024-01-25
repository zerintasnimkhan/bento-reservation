import React from "react";
import { Form, Input, Button, Card, Divider, Flex } from "antd";

const InfoForm = ({ selectedData, onEditClick, onConfirmClick }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div style={{ marginLeft: "5vw", marginRight: "5vw", minWidth: "20vw" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>Bento</h2>
        <hr></hr>
      </div>
      <div style={{ marginLeft: "5vw", marginRight: "5vw", minWidth: "100vw" }}>
        <h2>Z & Y Restaurant</h2>
        <p>Date and Time:</p>
        <p>Number of People:</p>
        <Button
          type="primary"
          onClick={onEditClick}
          style={{ width: "20vw", height: "2rem", backgroundColor: "#038851" }}
        >
          Edit
        </Button>

        <Divider />

        <div>
          <h3>Your Information</h3>
          <Form
            //style={{ marginLeft: "5vw", marginRight: "5vw", maxWidth: "90vw" }}
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Flex
              gap="middle"
              vertical
              style={{ flexDirection: "row", width: "100%" }}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Flex>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Requests (optional)" name="requests">
              <Input.TextArea />
            </Form.Item>

            <Divider />

            <Card style={{ height: "160px" }} title="Notes about this booking">
              <p>This is a sample note about the booking.</p>
            </Card>

            <Divider />

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onConfirmClick}
                style={{
                  width: "50vw",
                  height: "2rem",
                  backgroundColor: "#038851",
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InfoForm;
