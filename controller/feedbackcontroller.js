const Feedback = require("../model/feedback");

async function add(req, res) {
  try {
    console.log(req.body);
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(200).json(feedback);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding feedback");
  }
}

async function showFeedbacks(req, res) {
  try {
    const feedbacks = await Feedback.find().populate("user");
    res.status(200).json(feedbacks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching feedbacks");
  }
}

async function showById(req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id).populate("user");
    res.status(200).json(feedback);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching feedback by ID");
  }
}

async function showByUserId(req, res) {
  try {
    const feedbacks = await Feedback.find({ user: req.params.userId });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching feedbacks by user");
  }
}

async function deleteFeedback(req, res) {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).send("Feedback deleted!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting feedback");
  }
}

async function updateFeedback(req, res) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(feedback);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating feedback");
  }
}

module.exports = {
  add,
  showFeedbacks,
  showById,
  showByUserId,
  deleteFeedback,
  updateFeedback,
};
