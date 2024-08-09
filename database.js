const oracledb = require('oracledb');

async function oracleConnection(){
  try {
    return await oracledb.getConnection({
      user: '<user>',
      password: '<password>',
      connectString: '<connectString>'
    });
  } catch (err) {
    console.error('Error connecting to Oracle DB:', err);
    throw err;
  }
};

module.exports = oracleConnection;

