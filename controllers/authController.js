const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { generateToken } = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await User.create({ email, password, firstName, lastName });
    const token = generateToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
