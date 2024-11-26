# 🏥 **ONLINE PHARMACY WEB APP**

**📄 PROJECT OVERVIEW**

The Online Pharmacy Web Application provides a platform for users to browse and purchase medicines digitally. Built with the MERN stack (MongoDB, Express.js, React, and Node.js) and Docker for containerization, the app offers a seamless experience for users to manage accounts, place orders, and contact support. Admins have specific roles, including product, prescription, and message management. Admin login is restricted by a secure admin passphrase.

---

**🔑 FEATURES**

### **👤 User**
- **Login & Signup**: Secure user authentication.
- **Home**: Product information is accessible even without signup.
- **🛒 Product Page**: Each medicine has a dedicated page with details such as name, description, price, and available stock.
- **🛍️ Cart Management**: Users can add, edit, or delete products in their cart.
- **📞 Contact Us**: A messaging system for user inquiries.
- **📝 Checkout**: A page for uploading prescriptions.
- **🚪 Logout**: End the session securely.

### **🔒 Admin**
- **Admin Authentication**: Secure login through an admin passphrase.
- **📊 Dashboard**: Manage products (add, edit, delete).
- **📩 Message Management**: Access messages from users.
- **🧾 Prescription Management**: Review uploaded prescriptions during checkout.
- **🚪 Logout**: End the session securely.

---

**⚙️ TECHNOLOGIES USED**

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker

---

**🛠️ OTHER TOOLS**

- **Multer**: Handles prescription uploads.
- **JWT (JSON Web Tokens)**: Secures user authentication and manages sessions.

---

**🚀 GETTING STARTED**

1. **Clone the Repository**: `git clone <repository-url>`
2. **Docker Setup**: `docker-compose up --build`
3. **Accessing the Application**: Once the containers are up, visit `localhost:3001` to access the app.

---

**📹 Demo Video Link**

[Demo Video](https://youtu.be/ScJ48eiT0zs)
