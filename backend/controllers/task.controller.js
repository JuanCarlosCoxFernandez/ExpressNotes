const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.task_title || !req.body.task_content) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Task
  const task = {
    task_title: req.body.task_title,
    task_content: req.body.task_content,
    filename: req.file ? req.file.filename : ""
  }

  // Save Task in the database
  Task.create(task).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the task"
    })
  });
};

// Retrieve all Task from the database.
exports.findAll = (req, res) => {
  Task.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Task"
    })
  })
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Task with id=${id} was not found.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id
      });
    });
}

// Update a Task by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;
//   console.log("llegooooooooooooooooooooooooooooooooooooooooooooooooo");
//   const task = {
//     task_title: req.body.task_title,
//     task_content: req.body.task_content,
//     // filename: req.file ? req.file.filename : ""
//   }

//   Task.update(task, {
//     where: {id:id}
//   }).then(num => {
//     if (num == 1) {
//       res.send(num);
//     }else {
//       res.status(404).send({
//         message: 'Cannot update Task with id=${id}'
//       });
//     }
//   })

//   .catch(err => {
//     res.status(500).send({
//       message: "Cannot update Task with id="+id
//     });
//   });

// };

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  console.log("llegooooooooooooooooooooooooooooooooooooooooooooooooo");
  Task.destroy({
    where: { id: id }
  })

    .then(num => {
      if (num == 1) {
        res.send({ message: "Task was deleted" });
      } else {
        res.status(404).send({
          message: 'Cannot delete Task with id=${id}'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Manga with id=" + id
      });
    }); 
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body.task_title);
  

  const task = {
    id: req.body.id,
    task_title: req.body.task_title,
    task_content: req.body.task_content,
    filename: req.file ? req.file.filename : ""
  }

  Task.update(task, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send(num);
      } else {
        res.status(404).send({
          message: `Cannot update Manga with id=${id}. Maybe Manga was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not update Manga with id=" + id
      });
    });
};