# HeartLens 🫀  
[Live Demo](https://biof3003-assignment-wheat.vercel.app/)

HeartLens is a web-based application that captures and processes **photoplethysmography (PPG)** signals via a webcam. It calculates **heart rate (BPM)**, **heart rate variability (HRV)**, and **signal quality** in real time using machine learning algorithms. The app also features user management, live data visualization, and automatic data storage to **MongoDB** for further analysis.

---

## 🧠 Project Overview

The HeartLen App is a web-based tool designed to process photoplethysmography (PPG) signals captured via a webcam. It calculates heart rate, heart rate variability (HRV), and signal quality using machine learning models. The processed data can be saved to a MongoDB database for further analysis.

---

## 🛠️ Repository Structure

~~~plain
/heartlen-app
├── app
│   ├── components       # Reusable React components (e.g., CameraFeed, ChartComponent)
│   ├── hooks            # Custom React hooks (e.g., usePPGProcessing, useSignalQuality)
│   ├── api              # Backend API routes (e.g., save-record.ts)
│   └── page.tsx         # Main page of the app
├── public               # Public assets (e.g., TensorFlow.js models)
├── types.ts             # TypeScript type definitions
├── lib                  # Handles previously repeated MongoDB database connection logic for better comprehensibility of api routes
├── models               # Defines the MongoDB schema for the record data to be saved
├── README.md            # Project documentation
└── package.json         # Project dependencies and scripts

~~~

---

## 🚀 Installation Instructions

### ✅ Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)

### 📦 Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/heartlen-app.git
   cd heartlen-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Navigate to `http://localhost:3000` in your browser.

---

## 🔗 Connecting to MongoDB

To link the app to your MongoDB database:

1. Create a MongoDB Atlas cluster or use a local MongoDB instance.
2. Copy the connection string from MongoDB Atlas and paste it into the `.env.local` file as shown above.
3. Ensure the database has a collection named `records` to store PPG data.

---

## 🖥️ Usage Guide

1. **Confirm User**
   - Enter your subject name or ID
   - Click **"Confirm User"** to proceed

2. **Recording**
   - Click **"START RECORDING"** to activate the webcam
   - Allow time for signal quality to stabilize
   - Click **"START SAMPLING"** to begin saving data every 10 seconds

3. **Signal Configuration**
   - Toggle **"Show Config"** to reveal signal customization options
   - Choose your preferred signal combination setup

4. **Data Management**
   - View live plots of PPG signal, BPM, and HRV
   - Data is saved automatically or manually using **"Save Data to MongoDB"**

---

## 🌐 Deployment

To deploy HeartLens on a platform like Vercel:

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server locally**
   ```bash
   npm start
   ```

3. **Deploy on Vercel or another hosting provider**
   - Ensure `.env` variables are correctly set as "Environment Variables: in the deployment environment

---

## 💡 Features

- 📸 Real-time PPG Signal Capture via webcam  
- 📊 Live Heart Rate & HRV Monitoring  
- 🧪 Signal Quality Detection  
- 🔒 Secure User Authentication (lightweight)  
- 💾 MongoDB Data Storage
- 🛠 Custom Signal Configuration Options  
- 📈 Live Charts with Chart.js  
- 🎨 Responsive and modern UI with Tailwind CSS
   -  🌙 Dark mode!

---

## 🧼 Code Quality

- Modularized structure with **custom hooks** and **reusable components**  
- Follows **TypeScript** best practices and **Next.js 13 App Router** conventions  

---


## OnBit production
Monitor: https://onbit-monitor.vercel.app
Consumer: https://onbit-fe.vercel.app
Production requires server-side MONGODB_URI in Vercel and Atlas network access. Both screens use the same four-digit demo code; this is a demo identifier, not authentication. The consumer proxies /api to Monitor with Vercel rewrites. The production relay persists the latest snapshot per code in onbit.live_measurements. Local dev uses memory. Deploy with `vercel deploy --prod --scope pdgdaccord`.
