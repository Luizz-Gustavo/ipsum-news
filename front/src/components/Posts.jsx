import { useState } from "react";
import { FaEdit, FaEye, FaBan } from "react-icons/fa";
import { Table, Button, Spin } from "antd";
import ptBr from "../assets/data/translate.json";
import { fetchPosts } from "../api/services/fetchPostsService";
import useSWR from "swr";
import "../assets/css/posts.css";
import EditPostModal from "./modals/EditPostModal";
import InfoPostModal from "./modals/InfoPostModal";
import DisablePostModal from "./modals/DisablePostModal";
import ErrorComponent from "./ErrorComponent";
import { formatDate, formatTime } from "../utils/formatDateTime";
import { FaNewspaper } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

const Posts = () => {
	const { user } = useAuth();
	
	const {
		data: posts,
		error,
		isLoading,
	} = useSWR("/posts-list", fetchPosts);

	// State for modals
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isInfoModalOpen, setInfoModalOpen] = useState(false);
	const [isDisableModalOpen, setDisableModalOpen] = useState(false);
	const [selectedPost, setSelectedPost] = useState(null);

	if (error) return <ErrorComponent error={error} />;

	// Handlers for opening modals
	const handleEditClick = (post) => {
		setSelectedPost(post);
		setEditModalOpen(true);
	};

	const handleInfoClick = (post) => {
		setSelectedPost(post);
		setInfoModalOpen(true);
	};

	const handleDisableClick = (post) => {
		setSelectedPost(post);
		setDisableModalOpen(true);
	};

	const columns = [
		// {
		//     title: 'ID',
		//     dataIndex: 'id',
		//     key: 'id',
		//     sorter: (a, b) => a.id - b.id,
		//     width: 80,
		// },
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			sorter: (a, b) => a.title.localeCompare(b.title),
			width: 150,
			fixed: "left",
		},
		{
			title: "Category",
			dataIndex: ["category", "name"],
			key: "category",
			sorter: (a, b) => a.category.name.localeCompare(b.category.name),
			width: 150,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status) => (status ? "Active" : "Inactive"),
			filters: [
				{ text: "Active", value: true },
				{ text: "Inactive", value: false },
			],
			onFilter: (value, record) => record.status === value,
			width: 120,
		},
		{
			title: "Creation Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (date) => `${formatDate(date)} - ${formatTime(date)}`,
			sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
			width: 180,
		},
		{
			title: "Update Date",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (date) => `${formatDate(date)} - ${formatTime(date)}`,
			sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
			width: 180,
		},
		{
			title: "Author",
			dataIndex: ["author", "name"],
			key: "author",
			sorter: (a, b) => {
				const nameA = `${a.author.name} ${a.author.lastName}`.toLowerCase();
				const nameB = `${b.author.name} ${b.author.lastName}`.toLowerCase();
				return nameA.localeCompare(nameB);
			},
			width: 200,
			render: (_, record) => {
				const name = record.author.name || "";
				const lastName = record.author.lastName || "";
				const fullName = `${name} ${lastName}`.trim() || "Unknown Author";
				return fullName;
			},
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<>
					<Button
						type="text"
						icon={<FaEye />}
						onClick={() => handleInfoClick(record)}
						className="mr-2"
					/>
					<Button
						type="text"
						icon={<FaEdit />}
						onClick={() => handleEditClick(record)}
						className="mr-2"
					/>
					{record.status && (
						<Button
							type="text"
							icon={<FaBan />}
							onClick={() => handleDisableClick(record)}
							style={{ color: "red" }}
						/>
					)}
				</>
			),
			// fixed: 'right',
			width: 90,
		},
	];

	return (
		<>
			<div>
				<div className="posts-title-box flex mt-12">
					<FaNewspaper className="text-3xl" />
					<h1 className="text-black text-3xl ml-4">Posts</h1>
				</div>

				<div className="container-titulo">
					<div>
						<h1>POSTS LIST</h1>
					</div>
				</div>

				<div className="container-tabela">
					<div className="container">
						{isLoading ? (
							<div className="flex justify-center items-center h-full">
								<Spin tip="Loading..." />
							</div>
						) : (
							<Table
								columns={columns}
								dataSource={posts}
								rowKey="id"
								pagination={{ pageSize: 5 }}
								locale={{
									emptyText: "No data available",
									...ptBr.Table,
								}}
								scroll={{ x: "max-content" }}
							/>
						)}
					</div>
				</div>

				{selectedPost && (
					<EditPostModal
						isOpen={isEditModalOpen}
						onClose={() => setEditModalOpen(false)}
						post={selectedPost}
					/>
				)}

				{selectedPost && (
					<InfoPostModal
						isOpen={isInfoModalOpen}
						onClose={() => setInfoModalOpen(false)}
						post={selectedPost}
					/>
				)}
				
				{selectedPost && (
					<DisablePostModal
						isOpen={isDisableModalOpen}
						onClose={() => setDisableModalOpen(false)}
						post={selectedPost}
					/>
				)}
			</div>
		</>
	);
};

export default Posts;