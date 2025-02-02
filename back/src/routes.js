import express from 'express';
import {NewPost} from "./controllers/post/NewPostController.js"
import {PostsList} from "./controllers/post/PostListController.js"
import { EditPost } from './controllers/post/EditPostController.js'; 
import { getPostBySlug } from './controllers/post/GetPostBySlug.js';
import { InfiniteScrollList } from './controllers/InfiniteScrollList.js';
import {getCategoriesActive} from "./controllers/category/getCategoriesActive.js"
import { getHighlights, getAllHighlights, getHighlightsByCategory } from './controllers/highlights.js';
import { getPostsByCategory } from './controllers/post/getPostByCategory.js';
import { login, logout, register, getMe } from './controllers/auth/authController.js';
import { authorizeRoles } from './middleware/authMiddleware.js';
import { createUser } from './controllers/user/createUser.js';
import { updateUser } from './controllers/user/updateUser.js';
import { disableUser } from './controllers/user/disableUser.js';
import { getUserByNickname, getAllUsers} from './controllers/user/getUser.js';
import { createCategory } from './controllers/category/createCategory.js';
import { authenticateJWT } from './middleware/authMiddleware.js';
import { getUsers } from './controllers/user/getUsers.js';
import { getCategories } from './controllers/category/getCategories.js';
import { disableCategory } from './controllers/category/disableCategory.js';
import { enableCategory } from './controllers/category/enableCategory.js';
import { sendMailCode } from './controllers/auth/SendMailCode.js';
import { verifyResetCode } from './controllers/auth/verifyResetCode.js';
import { resetPassword } from './controllers/auth/resetPasswordController.js';
import { verifyPassword, changePassword } from './controllers/ChangePasswordController.js';

const router = express.Router();

// Auth routes
router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.post('/send-mailcode', sendMailCode);
router.post('/verify-code', verifyResetCode);
router.post('/verify-password', verifyPassword);
router.post('/change-password', changePassword);
router.post('/reset-password', resetPassword);
router.get('/me', authenticateJWT, getMe);

// User routes
router.get('/users', authenticateJWT, authorizeRoles('administrator'), getUsers);
router.post('/create-user', authenticateJWT, authorizeRoles('administrator'), createUser);
router.patch('/update-user/:id', authenticateJWT, authorizeRoles('administrator'), updateUser);
router.put('/disable-user/:id', authenticateJWT, authorizeRoles('administrator'), disableUser);

router.get('/user/:nickname', getUserByNickname);
router.get('/users', authenticateJWT, authorizeRoles('administrator'), getAllUsers);

// category routes
router.post('/create-category', authenticateJWT, authorizeRoles('administrator'), createCategory);
router.put('/disable-category/:id', authenticateJWT, authorizeRoles('administrator'), disableCategory);
router.put('/enable-category/:id', authenticateJWT, authorizeRoles('administrator'), enableCategory);
router.get('/categories', getCategoriesActive);
router.get('/all-categories', getCategories);
router.get('/highlights/:category', getHighlightsByCategory);
router.get('/:category/:slug', getPostBySlug);
router.get('/categories/:category', getPostsByCategory);

// post routes
router.post('/new-post', authenticateJWT, authorizeRoles('writer', 'administrator'), NewPost);
router.patch('/update-post/:id', authenticateJWT, authorizeRoles('administrator'), EditPost);
router.get('/posts-list', authenticateJWT, authorizeRoles('administrator'), PostsList);
router.get('/latest-posts', InfiniteScrollList);

// highlights routes
router.get('/highlights', getHighlights);
router.get('/all-highlights', getAllHighlights);

export default router;