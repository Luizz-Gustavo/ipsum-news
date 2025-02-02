import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import FormNewPost from "../components/FormNewPost";

function CreatePost() {
    return (
        <>
            <NavBar />
            <FormNewPost />

            <footer className="mt-10">
                <Footer />
            </footer>
        </>
    )
}

export default CreatePost;