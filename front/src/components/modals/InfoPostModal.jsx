import { Modal, ModalBody, ModalFooter, Button, Label, TextInput } from "flowbite-react";
import "../../assets/css/infoPostModal.css";
import RichTextViewer from "../RichTextViewer";
import { fetchCategories } from "../../api/services/fetchCategories";
import useSWR from 'swr';

function InfoPostModal({ isOpen, onClose, post }) {
    const { data: categories, error } = useSWR(isOpen ? '/categories' : null, fetchCategories);
    const isLoading = !categories && !error;

    const currentCategory = categories?.find(cat => cat.id === post.categoryId);

    return (
        <Modal show={isOpen} onClose={onClose} size="2xl" popup={true}>
            <div className="header-modal">{post.title}</div>
            <ModalBody>
                <div className="flex flex-col mt-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4" style={{ height: '200px' }}>
                        <div className="md:col-span-3">
                            <Label className="font-bold" htmlFor="video" value="Video" />
                            {post.videoLink ? (
                                <div className="mt-2" style={{ height: '200px' }}>
                                    <iframe
                                        src={post.videoLink}
                                        title="Video of the Post"
                                        className="w-full h-full rounded-md"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen />
                                </div>
                            ) : (
                                <p className="text-gray-500">Loading video...</p>
                            )}
                        </div>

                        <div className="md:col-span-2 post-image">
                            <Label className="font-bold" htmlFor="image" value="Cover" />
                            {post.imageUrl ? (
                                <div className="mt-2" style={{ height: '200px' }}>
                                    <img
                                        src={post.imageUrl}
                                        alt="Post Cover"
                                        className="w-[230px] h-full object-cover rounded-md"
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-500">Loading image...</p>
                            )}
                        </div>
                    </div>

                    <div className="info-section space-y-2">
                        <div>
                            <Label className="font-bold" htmlFor="title" value="Title" />
                            <TextInput id="title" value={post.title || "Loading"} readOnly />
                        </div>
                        <div>
                            <Label className="font-bold" htmlFor="category" value="Category" />
                            <TextInput
                                id="category"
                                value={isLoading ? "Loading..." : (currentCategory?.name || "Category not found")}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label className="font-bold" htmlFor="content" value="Content" />
                            <div className="mt-2 border rounded-lg p-4 rich-text-content">
                                <RichTextViewer content={post.content} />
                            </div>
                        </div>
                        <div>
                            <Label className="font-bold" htmlFor="status" value="Status" />
                            <TextInput id="status" value={post.status ? "Active" : "Inactive" || "Loading"} readOnly />
                        </div>
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                            <div className="md:w-1/2">
                                <Label className="font-bold" htmlFor="createdAt" value="Creation Date" />
                                <TextInput id="createdAt" value={new Date(post.createdAt).toLocaleDateString() || "Loading"} readOnly />
                            </div>
                            <div className="md:w-1/2">
                                <Label className="font-bold" htmlFor="updatedAt" value="Update Date" />
                                <TextInput id="updatedAt" value={new Date(post.updatedAt).toLocaleDateString() || "Loading"} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="flex justify-end">
                <Button className="button-yellow" onClick={onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default InfoPostModal;