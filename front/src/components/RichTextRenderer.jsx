import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

function RichTextRenderer({ content }) {
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <div 
            className="rich-text-content ql-editor" 
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
}

export default RichTextRenderer; 