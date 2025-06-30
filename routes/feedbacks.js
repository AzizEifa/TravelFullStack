const express = require("express");
const router = express.Router();
const FeedbackController = require("../controller/feedbackcontroller");

router.get("/test", (req, res) => {
  res.send("Feedback route test");
});

router.post("/add", FeedbackController.add);

router.get("/all", FeedbackController.showFeedbacks);

router.get("/get/:id", FeedbackController.showById);

router.get("/byuser/:userId", FeedbackController.showByUserId);

router.delete("/delete/:id", FeedbackController.deleteFeedback);

router.put("/update/:id", FeedbackController.updateFeedback);

module.exports = router;
