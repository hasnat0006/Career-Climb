const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.post("/create-notification", async (req, res) => {
  try {
    const { userId, senderId, jobId, user_type, type, status } = req.body;
    //console.log(req.body);
    let details;
    if (type === "application_status") {
      if (status === "viewed") {
        details = "Your application has been viewed";
      } else if (status === "accepted") {
        details = "Your application has been accepted";
      } else if (status === "rejected") {
        details = "Your application has been rejected";
      }
    } else {
      details = "A new applicant applied for the job";
    }

    if (!userId || !senderId || !jobId || !user_type || !type || !status || !details) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await sql`
      INSERT INTO notification (details, sender_id, user_type, receiver_id, type, status, job_post_id)
      VALUES (${details}, ${userId}, ${user_type}, ${senderId}, ${type}, ${status}, ${jobId}) RETURNING *`;

    console.log(result);

    if (!result || result.length === 0) {
      throw new Error("Error in creating notification");
    }

    res.status(201).json({
      message: "Notification created successfully",
      notification: result[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error during notification creation",
      error: err.message
    });
  }
});

router.get("/notifications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await sql`
      SELECT * FROM notification WHERE receiver_id = ${userId} ORDER BY time DESC
    `;

    res.status(200).json({
      message: "Notifications fetched successfully",
      notifications: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching notifications",
      error: err.message,
    });
  }
});


module.exports = router;
