const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();



router.post("/application/accept", async (req, res) => {
    const { application } = req.body;
    try {
        const result = await sql`
            UPDATE application
            SET status = 'Accepted'
            WHERE application_id = ${application.application_id}
        `;
        res.status(200).json({
            message: "Application accepted successfully"
        });   
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error accepting application",
            error: err.message
        });
    }
});

router.post("/application/reject", async (req, res) => {
    const { application } = req.body;
    try {
        const result = await sql`
            UPDATE application
            SET status = 'Rejected'
            WHERE application_id = ${application.application_id}
        `;
        res.status(200).json({
            message: "Application rejected successfully"
        });   
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error rejecting application",
            error: err.message
        });
    }
});

router.post("/application/viewed", async (req, res) => {
    const { application } = req.body;
    try {
        const result = await sql`
            UPDATE application
            SET status = 'Viewed'
            WHERE application_id = ${application.application_id}
        `;
        res.status(200).json({
            message: "Application rejected successfully"
        });   
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error rejecting application",
            error: err.message
        });
    }
});

router.get("/applications/:userID", async (req, res) => {
    const { userID } = req.params;
    try {
        const result = await sql`
            SELECT application_id, status ,application_date,job_post.company_name,role,phone_no,email
            from application,job_post,user_info,employer
            WHERE
            application.employee_id = ${userID}
            AND
            application.job_post_id = job_post.post_id
            AND
            job_post.employer_id = employer.employer_id
            AND 
            employer.employer_id = user_info.user_id;
        `
        const formattedResult = result.map((app, index) => ({
            application_id: `#APL-${index + 1}`,
            status: app.status,
            company_name: app.company_name,
            role: app.role,
            application_date: new Date(app.application_date).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }),
            phone: app.phone_no,
            email: app.email
        }));        
      res.status(200).json(formattedResult);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching applications",
            error: err.message
        });
    }
});


module.exports = router;