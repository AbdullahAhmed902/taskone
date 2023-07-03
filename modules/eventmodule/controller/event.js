import { Timestamp, ObjectId } from "mongodb";
import db from "../../../../DB/dbconnection.js";
// import date from "date-and-time";
import date from "date-and-time";
import { asynchandler } from "../../../services/asyncHandler.js";
import { pagination } from "../../../services/pagination.js";
import cloudnairy from "../../../services/cloudnairy.js";
export const createevent = async (req, res) => {
  let collection = db.collection("documents");
  const { secure_url } = await cloudnairy.uploader.upload(req.file.path, {
    folder: "task/pic",
  });
  var timestamp = new Timestamp();
  var attendes = new Array();
  let {
    type,
    name,
    age,
    tagline,
    description,
    category,
    subcategory,
    rigor_rank,
  } = req.body;
  let nage = Number(age);
  let nrigor_rank = Number(rigor_rank);

  let results = await collection.insertOne({
    uid: new ObjectId(),
    type,
    name,
    age: nage,
    tagline,
    description,
    category,
    subcategory,
    rigor_rank: nrigor_rank,
    schedule: timestamp,
    image: secure_url,
    attendes,
  });
  res.status(200).json({ message: "done", results });
};

export const getEventbyId = asynchandler(async (req, res, next) => {
  let collection = db.collection("documents");
  const { event_id } = req.params;
  let _id = new ObjectId(event_id);
  let result = await collection.findOne({ _id });
  return res.status(200).json({ message: "done", result });
});

export const getEventbytype = asynchandler(async (req, res, next) => {
  let collection = db.collection("documents");
  const { page, size } = req.query;
  const { skip, limit } = pagination(+page, +size);
  const { search } = req.query;
  let results = collection.find({ type: search }).limit(limit).skip(skip);
  let alldoc = [];
  for await (const doc of results) {
    alldoc.push(doc);
  }
  res.status(200).json({ message: "done", alldoc });
});

export const deleteevent = asynchandler(async (req, res, next) => {
  let collection = db.collection("documents");
  const { id } = req.params;
  let _id = new ObjectId(id);
  const result = await collection.deleteOne({ _id });
  result.deletedCount
    ? res.status(200).json({ message: "done" })
    : next(Error("event not found"));
});

export const modifyevent = asynchandler(async (req, res, next) => {
  let collection = db.collection("documents");
  const { id } = req.params;
  const _id = new ObjectId(id);
  const event = await collection.findOne({ _id });
  if (!event) {
    next(Error("in-valid event id ", { cause: 404 }));
  } else {
    if (req.file) {
      const { secure_url } = await cloudnairy.uploader.upload(req.file.path, {
        folder: `task/pic/${_id}`,
      });
      req.body.image = secure_url;
    }
    const { category } = req.body;
    console.log(category);
    const result = await collection.updateOne({ _id }, { $set: { category } });
    if (req.file) {
      await cloudnairy.uploader.destroy(result.secure_url);
    }
    res.status(200).json({ message: "done", result });
  }
});

//.............Task2............//

export const createNudge = asynchandler(async (req, res, next) => {
  let collection = db.collection("Nudges");
  const { titleofevent, time, description, invationline } = req.body;
  const images = [];
  for (const file of req.files) {
    const { secure_url } = await cloudnairy.uploader.upload(file.path, {
      folder: `task/pic/Nudges`,
    });
    images.push(secure_url);
  }
  const now = new Date(time);
  const newdate = date.format(now, "YYYY/MM/DD HH:mm:ss");
  console.log(newdate);
  const result = await collection.insertOne({
    titleofevent,
    image: images[0],
    timeing: newdate,
    descriptionofNudge: description,
    icon: images[1],
    invationline,
  });
  res.status(200).json({ message: "done", result });
});
