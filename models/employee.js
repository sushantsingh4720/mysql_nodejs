import db from "../config/db.js";
const employeeTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employee_details (
      id INT NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      job_title VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    );
  `;

  db.query(createTableQuery, (error, result) => {
    if (error) {
      console.error("Error creating table: ", error);
      return;
    }
    if (result.warningStatus === 0) {
      console.log("Table created successfully!");
    } else {
      console.log("Table already exists");
    }
  });
};
export default employeeTable;
