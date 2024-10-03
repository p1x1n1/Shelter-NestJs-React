import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { ApiService } from '../../service/api.service';

const apiService = new ApiService();
const FamilyAdd = ({ families, fetchFamilies}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const showEditModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const onEdit = async (values, id) => {
    try {
      await apiService.put(`/families/${id}`, values);
    } catch (error) {
      console.error('Failed to update families:', error);
      message.error('Не удалось обновить семейство');
    }
  };

  const onAdd = async (values) => {
    try {
      await apiService.post('/families', values);
    } catch (error) {
      console.error('Failed to add families:', error);
      message.error('Не удалось добавить семейство');
    }
  };

  const onDelete = async (id) => {
    try {
      await apiService.delete(`/families/${id}`);
      message.success('Семейство успешно удалено!');
      fetchFamilies();
    } catch (error) {
      console.error('Failed to delete families:', error);
      message.error('Не удалось удалить семейство');
    }
  };

  const handleSave = (values) => {
    console.log(values)
    if (editingItem) {
      onEdit(values, editingItem.id);
    } else {
      onAdd(values);
    }
    setIsModalVisible(false);
    fetchFamilies();
  };

  const familyColumns = [
    { title: 'Семейство', dataIndex: 'name', key: 'name' },
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
        Добавить семейство
      </Button>
      <Table dataSource={families} columns={familyColumns} rowKey="id" />

      <Modal
        title={editingItem ? `Редактирование ${editingItem.name}` : 'Добавление семейства'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingItem}
          onFinish={handleSave}
        >
          <Form.Item label="Название семейства" name="name" rules={[{ required: true, message: 'Введите название семейства' }]}>
            <Input />
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

export default FamilyAdd;
