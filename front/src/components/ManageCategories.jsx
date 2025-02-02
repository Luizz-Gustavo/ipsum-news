import { useState } from "react";
import { Table, Space, Spin, Button } from "antd";
import { FaEdit, FaBan, FaTags } from "react-icons/fa";
import { fetchAllCategories } from "../api/services/fetchAllCategories";
import CreateCategoryModal from "./modals/CreateCategoryModal";
import EditCategoryModal from "./modals/EditCategoryModal";
import DisableCategoryModal from "./modals/DisableCategoryModal";
import Footer from "./Footer";
import useSWR from "swr";

function ManageCategories() {
    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [isDisableCategoryModalOpen, setIsDisableCategoryModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const { data: categories, isLoading: categoriesLoading } = useSWR("/all-categories", () => fetchAllCategories());

    const categoryColumns = [
        { 
            title: "Name", 
            dataIndex: "name", 
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Posts",
            key: "postsCount",
            render: (record) => record.posts?.length || 0,
            sorter: (a, b) => (a.posts?.length || 0) - (b.posts?.length || 0)
        },
        {
            title: "Status",
            key: "status",
            render: (record) => record.status ? "Active" : "Inactive",
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.status === value
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <span onClick={() => handleEdit(record)} style={{ cursor: "pointer" }} aria-label="Edit Category">
                        <FaEdit size={18} />
                    </span>
                    {record.status && (
                        <span onClick={() => handleDelete(record)} style={{ cursor: "pointer", color: "red" }} aria-label="Disable Category">
                            <FaBan size={18} />
                        </span>
                    )}
                </Space>
            ),
        },
    ];

    const handleAdd = () => {
        setIsCreateCategoryModalOpen(true);
    };

    const handleEdit = (record) => {
        setSelectedItem(record);
        setIsEditCategoryModalOpen(true);
    };

    const handleDelete = (record) => {
        setSelectedItem(record);
        setIsDisableCategoryModalOpen(true);
    };

    return (
        <>
            <div className="posts-title-box flex mt-12">
                <FaTags className="text-3xl" />
                <h1 className="text-black text-3xl ml-4">Categories</h1>
            </div>

            <div>
                <div className="container-titulo">
                    <div>
                        <h1>MANAGE CATEGORIES</h1>
                    </div>
                </div>
            </div>

            {categoriesLoading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div className="container-tabela">
                    <div className="container">
                        <div className="overflow-x-auto">
                            <div className="flex justify-end mb-6">
                                <Button className="ml-2" type="primary" onClick={handleAdd} aria-label="Add Category">
                                    Add Category
                                </Button>
                            </div>
                            <Table
                                columns={categoryColumns}
                                dataSource={categories}
                                rowKey="id"
                                scroll={{ x: 'max-content' }}
                                pagination={{ pageSize: 7 }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <CreateCategoryModal
                isOpen={isCreateCategoryModalOpen}
                onClose={() => setIsCreateCategoryModalOpen(false)}
            />
            <EditCategoryModal
                isOpen={isEditCategoryModalOpen}
                onClose={() => setIsEditCategoryModalOpen(false)}
                initialData={selectedItem}
            />
            <DisableCategoryModal
                isOpen={isDisableCategoryModalOpen}
                onClose={() => setIsDisableCategoryModalOpen(false)}
                category={selectedItem}
            />

            <div className="mt-8">
                <Footer />
            </div>
        </>
    );
}

export default ManageCategories;