import {
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Pages/Auth/SignIn/SignIn";
import SignUp from "./components/Pages/Auth/SignUp/SignUp";
import Products from "./components/Pages/Products/Products";
import ProductDetail from "./components/Pages/Products/ProductDetail";
import Profile from "./components/Pages/Profile/Profile";
import ProtectedRoute from "./components/Pages/ProtectedRoute";
import Basket from "./components/Basket/Basket";
import Error404 from "./components/Pages/Error404/Error404";
import Admin from "./components/Pages/Admin/Admin";
import AdminRoute from "./components/Pages/AdminRoute";
import Home from "./components/Pages/Admin/Home/Home";
import Orders from "./components/Pages/Admin/Orders/Orders";
import Productss from "./components/Pages/Admin/Products/Products";
import ProductssDetail from "./components/Pages/Admin/ProductssDetail/ProductssDetail";
import NewProducts from "./components/Pages/Admin/Products/NewProducts";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <div id="content">
            <Routes>
                <Route path="/" element={<Products />}></Route>
                <Route path="product/:product_id" element={<ProductDetail/>}></Route>
                <Route path="/signIn" element={<SignIn />}></Route>
                <Route path="/signUp" element={<SignUp/>}></Route>
                <Route path="/basket" element={<Basket/>}></Route>
                <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>}>
                    <Route path={"/admin"} element={<Home/>} />
                    <Route path={"/admin/orders"} element={<Orders/>} />
                    <Route path={"/admin/products"} element={<Productss/>} />
                    <Route path={"/admin/products/new"} element={<NewProducts/>} />
                    <Route path={"/admin/products/:product_id"} element={<ProductssDetail/>} />
                </Route>
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
                <Route path="*" element={<Error404/>}></Route>
            </Routes>
        </div>


    </div>
  );
}



export default App;
