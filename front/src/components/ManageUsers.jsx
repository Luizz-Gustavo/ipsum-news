import { useState } from "react";
import { Table, Space, Spin, Input, Button } from "antd";
import { FaEdit, FaBan } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { fetchUsers } from "../api/services/fetchUserService";
import CreateUserModal from "./modals/CreateUserModal";
import EditUserModal from "./modals/EditUserModal";
import DisableUserModal from "./modals/DisableUserModal";
import useSWR from "swr";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";

function ManageUsers() {
    const [searchText, setSearchText] = useState("");
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isDisableUserModalOpen, setIsDisableUserModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const { user: currentUser } = useAuth();

    const { data: users, isLoading: usersLoading } = useSWR("/users", () => fetchUsers());

    const userColumns = [
        { title: "Nickname", dataIndex: "nickname", key: "nickname", fixed: "left", sorter: (a, b) => a.nickname.localeCompare(b.nickname) },
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: "Last Name", dataIndex: "lastName", key: "lastName", sorter: (a, b) => a.lastName.localeCompare(b.lastName) },
        { title: "Email", dataIndex: "email", key: "email", sorter: (a, b) => a.email.localeCompare(b.email) },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => status ? 'Active' : 'Inactive',
            sorter: (a, b) => a.status === b.status ? 0 : a.status ? -1 : 1
        },
        { title: "Role", dataIndex: "role", key: "role", sorter: (a, b) => a.role.localeCompare(b.role) },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => new Date(text).toLocaleDateString('en-US'),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => new Date(text).toLocaleDateString('en-US'),
            sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <span onClick={() => handleEdit(record)} style={{ cursor: "pointer" }} aria-label="Edit User">
                        <FaEdit size={18} />
                    </span>

                    {record.status && (
                        <span onClick={() => handleDelete(record)} style={{ cursor: "pointer", color: "red" }} aria-label="Disable User">
                            <FaBan size={18} />
                        </span>
                    )}
                </Space>
            ),
        },
    ];

    const filteredUsers = users?.filter(user => {
        // Remove current user from the list
        if (user.id === currentUser?.id) return false;

        const searchTerms = searchText.toLowerCase().split(' ').filter(term => term.length > 0);

        if (searchTerms.length === 0) return true;

        const userFields = [
            user.name || '',
            user.lastName || '',
            user.email || '',
            user.nickname || '',
            user.role || '',
            user.status ? 'active' : 'inactive'
        ].map(field => field.toLowerCase());

        return searchTerms.every(term =>
            userFields.some(field => field.includes(term))
        );
    });

    const sortedUsers = filteredUsers
        ? [...filteredUsers].sort((a, b) => {
            if (a.status === b.status) return 0;
            return a.status ? -1 : 1;
        })
        : [];

    const handleAdd = () => {
        setIsCreateUserModalOpen(true);
    };

    const handleEdit = (record) => {
        setSelectedItem(record);
        setIsEditUserModalOpen(true);
    };

    const handleDelete = (record) => {
        setSelectedItem(record);
        setIsDisableUserModalOpen(true);
    };

    return (
        <>
            <div className="posts-title-box flex mt-12">
                <FaCircleUser className="text-3xl" />
                <h1 className="text-black text-3xl ml-4">Users</h1>
			</div>

            <div>
                <div className="container-titulo">
                    <div>
                        <h1>MANAGE USERS</h1>
                    </div>
                </div>
            </div>

            {usersLoading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div className="container-tabela">
                    <div className="container">
                        <div className="overflow-x-auto">
                            <div className="flex justify-end mb-6">
                                <Space wrap>
                                    <Input.Search
                                        className="w-[190px]"
                                        placeholder="Search users..."
                                        allowClear
                                        onChange={(e) => setSearchText(e.target.value)}
                                        aria-label="Search users"
                                    />
                                </Space>
                                <Button className="ml-2" type="primary" onClick={handleAdd} aria-label="Add User">
                                    Add User
                                </Button>
                            </div>
                            <Table
                                columns={userColumns}
                                dataSource={sortedUsers}
                                rowKey="id"
                                scroll={{ x: 'max-content' }}
                                pagination={{ pageSize: 7 }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <CreateUserModal
                isOpen={isCreateUserModalOpen}
                onClose={() => setIsCreateUserModalOpen(false)}
            />
            <EditUserModal
                isOpen={isEditUserModalOpen}
                onClose={() => setIsEditUserModalOpen(false)}
                user={selectedItem}
            />
            <DisableUserModal
                isOpen={isDisableUserModalOpen}
                onClose={() => setIsDisableUserModalOpen(false)}
                user={selectedItem}
            />

            <div className="mt-8">
                <Footer />
            </div>
        </>
    );
}

export default ManageUsers;