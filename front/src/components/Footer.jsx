import { FaGithub, FaEnvelope } from "react-icons/fa6";
import "../assets/css/footer.css";
import newspaper from "../assets/img/newspaper.png";

function Footer() {
    return (
        <div className="footer grid grid-cols-1 md:grid-cols-2">
            <div className="left-column flex flex-col">
                <div className="description-box flex items-center justify-center p-4">
                    <p className="disclaimer-text text-center text-white italic">
                        Fictitious project for portfolio presentation, if there is any protected content, contact to immediately remove!
                    </p>
                </div>

                <div className="social-icons-box flex flex-row">
                    <div className="social-icons-items">
                        <a href="mailto:im.gusta02@gmail.com" className="icon text-white text-2xl flex items-center gap-2 hover:text-gray-300">
                            <FaEnvelope />
                            <span className="text-sm">Contact me!</span>
                        </a>
                    </div>

                    <div className="social-icons-items">
                        <a href="https://github.com/luizz-gustavo" target="_blank" rel="noreferrer" className="icon text-white text-2xl flex items-center gap-2 hover:text-gray-300">
                            <FaGithub />
                            <span className="text-sm">Luizz-Gustavo</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="right-column">
                <div className="logo">
                    <img src={newspaper} alt="Logo" className="logo text-white mx-auto" />
                </div>
            </div>
        </div>
    );
}

export default Footer;