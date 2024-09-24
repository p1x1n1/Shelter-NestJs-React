import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, Tabs, message } from 'antd';
import {Context} from "../index";
import { ApiService } from '../service/api.service'; // Ваш класс для работы с API

const { TabPane } = Tabs;

const apiService = new ApiService();


const AuthPage = () => {
  const {user}= useContext(Context)
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      console.log('values',values)
      const response = await apiService.post('/auth/login', values);
      console.log('response',response)
      if (response.token) {
        message.success('Вы успешно авторизовались!');
        // Сохраняем токен в localStorage
        localStorage.setItem('token', response.token);
        user.setUser(response.user);
        user.setIsAuth(true);
        // Перенаправляем на другую страницу (например, профиль)
        window.location.href = '/profile';
      } else {
        message.error('Ошибка авторизации!');
      }
    } catch (error) {
      message.error('Неправильный логин или пароль!');
    }
    setIsLoading(false);
  };

  const handleRegistration = async (values) => {
    setIsLoading(true);
    try {
      const response = await apiService.post('/auth/registration', values);
      if (response.token) {
        message.success('Регистрация успешна!');
        localStorage.setItem('token', response.token);
        user.setUser(response.user);
        user.setIsAuth(true);
        window.location.href = '/profile';
      } else {
        message.error('Ошибка регистрации!');
      }
    } catch (error) {
      message.error('Ошибка при регистрации! Попробуйте снова.');
    }
    setIsLoading(false);
  };

  return (
    <>
        <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '100px' }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Вход" key="1">
              <Form onFinish={handleLogin}>
                <Form.Item
                  name="login"
                  rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                >
                  <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                  <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading} block>
                    Войти
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Регистрация" key="2">
              <Form onFinish={handleRegistration}>
                <Form.Item
                  name="login"
                  rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                >
                  <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                  <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
                >
                  <Input placeholder="Имя" />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  rules={[{ required: true, message: 'Пожалуйста, введите фамилию!' }]}
                >
                  <Input placeholder="Фамилия" />
                </Form.Item>
                <Form.Item
                  name="surname"
                  rules={[{ required: true, message: 'Пожалуйста, введите отчество!' }]}
                >
                  <Input placeholder="Отчество" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: 'Пожалуйста, введите телефон!' }]}
                >
                  <Input placeholder="Телефон" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading} block>
                    Зарегистрироваться
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
    </>
  );
};

export default AuthPage;
