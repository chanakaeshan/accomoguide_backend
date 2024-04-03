import { Express } from "express";
import { UserEp } from "../end-points/user-ep";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

export function initUserRoutes(app: Express) {
  /* PUBLIC ROUTES */
  app.post(
    "/api/public/login",
    // UserEp.authenticateWithEmailValidationRules(),
    UserEp.authenticateWithEmail
  );
  app.post("/api/public/signup/landlord", UserEp.signUpLandlord);
  app.post("/api/auth/signup/accounts", UserEp.registerAUserByWebMaster);

  /* AUTH ROUTES */
  app.get("/api/auth/get/user", UserEp.getUserDetails);
  app.get("/api/auth/get/user/:userId", UserEp.getUserById);

  app.post(
    "/api/auth/reset/password",
    UserEp.resetPasswordValidationRules(),
    UserEp.resetPassword
  );
}
