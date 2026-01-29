const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const { connect } = require("./src/config/database");
const { cloudinaryConnect } = require("./src/config/cloudinary");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const sectionRoutes = require("./src/routes/sectionRoutes");

dotenv.config();

const app = express();

/* =========================================================
   TRUST PROXY
========================================================= */
app.set("trust proxy", 1);

/* =========================================================
   MIDDLEWARES
========================================================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/* =========================================================
   CONNECT SERVICES
========================================================= */
connect();
cloudinaryConnect();

/* =========================================================
   ROUTES
========================================================= */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/section", sectionRoutes);

/* =========================================================
   HEALTH CHECK
========================================================= */
app.get("/", (req, res) => {
  res.status(200).send(
    `<h3>🚀 StudyNotion Backend is running</h3>
     <p>Environment: ${process.env.NODE_ENV}</p>`
  );
});

/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* =========================================================
   START SERVER
========================================================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
