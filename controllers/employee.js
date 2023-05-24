import employeeTable from "../models/employee.js";
import db from "../config/db.js";

const newEmployee = (req, res) => {
  try {
    employeeTable();
    const { id, full_name, phone_number, job_title } = req.body;

    const insertQuery = `
    INSERT INTO employee_details (id, full_name, phone_number, job_title)
    VALUES (?, ?, ?, ?);
  `;

    db.query(
      insertQuery,
      [id, full_name, phone_number, job_title],
      (error, results) => {
        if (error) {
          console.log(error);
          console.error("Error inserting new employee: ", error);
          return res
            .status(500)
            .json({ error: "Failed to insert new employee." });
        }
        console.log(results);
        return res
          .status(200)
          .json({ message: "New employee added successfully." });
      }
    );
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
    console.log(error);
  }
};
const getEmployee = (req, res) => {
  try {
    const employeeId = req.params.id;

    const selectQuery = `
      SELECT * FROM employee_details WHERE id = ?;
    `;

    db.query(selectQuery, [employeeId], (error, results) => {
      if (error) {
        console.error("Error retrieving employee details: ", error);
        return res
          .status(500)
          .json({ error: "Failed to retrieve employee details." });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Employee not found." });
      }

      const employee = results[0];
      return res.status(200).json({ employee });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
const updateEmployee = (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedFields = req.body;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    let updateQuery = "UPDATE employee_details SET ";
    const updateValues = [];

    for (const field in updatedFields) {
      updateQuery += `${field} = ?, `;
      updateValues.push(updatedFields[field]);
    }

    // Remove the trailing comma and space
    updateQuery = updateQuery.slice(0, -2);

    updateQuery += " WHERE id = ?";
    updateValues.push(employeeId);

    db.query(updateQuery, updateValues, (error, results) => {
      if (error) {
        console.error("Error updating employee details: ", error);
        return res
          .status(500)
          .json({ error: "Failed to update employee details." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found." });
      }

      return res
        .status(200)
        .json({ message: "Employee details updated successfully." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server Error" });
  }
};
const deleteEmployee = (req, res) => {
  try {
    const employeeId = req.params.id;

    const deleteQuery = `
      DELETE FROM employee_details WHERE id = ?;
    `;

    db.query(deleteQuery, [employeeId], (error, results) => {
      if (error) {
        console.error("Error deleting employee: ", error);
        return res.status(500).json({ error: "Failed to delete employee." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found." });
      }

      return res
        .status(200)
        .json({ message: "Employee deleted successfully." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server Error" });
  }
};
const listOfEmployee = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of records per page
    const offset = (page - 1) * limit; // Offset calculation

    const countQuery = `SELECT COUNT(*) as total FROM employee_details`;

    db.query(countQuery, (error, countResults) => {
      if (error) {
        console.error("Error retrieving employee count: ", error);
        return res
          .status(500)
          .json({ error: "Failed to retrieve employee count." });
      }

      const total = countResults[0].total; // Total number of employees

      const selectQuery = `
      SELECT * FROM employee_details
      LIMIT ? OFFSET ?;
    `;

      db.query(selectQuery, [limit, offset], (error, results) => {
        if (error) {
          console.error("Error retrieving employees: ", error);
          return res
            .status(500)
            .json({ error: "Failed to retrieve employees." });
        }

        return res.status(200).json({
          total,
          page,
          limit,
          data: results,
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server Error" });
  }
};
export {
  newEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  listOfEmployee,
};
