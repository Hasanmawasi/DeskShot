import mysql from 'mysql2';


const connection = mysql.createConnection({
  host: 'localhost',    
  user: 'root',
  password: '',
  database: 'diskshotdb'
});


connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

export default connection;
