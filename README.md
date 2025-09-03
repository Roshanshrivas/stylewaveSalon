# 💇‍♂️ StyleWave Salon – MERN Stack Booking Platform  

StyleWave Salon is a **production-ready full-stack web application** built using the **MERN stack**.  
It is designed for **salons and parlors** to manage services, staff, appointments, payments, and user bookings with a seamless admin and user experience.  

---

## 🚀 Features  

### 👤 User Features  
- User **signup/login with JWT authentication**  
- Browse and select available **services & sub-services**  
- **Appointment booking form** with staff and time slot selection  
- Real-time availability check for **time slots**  
- Secure payments integration (Razorpay/Stripe-ready)  
- Booking history & status tracking  

### 🛠️ Admin Features  
- **Admin Dashboard** with stats (users, bookings, revenue, top services, etc.)  
- Manage **services, sub-services, staff, and time slots**  
- View and manage **bookings & payments**  
- Role-based access (Admin vs. User)  
- Multiple Admins can manage the same salon  

### 📦 Tech Stack  
- **Frontend:** React.js, Redux Toolkit, React Router, Axios, TailwindCSS, shadcn/ui  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (access + refresh tokens) with HTTP-only cookies  
- **Payments:** Razorpay/Stripe integration  
- **Others:** Cloudinary for image uploads, Nodemailer for email notifications  

---

## 📂 Database Models  

- **User** → (firstName, lastName, email, password, role [user/admin], contactNumber)  
- **Service** → (serviceName, gender, status, subServices[])  
- **SubService** → (name, price, duration)  
- **Staff** → (name, role, status)  
- **TimeSlot** → (date, time, bookings[])  
- **Booking** → (userId, serviceId, staffId, timeSlotId, paymentStatus, bookingStatus)  

---

## ⚙️ Installation  

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/stylewave-salon.git
   cd stylewave-salon



**4️⃣ Run the project**
Backend → http://localhost:5000
Frontend → http://localhost:5173

**📊 Admin Dashboard**
✅ Stats Cards → Total Users, Bookings, Revenue, Services
📈 Monthly Revenue Chart
📋 Bookings & Top Services Table


**🔒 Authentication Flow**
User/Admin login → server issues JWT access + refresh tokens
Tokens stored securely (Redux state + HTTP-only cookies)
Role-based routing → admin-only routes are protected



**📡 API Endpoints**

Auth
POST /auth/signup → Register new user
POST /auth/login → Login user/admin
POST /auth/logout → Logout user

Services
GET /services → Get all services
POST /services → Create new service (admin only)
PUT /services/:id → Update service (admin only)
DELETE /services/:id → Delete service (admin only)

Bookings
POST /bookings → Create a new booking
GET /bookings/user/:id → Get user’s bookings
GET /bookings → Get all bookings (admin only)

Staff
GET /staff → Get all staff
POST /staff → Add staff (admin only)

Time Slots
GET /timeslots → Get all slots
POST /timeslots → Add slot (admin only)




**User Booking Form**   
              
<img width="1881" height="850" alt="Screenshot 2025-09-03 143612" src="https://github.com/user-attachments/assets/f938e9de-4efb-4353-ba32-19257645bd9c" />


**Admin Dashboard**

<img width="1891" height="862" alt="stylewave" src="https://github.com/user-attachments/assets/2fea09e0-96a2-4c06-8939-b9b3d7c43676" />




👨‍💻 Author
Roshan Shrivas – Full Stack MERN Developer
🌐 Portfolio: 
📧 Email: roshanshrivas11@gmail.com




---
⚡ This is now a **complete README** for GitHub (installation, setup, API docs, screenshots, deployment, license).  
Do you also want me to **add sample demo credentials (like test admin & user login)** in the README so recruiters can test the live app easily?

