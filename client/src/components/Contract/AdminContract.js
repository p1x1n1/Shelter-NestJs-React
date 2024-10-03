import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, Input, DatePicker, Space, Modal, Card, message } from 'antd';
import moment from 'moment';
import { ApiService } from '../../service/api.service';

const { TabPane } = Tabs;
const { Search } = Input;
const apiService = new ApiService();

const AdminContract = () => {
    const [openContracts, setOpenContracts] = useState([]);
    const [completedContracts, setCompletedContracts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);

    useEffect(() => {
        // Загрузка контрактов
        apiService.get('/contracts').then((data) => {
            setOpenContracts(data.filter((contract) => !contract.signed));
            setCompletedContracts(data.filter((contract) => contract.signed));
        });
    }, []);

    // Открытие модального окна с информацией о контракте
    const showModal = (contract) => {
        setSelectedContract(contract);
        setIsModalVisible(true);
    };

    const handleConfirm = async (id) => {
        try {
            await apiService.patch(`/contracts/${id}`, {
                signed: true,
                signingDate: moment().toISOString(), // Отправка текущей даты
            });
            message.success('Заявка успешно подтверждена');
            setOpenContracts((prev) => prev.filter((contract) => contract.id !== id));
            setIsModalVisible(false);
        } catch (error) {
            message.error('Ошибка при подтверждении заявки');
        }
    };

    const handleCancel = async (id) => {
        try {
            await apiService.patch(`/contracts/${id}`, { signed: true });
            message.success('Заявка успешно отменена');
            setOpenContracts((prev) => prev.filter((contract) => contract.id !== id));
            setIsModalVisible(false);
        } catch (error) {
            message.error('Ошибка при отмене заявки');
        }
    };

    const columns = [
        {
            title: 'Клиент',
            dataIndex: ['client', 'login'],
            key: 'client',
        },
        {
            title: 'Питомец',
            dataIndex: ['pet', 'name'],
            key: 'pet',
        },
        {
            title: 'Дата подачи',
            dataIndex: 'submissionDate',
            key: 'submissionDate',
            render: (text) => moment(text).format('YYYY-MM-DD'),
            sorter: (a, b) => moment(a.submissionDate).unix() - moment(b.submissionDate).unix(),
        },
    ];

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleDateChange = (date) => {
        setSearchDate(date);
    };

    const filteredOpenContracts = openContracts.filter((contract) => {
        const matchesSearch = contract.client.login.includes(searchText) || contract.pet.name.includes(searchText);
        const matchesDate = searchDate
            ? moment(contract.submissionDate).isSame(searchDate, 'day') ||
              (contract.signingDate && moment(contract.signingDate).isSame(searchDate, 'day'))
            : true;
        return matchesSearch && matchesDate;
    });

    const filteredCompletedContracts = completedContracts.filter((contract) => {
        const matchesSearch = contract.client.login.includes(searchText) || contract.pet.name.includes(searchText);
        const matchesDate = searchDate
            ? moment(contract.submissionDate).isSame(searchDate, 'day') ||
              (contract.signingDate && moment(contract.signingDate).isSame(searchDate, 'day'))
            : true;
        return matchesSearch && matchesDate;
    });

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Открытые заявки" key="1">
                    <Space style={{ marginBottom: 16 }}>
                        <Search placeholder="Поиск по логину или кличке" onSearch={handleSearch} style={{ width: 200 }} />
                        <DatePicker onChange={handleDateChange} />
                    </Space>
                    <Table 
                        columns={columns} 
                        dataSource={filteredOpenContracts} 
                        rowKey="id"
                        onRow={(record) => ({
                            onClick: () => showModal(record), // Открытие модального окна при клике на строку
                        })}
                    />
                </TabPane>
                <TabPane tab="Завершённые заявки" key="2">
                    <Space style={{ marginBottom: 16 }}>
                        <Search placeholder="Поиск по логину или кличке" onSearch={handleSearch} style={{ width: 200 }} />
                        <DatePicker onChange={handleDateChange} />
                    </Space>
                    <Table 
                        columns={columns} 
                        dataSource={filteredCompletedContracts} 
                        rowKey="id"
                        onRow={(record) => ({
                            onClick: () => showModal(record), // Открытие модального окна при клике на строку
                        })}
                    />
                </TabPane>
            </Tabs>

            {selectedContract && (
                <Modal
                    title="Информация о заявке"
                    visible={isModalVisible}
                    onCancel={handleModalCancel}
                    footer={[
                        !selectedContract.signed && (
                            <>
                                <Button key="confirm" type="primary" onClick={() => handleConfirm(selectedContract.id)}>
                                    Подтвердить
                                </Button>
                                <Button key="cancel" danger onClick={() => handleCancel(selectedContract.id)}>
                                    Отменить
                                </Button>
                            </>
                        ),
                        <Button key="close" onClick={handleModalCancel}>
                            Закрыть
                        </Button>,
                    ]}
                >
                    <Card title={`Информация о питомце: ${selectedContract.pet.name}`}>
                        <p><b>Питомец:</b> {selectedContract.pet.name}</p>
                        <p><b>Возраст:</b> {selectedContract.pet.age} года</p>
                        <p><b>Описание внешности:</b> {selectedContract.pet.appearanceDescription}</p>
                        <p><b>Описание характера:</b> {selectedContract.pet.characterDescription}</p>
                        <p><b>Порода:</b> {selectedContract.pet.breed.name}</p>
                    </Card>

                    <Card title={`Информация о клиенте: ${selectedContract.client.login}`} style={{ marginTop: 16 }}>
                        <p><b>Имя клиента:</b> {selectedContract.client.fullName}</p>
                        <p><b>Email:</b> {selectedContract.client.email}</p>
                        <p><b>Телефон:</b> {selectedContract.client.phone}</p>
                    </Card>
                </Modal>
            )}
        </>
    );
};

export default AdminContract;
