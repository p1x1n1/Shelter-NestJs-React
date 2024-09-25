import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, Input, DatePicker, Space } from 'antd';
import moment from 'moment';
import { ApiService } from '../service/api.service';

const { TabPane } = Tabs;
const { Search } = Input;
const apiService = new ApiService();

const AdminContract = () => {
    const [openContracts, setOpenContracts] = useState([]);
    const [completedContracts, setCompletedContracts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState(null);

    useEffect(() => {
        // Загрузка контрактов
        apiService.get('/contracts').then((data) => {
            setOpenContracts(data.filter((contract) => !contract.signed));
            setCompletedContracts(data.filter((contract) => contract.signed));
        });
    }, []);

    const handleConfirm = (id) => {
        apiService.confirmContract(id).then(() => {
            setOpenContracts(openContracts.filter(contract => contract.id !== id));
        });
    };

    const handleCancel = (id) => {
        apiService.cancelContract(id).then(() => {
            setOpenContracts(openContracts.filter(contract => contract.id !== id));
        });
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
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleConfirm(record.id)}>
                        Подтвердить
                    </Button>
                    <Button danger onClick={() => handleCancel(record.id)}>
                        Отменить
                    </Button>
                </Space>
            ),
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
        const matchesDate = searchDate ? moment(contract.submissionDate).isSame(searchDate, 'day') : true;
        return matchesSearch && matchesDate;
    });

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Открытые заявки" key="1">
                <Space style={{ marginBottom: 16 }}>
                    <Search placeholder="Поиск по логину или кличке" onSearch={handleSearch} style={{ width: 200 }} />
                    <DatePicker onChange={handleDateChange} />
                </Space>
                <Table columns={columns} dataSource={filteredOpenContracts} rowKey="id" />
            </TabPane>
            <TabPane tab="Завершённые заявки" key="2">
                <Table columns={columns.filter(col => col.key !== 'actions')} dataSource={completedContracts} rowKey="id" />
            </TabPane>
        </Tabs>
    );
};

export default AdminContract;
