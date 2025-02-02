import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostList from "./pages/PostList";
import NotFound from './pages/NotFound';
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import ExplorePage from "./pages/ExplorePage";
import CategoryPage from "./pages/CategoryPage";
import LatestPostsPage from "./pages/LatestPostsPage";
import HighlightsPage from "./pages/HighlightsPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from './components/ProtectedRoute';
import ManageUsersPage from './pages/ManageUsersPage';
import ManageCategoriesPage from './pages/ManageCategoriesPage';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <RedirectIfAuthenticated>
                        <LoginPage />
                    </RedirectIfAuthenticated>} />

                <Route path="/register" element={
                    <RedirectIfAuthenticated>
                        <RegisterPage />
                    </RedirectIfAuthenticated>} />

                <Route path="/new-password" element={
                    <RedirectIfAuthenticated>
                        <NewPasswordPage />
                    </RedirectIfAuthenticated>} />
                
                <Route path="/home" element={<Home />} />
                <Route path="/profile/:nickname" element={<ProfilePage />} />
                <Route path="/latest-posts" element={<LatestPostsPage />} />
                <Route path="/highlights" element={<HighlightsPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/categories/:category" element={<CategoryPage />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/:category/:slug" element={<PostPage />} />

                <Route element={<ProtectedRoute allowedRoles={['administrator']} />}>
                    <Route path="/manage-users" element={<ManageUsersPage />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['administrator']} />}>
                    <Route path="/manage-categories" element={<ManageCategoriesPage />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['administrator']} />}>
                    <Route path="/post-list" element={<PostList />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['writer', 'administrator']} />}>
                    <Route path="/create-post" element={<CreatePost />} />
                </Route>

                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;