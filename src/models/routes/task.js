const express = require("express");

const checkListDependetRouter = express.Router();
const simpleRouter = express.Router();

const Checklist = require("../../models/checklist");
const Task = require("../../models/task");

checkListDependetRouter.get("/:id/tasks/task_new", async (req, res) => {
  try {
    let task = Task();
    res
      .status(200)
      .render("tasks/task_new", { checklistId: req.params.id, task: task });
  } catch (error) {
    res.status(422).render("pages/error");
  }
});

checkListDependetRouter.post("/:id/tasks", async (req, res) => {
  let { name } = req.body.task;
  let task = new Task({ name, checklist: req.params.id });

  try {
    await task.save();
    let checklist = await Checklist.findById(req.params.id);
    checklist.tasks.push(task);
    await checklist.save();
    res.redirect(`/checklists/${req.params.id}`);
  } catch (error) {
    let errors = error.errors;
    res.status(422).render("tasks/task_new", {
      task: { ...task, errors },
      checklistId: req.params.id,
    });
  }
});

simpleRouter.delete("/:id", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);
    let checklist = await Checklist.findById(task.checklist);
    let taskToDelete = checklist.tasks.indexOf(task._id);
    checklist.tasks.slice(taskToDelete, 1);
    checklist.save();
    res.redirect(`/checklists/${checklist._id}`);
  } catch (error) {
    res.status(422).render("pages/error", { errors: "Erro ao deletar tarefa" });
  }
});

simpleRouter.put("/:id", async (req, res) => {
  let task = await Task.findById(req.params.id);
  try {
    task.set(req.body.task);
    await task.save();
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    let errors = error.errors;
    res.status(422).json({ task: { ...errors } });
  }
});

module.exports = {
  checklistDependent: checkListDependetRouter,
  simple: simpleRouter,
};
