import { useState } from "react";
import { Button, Alert, Spinner } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "../assets/css/form-new-post.css";
import { NewPostService } from "../api/services/newPostService";
import NewPostSuccess from "./notifications/NewPostSuccess";
import NewPostError from "./notifications/NewPostError";
import { FaNewspaper } from "react-icons/fa6";
import { fetchCategories } from "../api/services/fetchCategories";
import ClearEmbedLink from "../utils/ClearEmbedLink";
import useSWR from "swr";
import { useAuth } from "../context/AuthContext";

function FormNewPost() {
    const { user } = useAuth();

    // REACT QUILL SETTINGS
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['code-block'],
            ['clean'],
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'align', 'list', 'bullet', 'indent',
        'link', 'code-block', 'script'
    ];

    const [title, setTitle] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isThumbnailLoading, setIsThumbnailLoading] = useState(false);

    const { data: categories = [] } = useSWR('categories', fetchCategories);

    // function to extract the video ID from an embedding link
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

    // function to get the YouTube thumbnail
    const getYouTubeThumbnail = (videoID) => {
        return `https://img.youtube.com/vi/${videoID}/0.jpg`;
    };

    const handleVideoLinkChange = (e) => {
        const url = ClearEmbedLink(e.target.value);
        setVideoLink(url);
        setIsThumbnailLoading(true);

        const videoID = extractYouTubeVideoID(url);
        if (videoID) {
            const thumb = getYouTubeThumbnail(videoID);
            setThumbnail(thumb);
            setErrorMessage("");
            setIsThumbnailLoading(false);
        } else {
            setThumbnail("");
            if (url.trim() !== "") {
                setErrorMessage("Invalid video URL. Please enter a YouTube embedding link.");
            } else {
                setErrorMessage("");
            }
            setIsThumbnailLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const videoID = extractYouTubeVideoID(videoLink);
        if (!videoID) {
            setErrorMessage("Invalid video URL. Please enter a YouTube embedding link.");
            return;
        }

        // content validation
        if (!content.trim()) {
            setErrorMessage("The post content is required.");
            return;
        }

        setIsSubmitting(true);
        
        const data = {
            title: title.trim(),
            videoLink: videoLink.trim(),
            imageUrl: thumbnail,
            categoryId: parseInt(category),
            content: content.trim(),
        };

        try {
            await NewPostService(data);
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message || "An error occurred while creating the post.");
            setShowErrorModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        // resetting the form states when the modal is closed
        setTitle("");
        setVideoLink("");
        setThumbnail("");
        setCategory("");
        setContent("");
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        if (errorMessage === "Invalid video URL. Please enter a YouTube embedding link.") {
            setThumbnail("");
            setErrorMessage("");
        }
    };

    const handleApiResponse = (response) => {
        if (response.status === 200) {
            return response.data;
        }
        if (response.data && response.data.error) {
            throw new Error(response.data.error);
        }
        throw new Error(`Failed to update the user. Status code: ${response.status}`);
    };

    const processError = (error) => {
        if (error.response) {
            if (error.response.status === 403) {
                throw new Error('Access denied: insufficient permissions.');
            }
            const errorMessage = error.response.data.error
                ? error.response.data.error
                : 'Unknown server error.';
            throw new Error(errorMessage);
        }
        if (error.request) {
            throw new Error('No server response. Check your network connection.');
        }
        throw new Error(`${error.message}`);
    };

    const updateUserService = async (userId, data) => {
        try {
            const response = await Api.patch(`/update-user/${userId}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return handleApiResponse(response);
        } catch (error) {
            throw processError(error);
        }
    };

    return (
        <div>
            <div className="create-post-title-box flex mt-12">
                <FaNewspaper className="text-3xl" />
                <h1 className="create-post-title text-black text-3xl ml-3">Create Post</h1>
            </div>

            <div className="container-titulo">
                <div className="new-post-title-box">
                    <h1 className="new-post-title">POST CONTENT</h1>
                </div>
            </div>

            <div className="container-tabela">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block">
                                Author
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={`${user.name} ${user.lastName}`}
                                    readOnly
                                    className="form-control rounded-lg mt-2 border-gray-300 p-2 w-1/3 bg-gray-100"
                                />
                                
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="publicationTitle" className="block">
                                Post Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="form-control rounded-lg mt-2 border-gray-300 p-2 w-full"
                                type="text"
                                id="publicationTitle"
                                aria-required="true"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="videoLink" className="block">
                                Embedding Link <span className="text-red-500">*</span>
                            </label>
                            <input
                                placeholder="https://www.youtube.com/embed/..."
                                className="form-control rounded-lg mt-2 border-gray-300 p-2 w-full"
                                type="text"
                                id="videoLink"
                                aria-required="true"
                                value={videoLink}
                                onChange={handleVideoLinkChange}
                                required
                            />
                            {/* display alert if the error is related to the video URL */}
                            {errorMessage === "Invalid video URL. Please enter a YouTube embedding link." && (
                                <Alert color="failure" className="mt-2">
                                    <span>
                                        <span className="font-medium">Error:</span> {errorMessage}
                                    </span>
                                </Alert>
                            )}
                        </div>

                        {isThumbnailLoading ? (
                            <div className="mt-4 flex items-center">
                                <Spinner size="sm" />
                                <span className="ml-2">Loading thumbnail...</span>
                            </div>
                        ) : (
                            thumbnail && (
                                <div className="mt-4">
                                    <label className="block">
                                        Generated Cover:
                                    </label>
                                    <img src={thumbnail} alt="Video thumbnail" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                                </div>
                            )
                        )}

                        <div className="mt-4">
                            <label htmlFor="publicationCategory" className="block">
                                Post Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="form-control rounded-lg mt-2 border-gray-300 p-2 w-full"
                                id="publicationCategory"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <p className="mt-4 ml-2 font-bold">
                            Elaborate the post content below:
                        </p>

                        <div className="editor-container mt-4">
                            <ReactQuill
                                placeholder="Write the post content here!"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                formats={formats}
                                aria-label="Publication content"
                                required
                            />
                        </div>

                        <div className="flex justify-end mt-16">
                            <Button type="submit" onClick={handleSubmit} className="button-yellow" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <NewPostSuccess
                show={showSuccessModal}
                onClose={handleCloseSuccessModal}
            />

            <NewPostError show={showErrorModal} onClose={handleCloseErrorModal} message={errorMessage} />
        </div>
    );
}

export default FormNewPost;