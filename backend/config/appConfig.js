const connectionString = process.env.DB_URI;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  connectionString,
  jwtSecret,
};
