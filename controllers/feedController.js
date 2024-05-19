const pool = require('../config/db');

exports.getFeed = async (req, res) => {
  const { userId } = req.user;

  try {
    const result = await pool.query(
      `SELECT p.id,
      p.created_by,
      p.type,
      p.media_url,
      p.media_text,
      p.total_likes,
      p.comments_enabled,
      (
        SELECT COALESCE(json_agg(json_build_object(
          'comment', c.comment,
          'user', json_build_object(
            'id', u.id,
            'name', u.name,
            'email', u.email
          )
        )), '[]'::json)
        FROM Comments c
        JOIN "users" u ON c.user_id = u.id
        WHERE c.post_id = p.id
      ) AS comments
FROM Post p
JOIN "users" u ON p.created_by = u.id
JOIN Followers f ON p.created_by = f.user_id
WHERE f.follower_id = $1 OR p.created_by = $1
ORDER BY p.id DESC;`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};