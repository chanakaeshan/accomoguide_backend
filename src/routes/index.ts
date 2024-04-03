import { Express, Request, Response } from "express";

import { initUserRoutes } from "./user";
import { initAdminRoutes } from "./admin";
import { initLandLordRoutes } from "./landlord";
import { initWardenRoutes } from "./warden";
import { initStudentRoutes } from "./student";

export function initRoutes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Well done!");
  });

  initUserRoutes(app);
  initAdminRoutes(app);
  initLandLordRoutes(app);
  initWardenRoutes(app);
  initStudentRoutes(app);

  /* ALL INVALID REQUESTS */
  app.get("/", (req: Request, res: Response) => res.redirect(301, "/api/v1"));
  // app.all('*', (req: Request, res: Response) => res.sendError("Invalid Route"));
}
