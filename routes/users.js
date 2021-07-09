/** Routes for users of pg-relationships-demo. */

const db = require("../db");
const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();


/** Get users: [user, user, user] */

router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(
          `SELECT id, name, type FROM users`);

    return res.json(results.rows);
  }

  catch (err) {
    return next(err);
  }
});

/** Get user: {name, type, messages: [{msg, msg}]} */
router.get("/:id", async(req, res, next)=>{
  try {
    const userResult = await db.query(`SELECT name, type 
    FROM users WHERE id = $1`, [req.params.id]);
    const messageResult = await db.query(`SELECT id, msg
    FROM messages WHERE user_id = $1`,[req.params.id]);
    if (results.rows.length==0){
      throw new ExpressError("User not found", 404);
    }
    const user = userResult.rows[0];
    user.messages = messageResult.rows;
    return res.json({user: user})
  } catch (err) {
    return next(err);
  }
})


module.exports = router;