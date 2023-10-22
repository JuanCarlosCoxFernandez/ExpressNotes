module.exports = app => {
  const task = require("../controllers/task.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Task
  // DECOMMENT:
  router.post("/", upload.single('file'), task.create);

  // Retrieve all Task
  router.get("/", task.findAll);

  // Retrieve a single Task with id
  router.get("/:id", task.findOne);

  // Update a task with id
  router.put("/:id", upload.single('file'), task.update);

  // Delete a task with id
  router.delete("/:id", task.delete);

  app.use("/api/task", router);
}