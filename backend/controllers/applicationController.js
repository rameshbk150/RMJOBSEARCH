import db from "../config/db.js";

export const getApplications = async (req, res) => {
  try {
    const [applications] = await db.query(`
      SELECT
        applications.id,
        applications.user_id,
        applications.job_id,
        applications.job_title,
        applications.company,
        applications.status,
        users.name AS candidate_name,
        users.email AS candidate_email
      FROM applications
      INNER JOIN users ON users.id = applications.user_id
      ORDER BY applications.id DESC
    `);

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load applications.",
    });
  }
};

export const checkApplication = async (req, res) => {
  try {
    const { userId, jobId } = req.params;

    const [applications] = await db.query(
      `
      SELECT id
      FROM applications
      WHERE user_id = ? AND job_id = ?
      LIMIT 1
      `,
      [userId, jobId]
    );

    return res.json({
      success: true,
      applied: applications.length > 0,
    });
  } catch (error) {
    console.error("Check application error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to check application status.",
    });
  }
};

export const createApplication = async (req, res) => {
  try {
    const { userId, jobId, jobTitle, company } = req.body;

    if (!userId || !jobId || !jobTitle || !company) {
      return res.status(400).json({
        success: false,
        message: "User, job, title, and company are required.",
      });
    }

    const [users] = await db.query(
      `
      SELECT name, email
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const [existingApplication] = await db.query(
      `
      SELECT id
      FROM applications
      WHERE user_id = ? AND job_id = ?
      LIMIT 1
      `,
      [userId, jobId]
    );

    if (existingApplication.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO applications
        (
          user_id,
          job_id,
          candidate_name,
          candidate_email,
          job_title,
          company,
          status
        )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        jobId,
        users[0].name,
        users[0].email,
        jobTitle,
        company,
        "Pending",
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      applicationId: result.insertId,
    });
  } catch (error) {
    console.error("Create application error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit application.",
    });
  }
};
