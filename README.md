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
