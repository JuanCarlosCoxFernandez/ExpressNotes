module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    task_title: {
      type: Sequelize.STRING
    },
    task_content: {
      type: Sequelize.STRING
    },
    // DECOMMENT:
     filename: {
       type: Sequelize.STRING
     }
  });

  return Task;
}