import { Express } from "express";
import { StudentEp } from "../end-points/student-ep";

export function initStudentRoutes(app: Express) {
  /* PUBLIC ROUTES */
  app.get("/api/auth/view/properties", StudentEp.getApprovedPropertyPosts);
  app.post("/api/auth/send/property/request/:studentId/:propertyId", StudentEp.sendPropertyRequest);
}
