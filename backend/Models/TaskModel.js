const { Schema, model} = require("mongoose");

const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
    
  },
  isDone: {
    type: Boolean,
    required: true,
  },
});

const TaskModel = model("Tasks", TaskSchema);

module.exports = TaskModel;