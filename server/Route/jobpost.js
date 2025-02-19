const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.post("/jobpost", async (req, res) => {
  const {
    useruuid,
    jobRole,
    salary,
    jobType,
    workingHours,
    jobDescription,
    location,
    requiredskills,
  } = req.body;
  // console.log(req.body);
  const postid = uuidv4();
  const companyname = "Google";
  console.log({
    postid,
    useruuid,
    jobRole,
    salary,
    jobDescription,
    location,
    requiredskills,
    jobType,
    workingHours,
    companyname,
  });
  result =
    await sql` INSERT INTO job_post (post_id, employer_id, role, salary, description, location, post_date, job_type, working_hours, company_name, required_skill) VALUES (${postid}, ${useruuid}, 
${jobRole}, ${salary}, ${jobDescription}, ${location},  NOW(), ${jobType}, ${workingHours}, ${companyname}, ${requiredskills})`;
  if (!result) {
    console.log("Error inserting in the table");
  } else {
    console.log("Successful");
  }
});

router.get("/skills", async (req, res) => {
  try {
    const response = await sql`SELECT skill_id, name FROM required_skill`;
    res.json(response);
  } catch (error) {
    console.error("Error fetching skills", error);
  }
});
router.get("/getjobposts", async (req, res) => {
  try {
    const { uuid } = req.query;
    const response =
      await sql`SELECT post_id, company_name, role, salary, post_date, description, job_type, working_hours, location from job_post where employer_id = ${uuid}`;
    console.log("Jobposts: ", response);
    res.json(response);
  } catch (err) {
    console.error("Error fetching the jobs", err);
  }
});
router.delete("/deletejobpost/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const response = await sql`DELETE from job_post where post_id = ${post_id}`;
    res.status(200).json({ message: "Job post deleted successfully" });
  } catch (err) {
    console.error("Failed deleting job post", err);
  }
});
router.put("/updatejobpost/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    console.log(post_id);
    const {
      jobRole,
      salary,
      jobType,
      workingHours,
      jobDescription,
      location,
      requiredskills,
    } = req.body;
    const response = await sql`UPDATE job_post
    SET role = ${jobRole}, salary = ${salary}, job_type = ${jobType}, working_hours = ${workingHours}, 
    description = ${jobDescription}, location = ${location}, required_skill = ${requiredskills} where post_id = ${post_id}`;
    res.status(200).json({ message: "Job post updated successfully" });
  } catch (err) {
    console.error("Failed updating job post", err);
  }
});
router.get("/getalljobs", async (req, res) => {
  try {
    const response = await sql`
  SELECT  
    jp.post_id, 
    jp.post_date, 
    jp.role, 
    jp.salary, 
    jp.description, 
    jp.location, 
    jp.company_name, 
    e.company_logo,  -- ✅ Fetch company_logo from employer table
    COALESCE(ARRAY_AGG(rs.name), '{}') AS skill_names  -- ✅ Prevents NULL for jobs with no skills
FROM job_post jp
LEFT JOIN employer e 
    ON e.employer_id = jp.employer_id  -- ✅ Join employer table to get company logo
LEFT JOIN required_skill rs 
    ON rs.skill_id = ANY(jp.required_skill)  -- ✅ Keeps job posts even if no matching skills exist
GROUP BY jp.post_id, e.company_logo;

`;
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error("Failed fetching jobs", err);
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: err.message });
  }
});
router.get("/checkcv/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    const response =
      await sql`SELECT cv from employee where employee_id = ${useruuid}`;
    res.json(response);
  } catch (err) {
    console.error("Error fetching cv", err);
  }
});
router.post("/uploadinfoforjob", async (req, res) => {
  try {
    const { post_id, useruuid } = req.body;
    console.log(req.body);
    const app_id = uuidv4();
    const response =
      await sql`INSERT into application (application_id, application_date, employee_id, job_post_id) 
      VALUES (${app_id}, NOW(), ${useruuid}, ${post_id})`;

    if (!response) {
      res.status(500).json({ message: "Error applying" });
    } else {
      res.status(200).json({ message: "Applied successfully" });
    }
  } catch (err) {
    console.error("Error applying", err);
  }
});
router.get("/checkapplication/:useruuid/:post_id", async (req, res) => {
  try {
    const { useruuid, post_id } = req.params;

    const existingApplication = await sql`
      SELECT COUNT(*) AS count FROM application 
      WHERE employee_id = ${useruuid} AND job_post_id = ${post_id}
    `;

    if (existingApplication[0].count > 0) {
      return res.json({ alreadyApplied: true });
    } else {
      return res.json({ alreadyApplied: false });
    }
  } catch (err) {
    console.error("Error checking application:", err);
    res.status(500).json({ error: "Failed to check application" });
  }
});


router.get("/notificationforapplication", async (req, res) => {
      try {
        const { userID,job_id } = req.query;
        // console.log(req.query);
        const response = await sql `
        SELECT jp.employer_id, jp.role, a.status, ui.name
        FROM application a
        JOIN job_post jp ON a.job_post_id = jp.post_id
        JOIN user_info ui ON a.employee_id = ui.user_id
        WHERE a.employee_id = ${userID}
        AND a.job_post_id = ${job_id};
        `
        res.json(response[0]);
      }
      catch (err) {
        console.error("Error fetching notification", err);
      }
});

module.exports = router;
