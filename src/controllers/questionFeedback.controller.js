const questionFeedbackService = require("../services/questionFeedback.service");

exports.createFeedback = async (req, res) => {
  try {
    const { question, isClear, comment } = req.body;

    const feedback = await questionFeedbackService.createFeedback({
      question,
      user: req.user._id,
      isClear,
      comment,
      user: req.user.id,
    });

    res.status(201).json({ message: "Feedback creado", feedback });
  } catch (error) {
    console.error("Error creando feedback:", error);
    res.status(500).json({ message: "Error creando feedback" });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await questionFeedbackService.getAllFeedbacks();

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error obteniendo feedbacks:", error);
    res.status(500).json({ message: "Error obteniendo feedbacks" });
  }
};
