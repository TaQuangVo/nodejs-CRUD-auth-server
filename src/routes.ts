import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResourses"
import { createUserSchema } from "./schema/user.chema";

const routes = (app:Express) => {
    app.get("/healthcheck", (req: Request, res: Response) => res.send(200))

    app.post("/api/users", validateResource(createUserSchema), createUserHandler)
}

export default routes