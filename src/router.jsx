import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddBlog from './Pages/AddBlog'
import BlogDocument from './Pages/BlogDocument'
import Blogs from './Pages/Blogs'
import Login from './Pages/Login'
import PeriodicTable from './Pages/PeriodicTable'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard/Dashboard'
import Usuarios from './Pages/Dashboard/Usuarios'

const Router = () => {
    return (
        <Routes>
            <Route element={<PeriodicTable />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Blogs />} path="/blogs" />
            <Route element={<BlogDocument />} path="/blogs/:id" />
            <Route element={<AddBlog />} path="/addBlog" />
            <Route element={<Dashboard />} path="/dashboard/blogs" />
            <Route element={<Usuarios />} path="/dashboard/users" />
        </Routes>
    )
}

export default Router