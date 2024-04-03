import { Express } from "express";
import { WardenEp } from "../end-points/warden-ep";

export function initWardenRoutes(app: Express) {
  /* PUBLIC ROUTES */
  app.get("/api/auth/view-all/properties", WardenEp.viewPropertiesToApprove);
  app.post(
    "/api/auth/approve/property/:postId/:wardenId",
    WardenEp.approveProperty
  );
  app.post(
    "/api/auth/reject/property/:postId/:wardenId",
    WardenEp.rejectProperty
  );
}
