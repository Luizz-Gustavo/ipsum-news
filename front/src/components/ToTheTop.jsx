import { FaArrowUp } from 'react-icons/fa';
import "../assets/css/to-the-top.css";

function ScrollToTopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button type="button" onClick={scrollToTop} className="scroll-to-top-button">
            <FaArrowUp className="scroll-to-top-icon" />
        </button>
    );
}

export default ScrollToTopButton;