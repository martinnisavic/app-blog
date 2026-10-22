import { Routes } from '@angular/router';
import { Register } from '../features/auth/register/register';
import { Login } from '../features/auth/login/login';
import { PostList } from '../features/posts/post-list';
import { PostDetail } from '../features/post-detail/post-detail';
import { CreatePost } from '../features/create-post/create-post';
import { authGuard } from '../core/guard/auth.guard';
import { adminGuard } from '../core/guard/admin.guard';
import { Activate } from '../features/auth/activateacc/activate-account';
import { EditPost } from '../features/edit-post/edit-post';
import { Users } from '../features/users/users';
import { Categories } from '../features/categories/categories';
import { CategoryPosts } from '../features/category-posts/category-posts';
import { UserPosts } from '../features/user-posts/user-posts';
import { Profile } from '../features/profile/profile';

export const routes: Routes = [
    {
        path: '', component: PostList, canActivate: [authGuard], title: 'Blog'
    },
    {
        path: 'post/:id', component: PostDetail, canActivate: [authGuard], title: 'Post'
    },
    {
        path: 'login', component: Login, title: 'Login'
    },
    {
        path: 'posts', component: PostList, canActivate: [authGuard], title: 'Posts'
    },
    {
        path: 'register', component: Register, title: 'Register'
    },
    {
        path: 'createPost', component: CreatePost, canActivate: [authGuard], title: 'CreatePost'
    },
    {
        path: 'activate/:code', component: Activate, title: 'Activate'
    },
    {
        path: 'edit/:id', component: EditPost, title: 'EditPost', canActivate:[authGuard]
    },
    {
        path: 'users', component: Users, title: 'Users', canActivate: [adminGuard]
    },
    {
        path: 'users/:id/posts', component: UserPosts, title: 'User posts', canActivate: [adminGuard]
    },
    {
        path: 'categories', component: Categories, title: 'Categories', canActivate: [authGuard]
    },
    {
        path: 'categories/:id/posts', component: CategoryPosts, title: 'Category posts', canActivate: [authGuard]
    },
    {
        path: 'profile', component: Profile, title: 'Profile', canActivate: [authGuard]
    },
];
