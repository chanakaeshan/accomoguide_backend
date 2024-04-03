import { Express } from "express";
import { LandLordEp } from "../end-points/landlord-ep";

export function initLandLordRoutes(app: Express) {
  /* PUBLIC ROUTES */
  app.post("/api/auth/create/landlord/post/:userId", LandLordEp.createPost);

  app.get(
    "/api/auth/view/properties/:userId",
    LandLordEp.viewPublishedProperties
  );
  app.post(
    "/api/auth/delete/property/:postId/:userId",
    LandLordEp.deletePublishedProperty
  );
  app.post(
    "/api/auth/accept/student/request/:postId/:landlordId",
    LandLordEp.acceptStudentRequest
  );
  app.post(
    "/api/auth/reject/student/request/:postId/:landlordId",
    LandLordEp.rejectStudentRequest
  );
}
