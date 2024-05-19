const pool = require('../config/db');

exports.followUser = async (req, res) => {
  const { userId } = req.user;
  const { follower_id } = req.body;

  try {
    await pool.query('INSERT INTO Followers (user_id, follower_id) VALUES ($2, $1)', [follower_id, userId]);
    res.status(201).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.profile = async (req, res) => {
  const { userId } = req.user;

  try {
    const result = await pool.query('SELECT id, email, name FROM users where id = $1', [userId]);
    res.status(201).json({ user:result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.queryUser = async (req, res) => {
  const field  = req.query.field;
  const value  = req.query.value;
  if(!['id', 'name', 'email'].includes(field)){
    res.status(400).json({ error: 'bad data', field });
  }  

  try {
    const query = `SELECT id, email, name FROM users WHERE ${field} = $1`;
    
    const result = await pool.query(query, [value]);
    res.status(201).json({ user:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFollowers = async (req, res) => {
  const { userId } = req.user;

  try {
    const result = await pool.query(
      `SELECT u.id, u.name, u.email
       FROM users u
       JOIN Followers f ON f.follower_id = u.id
       WHERE f.follower_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFollowing = async (req, res) => {
  const { userId } = req.user;

  try {
    const result = await pool.query(
      `SELECT u.id, u.name, u.email
       FROM users u
       JOIN Followers f ON f.user_id = u.id
       WHERE f.follower_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};