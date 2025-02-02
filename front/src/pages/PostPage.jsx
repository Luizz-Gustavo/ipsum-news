import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetchPostBySlug } from '../api/services/fetchPostBySlug';
import { formatDate, formatTime } from '../utils/formatDateTime';
import "../assets/css/PostPage.css";
import Footer from '../components/Footer';
import { FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import ScrollToTopButton from '../components/ToTheTop';
import ErrorComponent from '../components/ErrorComponent';
import NavBar from '../components/Navbar';
import '../assets/css/rich-text.css';
import RichTextViewer from '../components/RichTextViewer';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

function PostPage() {
    const { category, slug } = useParams();

    const { data: postData, error, isLoading } = useSWR(
        slug ? `${category}/${slug}` : null, 
        fetchPostBySlug
    );
    
    if (isLoading) return <Spinner />;
    if (error) return <ErrorComponent error={error} />;
    if (!postData) return <Navigate to="/404" replace />;

    // Formats the creation date and time
    const creationDate = formatDate(postData.createdAt);
    const creationTime = formatTime(postData.createdAt);

    // Formats the update date and time
    const updateDate = postData.updatedAt ? formatDate(postData.updatedAt) : null;
    const updateTime = postData.updatedAt ? formatTime(postData.updatedAt) : null;

    // Checks if the post was updated and renders the update date
    const isUpdated = postData.updatedAt && postData.updatedAt !== postData.createdAt;

    // Build the full name of the author in a safe way
    const authorFullName = postData.author 
        ? `${postData.author.name || ''} ${postData.author.lastName || ''}`.trim() 
        : 'Unknown Author';

    return (
        <>
            <NavBar />

            <div className="category-section flex justify-center">
                <h1 className="category-section-title text-black text-2xl mt-2">
                    <span className='text-black'>{postData.category?.name}</span>
                </h1>
            </div>

            <div className="main-banner-post w-full flex flex-col items-center p-4">
                <h1 className="main-banner-post-title text-black text-4xl mt-6">{postData.title}</h1>
                <iframe 
                    className="main-banner-post-video mt-5" 
                    src={postData.videoLink} 
                    title={postData.title} 
                />
            </div>

            <div className="post-info-box flex justify-center mt-4">
                {isUpdated && (
                    <p className="text-xl text-gray-500 flex items-center">
                        <MdOutlinePublishedWithChanges className="mr-2" />
                        <span className='post-info-update'>Atualizado em {updateDate} - {updateTime}</span>
                    </p>
                )}
                
                {postData.author && (
                    <p className="text-xl text-gray-500 flex items-center ml-3">
                        <FaUser className="mr-2" />
                        <span className='post-info-author'>{authorFullName}</span>
                    </p>
                )}

                <div className="date-time-container ml-4">
                    <p className="text-xl text-gray-500 flex items-center mr-4">
                        <FaCalendarAlt className="mr-2" />
                        <span className='post-info-date'>{creationDate}</span>
                    </p>
                    <p className="text-xl text-gray-500 flex items-center mr-4">
                        <FaClock className="mr-2" />
                        <span className='post-info-time'>{creationTime}</span>
                    </p>
                </div>
            </div>
            <div className='post-content-box flex p-4 mt-4'>
                <div className='post-content-text-box flex-1' style={{ flex: '0 0 70%' }}>
                    <RichTextViewer content={postData.content} />
                </div>
                <div className='post-image-box flex-1' style={{ flex: '0 0 30%' }}>
                    <img className="post-image" src={postData.imageUrl} alt={postData.title} />
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </>
    );
}

export default PostPage;