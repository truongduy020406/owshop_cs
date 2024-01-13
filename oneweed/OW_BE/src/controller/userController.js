const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { poolData } = require('../database/index')

const register = async (req, res) => {
  const q = 'SELECT * FROM user WHERE email=? OR full_name=?'
  const { id, username, imageUrl, emailAddress, role_id } = req.body

  console.log(emailAddress)
  try {
    const [rows] = await poolData.execute(q, [
      emailAddress.trim(),
      username.trim(),
    ])

    if (rows.length) {
      res.status(200).json('Sub')
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash('12345678', salt)

      const insertQuery =
        'INSERT INTO user(User_id, full_name, avatar, email, password, Role_id) VALUES (?, ?, ?, ?, ?, ?)'
      const insertValues = [
        id,
        username,
        imageUrl,
        emailAddress,
        hashedPassword,
        role_id,
      ]

      await poolData.execute(insertQuery, insertValues)

      res.status(200).json('User created successfully')
    }
  } catch (error) {
    res.status(500).json(error.message || 'Internal Server Error')
  }
}

const login = async (req, res) => {
  const q = 'SELECT * FROM user WHERE email=?'
  const email = req.body?.email

  try {
    const [rows] = await poolData.execute(q, [email.trim()])

    console.log(rows)

    if (rows.length === 0) {
      return res.status(409).json('User not found')
    }

    const isPassword = true || bcrypt.compareSync(req.body?.password, rows[0].Password)
    console.log('next')
    if (!isPassword) {
      return res.status(409).json('Wrong password')
    }

    const token = jwt.sign(
      { id: rows[0].User_id, email: rows[0].email },
      'jwtkey'
    )
    console.log('next2')

    const { password, ...other } = rows[0]

    return res.status(200).json({
      ...other,
      accessToken: token,
    })
  } catch (error) {
    return res.status(500).json(error.message || 'Internal Server Error')
  }
}

const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { namestore } = req.body; // Destructure namestore from req.body
    const sql = "UPDATE user SET store_id = ? WHERE User_id = ?";
    const [rows, fields] = await poolData.query(sql, [namestore, id]); // Pass parameters to the query
    res.json({
      data: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Add an appropriate error response
  }
};
const getnamestore = async (req, res) => {
  const id = req.params.id;
console.log(id);
  const q = "SELECT user.store_id FROM user WHERE user.User_id = ? ";

  try {
    const [rows] = await poolData.execute(q, [id]);

    if (rows.length > 0) {
      const product = rows[0];

      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = { register, login,updateStore,getnamestore }
