import Footer from "../components/Footer";
import NavBar from "../components/Navbar";  
import Posts from "../components/Posts";
import "../assets/css/layout.css";

function PostList() {
    return (
        <div className="layout">
            <NavBar />
            <div className="content">
                <Posts />
            </div>
            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
}

export default PostList;