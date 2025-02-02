import { Modal, Button, TextInput, Label, Select } from 'flowbite-react';
import { useState, useEffect, useCallback } from 'react';
import UpdatePostSuccess from '../notifications/UpdatePostSuccess';
import UpdatePostError from '../notifications/UpdatePostError';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/rich-text.css';
import { useNavigate } from 'react-router-dom';
import ClearEmbedLink from '../../utils/ClearEmbedLink';
import { updatePostService } from '../../api/services/updatePostService';
import { fetchCategories } from '../../api/services/fetchCategories';
import useSWR from 'swr';

function EditPostModal({ isOpen, onClose, post }) {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // store initial values for comparison
    const [initialValues, setInitialValues] = useState({});

    // state to determine if there are changes
    const [isChanged, setIsChanged] = useState(false);

    // states to control notifications modals
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    // fetch categories with SWR
    const { data: categories = [] } = useSWR(isOpen ? '/categories' : null, fetchCategories);

    // REACT QUILL SETTINGS
    const modules = {
        toolbar: [
          [{ header: '1'}, { header: '2'}, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'align': [] }],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['code-block'],
          ['clean']
        ],
        clipboard: {
            matchVisual: false // disable visual matching when pasting
        }
    };

    // add these functions to handle the thumbnail
    const extractYouTubeVideoID = (url) => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === "www.youtube.com" && urlObj.pathname.startsWith("/embed/")) {
                return urlObj.pathname.split("/embed/")[1];
            }
            return null;
        } catch (e) {
            return null;
        }
    };

    const getYouTubeThumbnail = (videoID) => {
        return `https://img.youtube.com/vi/${videoID}/0.jpg`;
    };

    const handleVideoLinkChange = (e) => {
        const url = ClearEmbedLink(e.target.value);
        setVideoLink(url);

        const videoID = extractYouTubeVideoID(url);
        if (videoID) {
            const thumb = getYouTubeThumbnail(videoID);
            setThumbnail(thumb);
            setError('');
        } else {
            setThumbnail('');
            if (url.trim() !== '') {
                setError('Invalid video URL. Please enter a YouTube embedding link.');
            } else {
                setError('');
            }
        }
    };

    // function to reset states
    const resetStates = useCallback(() => {
        if (post) {
            setTitle(post.title);
            setVideoLink(post.videoLink || '');
            const videoID = extractYouTubeVideoID(post.videoLink);
            if (videoID) {
                setThumbnail(getYouTubeThumbnail(videoID));
            }
            setCategory(post.category?.id || '');
            setContent(post.content || '');
            setStatus(post.status || false);
            setInitialValues({
                title: post.title,
                videoLink: post.videoLink || '',
                category: post.category?.id || '',
                content: post.content || '',
                status: post.status || false,
            });
            setIsChanged(false); // Reset the change state
            setError('');
            setSuccess(false);
        }
    }, [post]);

    // reset states when modal is opened
    useEffect(() => {
        if (isOpen) {
            resetStates();
        }
    }, [isOpen, resetStates]);

    // check if there are changes in the form by the user
    useEffect(() => {
        const hasChanged =
            title !== initialValues.title ||
            videoLink !== initialValues.videoLink ||
            category !== initialValues.category ||
            content !== initialValues.content ||
            status !== initialValues.status;
        setIsChanged(hasChanged);
    }, [title, videoLink, category, content, status, initialValues]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess(false);

        const videoID = extractYouTubeVideoID(videoLink);
        if (videoLink && !videoID) {
            setError('Invalid video URL. Please enter a YouTube embedding link.');
            setShowError(true);
            setIsSubmitting(false);
            return;
        }

        const updatedData = {};

        if (title !== initialValues.title) {
            updatedData.title = title;
        }
        if (videoLink !== initialValues.videoLink) {
            updatedData.videoLink = videoLink;
            updatedData.imageUrl = thumbnail;
        }
        if (category !== initialValues.category) {
            updatedData.categoryId = parseInt(category);
        }
        if (content !== initialValues.content) {
            updatedData.content = content;
        }
        if (status !== initialValues.status) {
            updatedData.status = status;
        }

        if (Object.keys(updatedData).length === 0) {
            setError('No changes detected.');
            setShowError(true);
            setIsSubmitting(false);
            return;
        }

        try {
            const updatedPost = await updatePostService(post.id, updatedData);

            setSuccess(true);
            setShowSuccess(true);
            setInitialValues({
                ...initialValues,
                ...updatedData,
            });
            
            // update post with new data, including the category
            post.category = updatedPost.category;
            post.title = updatedPost.title || post.title;
            post.slug = updatedPost.slug || post.slug;
            
            onClose();
            window.location.reload(); // Reload the page after successful update
        } catch (err) {
            console.error('Error updating the post:', err);
            setError(err.response?.data?.error || 'Error updating the post.');
            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    // handler to redirect to the post
    const handleRedirect = () => {
        if(!post?.category?.slug){
            setError('Error redirecting to the post.');
            setShowError(true);
        }
        
        if (post?.category?.slug) {
            onClose();
            navigate(`/${post.category.slug}/${post.slug}`);
        }
    };

    // Handler to confirm exit of the modal if there are still changes in the form.
    const handleClose = () => {
        if (isChanged) {
            const confirmClose = window.confirm(
                'You have unsaved changes. Are you sure you want to exit without saving?'
            );
            if (confirmClose) {
                resetStates(); // Reset the states before closing
                onClose();
            }
            // If the user cancels, do nothing and keep the modal open
        } else {
            onClose();
        }
    };

    // Handlers to close the notification modals
    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setSuccess(false);
        resetStates(); // Reset the states when closing the success modal
    };

    const handleCloseError = () => {
        setShowError(false);
        setError('');
    };

    const renderNotifications = () => (
        <>
            {showError && (
                <UpdatePostError
                    show={showError}
                    onClose={handleCloseError}
                    message={error}
                />
            )}
            {showSuccess && (
                <UpdatePostSuccess
                    show={showSuccess}
                    onClose={handleCloseSuccess}
                    title={title}
                    onRedirect={handleRedirect}
                />
            )}
        </>
    );

    return (
        <>
            <Modal show={isOpen} onClose={handleClose} size="2xl" popup>
                <div className="header-modal px-4 py-2 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Edit Post</h1>
                </div>

                <Modal.Body className="p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <Label className="font-semibold mb-1" htmlFor="postTitle">Title</Label>
                            <TextInput
                                id="postTitle"
                                name="postTitle"
                                placeholder="Title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label className="font-semibold mb-1" htmlFor="videoLink">Video Link</Label>
                            <TextInput
                                id="videoLink"
                                name="videoLink"
                                placeholder="Video Link"
                                value={videoLink}
                                onChange={handleVideoLinkChange}
                                className="w-full"
                            />
                            {error && error.includes('URL de vídeo') && (
                                <div className="mt-2 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}
                        </div>

                        {thumbnail && (
                            <div className="flex flex-col">
                                <Label className="font-semibold mb-1">Generated Cover:</Label>
                                <img 
                                    src={thumbnail} 
                                    alt="Video thumbnail" 
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            </div>
                        )}

                        <div className="flex flex-col">
                            <Label className="font-semibold mb-1" htmlFor="category">Category</Label>
                            <Select
                                id="category"
                                name="category"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="flex flex-col">
                            <Label className="font-semibold mb-1" htmlFor="postContent">Content</Label>
                            <div className="rich-text-content">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <Label className="font-semibold mb-1" htmlFor="status">Status</Label>
                            <Select
                                className="w-full text-center"
                                name="status"
                                value={status.toString()}
                                onChange={(e) => setStatus(e.target.value === 'true')}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </Select>
                        </div>

                        <div>
                            {renderNotifications()}
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <Button
                                color="gray"
                                onClick={handleClose}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="button-yellow"
                                type="submit"
                                disabled={isSubmitting || !isChanged}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            
            {renderNotifications()}
        </>
    );
}

export default EditPostModal;