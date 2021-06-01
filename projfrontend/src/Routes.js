import React from 'react';
import { BrowserRouter ,Switch, Route} from 'react-router-dom';
import Home from "./core/Home"
import Signin from './user/Signin';
import Signup from './user/Signup';
import AdminRoute from "./auth/helper/AdminRoutes"
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
// import { ManageProducts } from 'C:\Users\Shivam\Desktop\New folder\projfrontend\src\admin\ManageProducts.js';




const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route  exact path = "/" component={Home} />     
                <Route  exact path = "/Signup" component={Signup} />     
                <Route  exact path = "/Signin" component={Signin} />   / 
                <Route  exact path = "/Cart" component={Cart} />   / 
                <PrivateRoute  exact path = "/user/dashboard" component={UserDashBoard} />     
                <AdminRoute  exact path = "/admin/dashboard" component={AdminDashBoard} />     
                <AdminRoute  exact path = "/admin/create/category" component={AddCategory} />     
                <AdminRoute  exact path = "/admin/categories" component={ManageCategories} />     
                <AdminRoute  exact path = "/admin/create/product" component={AddProduct} /> 
                <AdminRoute  exact path = "/admin/products" component={ManageProducts} />     
                <AdminRoute  exact path = "/admin/product/update/:productId" component={UpdateProduct} />     
    
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
