const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.get("/getnotifications/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    //console.log(useruuid);
    const response =
      await sql`SELECT details from notification where receiver_id = ${useruuid}`;
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error("Failed getting notifications", err);
  }
});
router.get("/getsavedroles/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    console.log(useruuid);
    const response =
      await sql`SELECT r.name, r.category, r.description FROM role r, saved_role sr 
      where 
      sr.employee_id = ${useruuid} 
      and 
      r.role_id = sr.role_id`;
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error("Failed in getting saved roles", err);
  }
});
router.get("/getjobs/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    console.log(useruuid);
    const response = await sql`SELECT 
  j.role, 
  j.salary, 
  j.description, 
  j.location, 
  j.post_date,
  j.job_type, 
  j.company_name
FROM 
  job_post j
JOIN 
  required_skill s ON s.skill_id = ANY(j.required_skill)  -- Match required skills for job post
JOIN 
  employee e ON e.employee_id = ${useruuid}  -- Match the employee based on their ID
WHERE 
  s.name = ANY(e.skills)  -- Match employee's skills with required skills for job posts
 
      `;
    console.log("JObs fetched", response);
    res.json(response);
  } catch (err) {
    console.error("Failed in getting jobs", err);
  }
});
router.get("/getmonthlyjob/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    console.log("Received useruuid:", useruuid);

    const response = await sql`
      SELECT 
        EXTRACT(MONTH FROM application_date) AS month,
        EXTRACT(YEAR FROM application_date) AS year,
        COUNT(*) AS total_jobs
      FROM application
      WHERE employee_id = ${useruuid}
      GROUP BY year, month
      ORDER BY year, month;
    `;

    console.log("Monthly job data:", response);
    res.json(response);
  } catch (err) {
    console.error("Failed in getting jobs", err);
    res.status(500).json({ error: "Database query failed" });
  }
});
router.get("/getmonthlyaccepted/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    console.log("Received useruuid:", useruuid);

    const response = await sql`
      SELECT 
        EXTRACT(MONTH FROM application_date) AS month,
        EXTRACT(YEAR FROM application_date) AS year,
        COUNT(*) AS total_accepted
      FROM application
      WHERE employee_id = ${useruuid} AND 
      status = 'Accepted'
      GROUP BY year, month
      ORDER BY year, month;
    `;

    console.log("Monthly accepted:", response);
    res.json(response);
  } catch (err) {
    console.error("Failed in getting jobs", err);
    res.status(500).json({ error: "Database query failed" });
  }
});
router.get("/getmonthlyrejected/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    console.log("Received useruuid:", useruuid);

    const response = await sql`
      SELECT 
        EXTRACT(MONTH FROM application_date) AS month,
        EXTRACT(YEAR FROM application_date) AS year,
        COUNT(*) AS total_rejected
      FROM application
      WHERE employee_id = ${useruuid} AND 
      status = 'Rejected'
      GROUP BY year, month
      ORDER BY year, month;
    `;

    console.log("Monthly rejected:", response);
    res.json(response);
  } catch (err) {
    console.error("Failed in getting rejected", err);
    res.status(500).json({ error: "Database query failed" });
  }
});
module.exports = router;
