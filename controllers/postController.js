const pool = require('../config/db');

exports.createPost = async (req, res) => {
  const { userId } = req.user;
  const { type, mediaUrl, mediaText, commentsEnabled } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Post (created_by, type, media_url, media_text, total_likes, comments_enabled) VALUES ($1, $2, $3, $4, 0, $5) RETURNING id',
      [userId, type, mediaUrl, mediaText, commentsEnabled]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.likePost = async (req, res) => {
  const {userId} = req.user; 
  const {postId} = req.body;

  try {
    const query = `
      INSERT INTO likes (post_id, user_id, is_liked)
      VALUES ($1, $2, NOT COALESCE((
        SELECT is_liked
        FROM likes
        WHERE post_id = $1 AND user_id = $2
      ), FALSE))
      ON CONFLICT (post_id, user_id) DO UPDATE SET is_liked = EXCLUDED.is_liked
      RETURNING is_liked;
    `;
    const result = await pool.query(query, [postId, userId]);
    const isLiked = result.rows[0].is_liked;

    res.json({ isLiked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.commentOnPost = async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    await pool.query('INSERT INTO Comments (post_id, user_id, comment) VALUES ($1, $2, $3)', [postId, userId, comment]);
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getPost = async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
      p.id AS post_id,
      p.media_text AS post_text,
      p.media_url AS post_asset,
      p.type AS post_type,
      p.total_likes AS likes,

      l.user_id AS like_user_id,
      c.id AS comment_id,
      c.user_id AS comment_user_id,
      c.comment AS comment_content
  FROM 
      post p
  LEFT JOIN 
      likes l ON p.id = l.post_id
  LEFT JOIN 
      comments c ON p.id = c.post_id
  WHERE
p.id=$1
`,
      [postId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

