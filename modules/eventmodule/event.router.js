import { Router } from "express";
const eventrouter = Router();

import * as router from "./controller/event.js";
import { fileValiadtion, myMulter } from "../../services/multer.js";
eventrouter.post(
  "/insert",
  myMulter(fileValiadtion.image).single("image"),
  router.createevent
);
eventrouter.get("/events/:event_id", router.getEventbyId);
eventrouter.get("/event/bbb", router.getEventbytype);
eventrouter.put("/event/:id", router.modifyevent);

eventrouter.delete(
  "/event/:id",
  myMulter(fileValiadtion.image).single("image"),
  router.deleteevent
);

//..............Task2...............//
eventrouter.post(
  "/event/createNudge",
  myMulter(fileValiadtion.image).array("image", 2),
  router.createNudge
);

export default eventrouter;
