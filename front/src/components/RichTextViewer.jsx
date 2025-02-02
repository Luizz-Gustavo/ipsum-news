import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function RichTextViewer({ content }) {
    return (
        <ReactQuill
            value={content || ''}
            readOnly={true}
            theme="bubble"
            modules={{ toolbar: false }}
        />
    );
}

export default RichTextViewer;