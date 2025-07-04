const express = require("express");
const router = express.Router();
const FeedbackController = require("../controller/feedbackcontroller");
const ValidateMiddl=require('../middl/validate')

router.get("/test", (req, res) => {
  res.send("Feedback route test");
});

router.post("/add", ValidateMiddl.authMiddleware,FeedbackController.add);

router.get("/all", ValidateMiddl.authMiddleware,FeedbackController.showFeedbacks);

router.get("/get/:id",ValidateMiddl.authMiddleware, FeedbackController.showById);

router.get("/byuser/:userId", ValidateMiddl.authMiddleware,FeedbackController.showByUserId);

router.delete("/delete/:id", ValidateMiddl.authMiddleware,FeedbackController.deleteFeedback);

router.put("/update/:id", ValidateMiddl.authMiddleware,FeedbackController.updateFeedback);

module.exports = router;
