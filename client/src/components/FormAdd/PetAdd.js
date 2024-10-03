import React, { useState, useEffect } from 'react';
import { Table, Tabs, Button, Modal, Form, Input, Select, Checkbox, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ApiService } from '../../service/api.service';

const { TabPane } = Tabs;
const { Option } = Select;
const apiService = new ApiService();

const PetAdd = ({ pets, breeds, families, fetchPet }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  useEffect(() => {
    // Если редактируем, устанавливаем выбранное семейство и фильтруем породы
    if (editingItem) {
      const familyId = editingItem.breed.family.id;
      setSelectedFamilyId(familyId);
      const breedsForFamily = breeds.filter(breed => breed.family.id === familyId);
      setFilteredBreeds(breedsForFamily);
    } else {
      setSelectedFamilyId(null);
      setFilteredBreeds([]);
    }
  }, [editingItem, breeds]);

  const showEditModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
    if (item) {
      form.setFieldsValue({
        name: item.name,
        breed: item.breed.id,
        age: item.age,
        vaccinationStatus: item.vaccinationStatus,
        sterilization: item.sterilization,
        sex: item.sex,
        appearanceDescription: item.appearanceDescription,
        characterDescription: item.characterDescription,
        photo: item.photo,
      });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
    form.resetFields();
    setSelectedFamilyId(null);
    setFilteredBreeds([]);
  };

  const handleSave = (values) => {
    //to do проверка логических данных при добавлении
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('breed', values.breed);
    formData.append('age', values.age);
    formData.append('vaccinationStatus', values.vaccinationStatus);
    formData.append('sterilization', values.sterilization);
    formData.append('sex', values.sex);
    formData.append('appearanceDescription', values.appearanceDescription);
    formData.append('characterDescription', values.characterDescription);
    

    if (selectedFile) {
      formData.append('image', selectedFile); // Добавляем файл
    }
    if (editingItem) {
      onEdit(formData, editingItem.id);
      message.success('Питомец успешно изменён!');
    } else {
      onAdd(formData);
      message.success('Питомец успешно добавлен!');
    }
    fetchPet();
    handleCancel();
  };

  const onEdit = async (values, id) => {
    try {
      await apiService.patchFormData(`/pets/${id}`, values);
    } catch (error) {
      console.error('Failed to update pet:', error);
      message.error('Не удалось обновить питомца');
    }
  };

  const onAdd = async (values) => {
    try {
      await apiService.postFormData('/pets', values);
    } catch (error) {
      console.error('Failed to add pet:', error);
      message.error('Не удалось добавить питомца');
    }
  };

  const onDelete = async (id) => {
    try {
      await apiService.delete(`/pets/${id}`);
      message.success('Питомец успешно удалён!');
      fetchPet();
    } catch (error) {
      console.error('Failed to delete pet:', error);
      message.error('Не удалось удалить питомца');
    }
  };

  const handleFileChange = ({ file }) => {
    setSelectedFile(file); // Сохраняем выбранный файл в состояние
  };

  const handleFamilyChange = (value) => {
    setSelectedFamilyId(value);
    const breedsForFamily = breeds.filter(breed => breed.family.id === value);
    setFilteredBreeds(breedsForFamily);
    // Сбросить выбранную породу при изменении семейства
    form.setFieldsValue({ breedId: undefined });
  };

  const renderTable = (data, columns) => (
    <>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => showEditModal(null)}>
        Добавить
      </Button>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </>
  );

  const petColumns = [
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Возраст', dataIndex: 'age', key: 'age' },
    { title: 'Описание внешности', dataIndex: 'appearanceDescription', key: 'appearanceDescription' },
    { title: 'Характер', dataIndex: 'characterDescription', key: 'characterDescription' },
    { title: 'Порода', dataIndex: ['breed', 'name'], key: 'breed' },
    { 
      title: 'Фото', 
      dataIndex: 'photo', 
      key: 'photo',
      render: (photo) => <img src={process.env.REACT_APP_API_URL + photo} alt="pet-photo" style={{ width: 100 }} />,
    },
    { 
      title: 'Вакцинирован', 
      dataIndex: 'vaccinationStatus', 
      key: 'vaccinationStatus',
      render: (vaccinationStatus) => vaccinationStatus ? 'Да' : 'Нет',
    },
    { 
      title: 'Стерилизован', 
      dataIndex: 'sterilization', 
      key: 'sterilization',
      render: (sterilization) => sterilization ? 'Да' : 'Нет',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => showEditModal(record)}>Изменить</Button>
          <Button danger style={{ marginLeft: 8 }} onClick={() => onDelete(record.id)}>
            Удалить
          </Button>
        </>
      ),
    },
  ];

  const breedColumns = [
    { title: 'Порода', dataIndex: 'name', key: 'name' },
    { title: 'Семейство', dataIndex: ['family', 'name'], key: 'family' },
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => showEditModal(record)}>Изменить</Button>
          <Button danger style={{ marginLeft: 8 }} onClick={() => onDelete(record.id)}>
            Удалить
          </Button>
        </>
      ),
    },
  ];

  const familyColumns = [
    { title: 'Семейство', dataIndex: 'name', key: 'name' },
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => showEditModal(record)}>Изменить</Button>
          <Button danger style={{ marginLeft: 8 }} onClick={() => onDelete(record.id)}>
            Удалить
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
    {renderTable(pets, petColumns)}
    {console.log(process.env.REACT_APP_API_URL)}
      <Modal
        title={editingItem ? `Редактирование ${editingItem.name}` : 'Добавление питомца'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingItem}
          onFinish={handleSave}
        >
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите имя питомца' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Семейство"
            name="familyId"
            rules={[{ required: true, message: 'Выберите семейство' }]}
          >
            <Select placeholder="Выберите семейство" onChange={handleFamilyChange}>
              {families.map(family => (
                <Option key={family.id} value={family.id}>
                  {family.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Порода"
            name="breed"
            rules={[{ required: true, message: 'Выберите породу' }]}
          >
            <Select placeholder="Выберите породу" disabled={!selectedFamilyId}>
              {filteredBreeds.map(breed => (
                <Option key={breed.id} value={breed.id}>
                  {breed.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Возраст"
            name="age"
            rules={[{ required: true, message: 'Введите возраст питомца' }]}
          >
            <Input />
          </Form.Item>

          

          <Form.Item
            label="Пол"
            name="sex"
            rules={[{ required: true, message: 'Выберите пол питомца' }]}
          >
            <Select placeholder="Выберите пол">
              <Option value="false">Мужской</Option>
              <Option value="true">Женский</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Описание внешности"
            name="appearanceDescription"
            rules={[{ required: true, message: 'Введите описание внешности' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Характер"
            name="characterDescription"
            rules={[{ required: true, message: 'Введите описание характера' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Фото"
            name="photo"
            rules={[{ required: true, message: 'Загрузите фото питомца' }]}
          >
            <Upload
              name="photo"
              listType="picture"
              beforeUpload={() => false} // Предотвращаем автоматическую загрузку
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
            {/* Отображение ссылки на уже загруженное фото при редактировании */}
            {editingItem && editingItem.photo && (
              <img src={editingItem.photo} alt="pet-photo" style={{ width: '100px', marginTop: '10px' }} />
            )}
          </Form.Item>
          <Form.Item
            label="Вакцинирован"
            name="vaccinationStatus"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
            label="Стерилизован"
            name="sterilization"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PetAdd;
