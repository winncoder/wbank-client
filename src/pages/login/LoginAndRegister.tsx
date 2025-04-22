import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Tabs, theme, Button, message} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostAuth } from '../../hooks/use.Auth';

type AuthType = 'login' | 'register';

interface FormValues {
  username: string;
  password: string;
  email: string;
}

export default function AuthPage() {
  const { token } = theme.useToken();
  const [authType, setAuthType] = useState<AuthType>('login');
  const navigate = useNavigate();

  const { mutate: userLogin, isPending } = usePostAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('access_token', token);
      navigate('/');
    }
  }, [navigate]);

  const handleFinish = (values: FormValues) => {
    if (authType === 'login') {
      userLogin({
        username: values.username,
        password: values.password,
      });
    } else {
      message.info('Register not implemented yet.');
    }
  };


  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="https://images.seeklogo.com/logo-png/52/1/world-bank-logo-png_seeklogo-521136.png"
          title="WBank"
          subTitle="The world's largest bank"
          onFinish={handleFinish}
          submitter={{
            render: (_, ) => {
              return [
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  key="submit"
                  loading={isPending}
                >
                  {authType === 'login' ? 'Login' : 'Register'}
                </Button>,
              ];
            },
          }}
        >
          <Tabs
            centered
            activeKey={authType}
            onChange={(activeKey) => setAuthType(activeKey as AuthType)}
          >
            <Tabs.TabPane key="login" tab="Login" />
            <Tabs.TabPane key="register" tab="Register" />
          </Tabs>

          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className="prefixIcon" />,
            }}
            placeholder="Username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          />

          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
              strengthText:
                'Password should contain numbers, letters and special characters, at least 8 characters long.',
              statusRender: (value) => {
                const getStatus = () => {
                  if (value && value.length > 12) return 'ok';
                  if (value && value.length > 6) return 'pass';
                  return 'poor';
                };
                const status = getStatus();
                if (status === 'pass') {
                  return <div style={{ color: token.colorWarning }}>Strength: Medium</div>;
                }
                if (status === 'ok') {
                  return <div style={{ color: token.colorSuccess }}>Strength: Strong</div>;
                }
                return <div style={{ color: token.colorError }}>Strength: Weak</div>;
              },
            }}
            placeholder="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          />

          {authType === 'register' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className="prefixIcon" />,
                }}
                name="email"
                placeholder="Email address"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Invalid email format!' },
                ]}
              />
            </>
          )}

          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              Remember me
            </ProFormCheckbox>
            <a style={{ float: 'right' }}>Forgot password</a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
}
