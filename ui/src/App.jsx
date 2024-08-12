import {createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route} 

from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import MainLayout from "./layouts/MainLayout";
import ProductPage, { productLoader } from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmPage from "./pages/ConfirmPage";
import AdminPage from "./pages/AdminPage";
import MessagePage from "./pages/MessagePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AdminPresPage from "./pages/AdminPresPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        

        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order" element={<ConfirmPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />



          <Route
            path="/edit-product/:id"
            element={<EditProductPage />}
            loader={productLoader}
          />
          <Route
            path="/products/:id"
            element={<ProductPage/>}
            loader={productLoader}
          />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />}/>
        </Route>

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/pres" element={<AdminPresPage />} />


      
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;