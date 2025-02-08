const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();

router.get("/api/employer", async (req, res) => {
    const  uuid  = req.query.id;

    const  data = await sql`SELECT * FROM employer WHERE employer_id = ${uuid}`;

    console.log(uuid);
    if (data.length === 0) {
        res.status(220).send({ message: "data not found" });
    } else {
        res.json(data);
    }

    
});


router.post("/api/employer2", async (req, res) => { 
    try {
      //const id = req.query.id;
      //if (!id) return res.status(400).json({ error: "Missing employer ID" });
  
      const { name, phone, location, post, bio, id } = req.body;
        console.log(req.body);
      console.log("Employer ID:", id);
      console.log("Updating employer with data:", { name, phone, location, post, bio });
  
      const data = await sql`UPDATE employer SET 
                     full_name = ${name}, 
                     phone_no = ${phone}, 
                     location = ${location}, 
                     role = ${post}, 
                     bio = ${bio} 
                     WHERE employer_id = ${id}`;
  
      if (data.count === 0) {
        return res.status(404).json({ message: "Employer not found or no update made." });
      }
  
      res.status(200).json({ message: "Profile updated successfully!" });
  
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  




module.exports = router;