import { Form, Input, Button, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const { name, email, subject, message } = values;
    const mailtoLink = `mailto:kazed4v@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailtoLink;
    form.resetFields();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fafcff' }}>
      <Card style={{ width: '100%', maxWidth: 480 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="your.email@example.com" />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please input a subject!' }]}
          >
            <Input placeholder="How can we help you?" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <TextArea rows={6} placeholder="Type your message here..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={false}
              size="large"
              block
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Contact;