import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { ApiService } from '../../service/api.service';

const { Option } = Select;
const apiService = new ApiService();
const BreedAdd = ({ breeds, families, fetchBreed }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm(); // Создаем инстанс формы

  const showEditModal = (item) => {
    setEditingItem(item);
    if (item) {
        // Устанавливаем текущие значения полей в форму
        form.setFieldsValue({
          name: item.name,
          family: item.family.name, // Устанавливаем текущее значение family.id в Select
        });
      } else {
        form.resetFields(); // Сброс формы для добавления новой породы
      }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleSave = (values) => {
    console.log(editingItem);
    if (editingItem) {
      onEdit(values, editingItem.id);
    } else {
      onAdd(values);
    }
    setIsModalVisible(false);
    fetchBreed();
  };

  const onEdit = async (values, id) => {
    try {
      await apiService.put(`/breeds/${id}`, values);
    } catch (error) {
      console.error('Failed to update breeds:', error);
      message.error('Не удалось обновить породу');
    }
  };

  const onAdd = async (values) => {
    try {
      await apiService.post('/breeds', values);
    } catch (error) {
      console.error('Failed to add breeds:', error);
      message.error('Не удалось добавить породу');
    }
  };

  const onDelete = async (id) => {
    try {
      await apiService.delete(`/breeds/${id}`);
      message.success('Порода успешно удалена!');
      fetchBreed();
    } catch (error) {
      console.error('Failed to delete breeds:', error);
      message.error('Не удалось удалить породу');
    }
  };

  const breedColumns = [
    { title: 'Порода', dataIndex: 'name', key: 'name' },
    { title: 'Семейство', dataIndex: ['family', 'name'], key: 'family' },
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => showEditModal(record)}>Изменить</Button>
          <Button danger style={{ marginLeft: 8 }} onClick={() => onDelete(record.id)}>Удалить</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => showEditModal(null)}>
        Добавить породу
      </Button>
      <Table dataSource={breeds} columns={breedColumns} rowKey="id" />

      <Modal
        title={editingItem ? `Редактирование ${editingItem.name}` : 'Добавление породы'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
        //   initialValues={editingItem}
          form={form}
          onFinish={handleSave}
        >
          <Form.Item label="Название породы" name="name" rules={[{ required: true, message: 'Введите название породы' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Семейство" name="family" rules={[{ required: true, message: 'Выберите семейство' }]}>
            <Select>
              {families.map(family => (
                <Option key={family.id} value={family.id}>{family.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BreedAdd;
