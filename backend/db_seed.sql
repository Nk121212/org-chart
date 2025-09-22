CREATE DATABASE IF NOT EXISTS orgchart_demo;
USE orgchart_demo;

-- Data untuk org chart
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parentId INT NULL,
  name VARCHAR(100),
  position VARCHAR(100),
  department VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(50)
);

INSERT INTO employees (id, parentId, name, position, department) VALUES
(1, NULL, 'Alice Johnson', 'Chief Executive Officer', 'Management'),
(2, 1, 'Bob Williams', 'Chief Technology Officer', 'Technology'),
(3, 2, 'Charlie Kim', 'Lead Developer', 'Technology'),
(4, 3, 'Dana Lee', 'Frontend Developer', 'Technology'),
(5, 3, 'Evan Smith', 'Backend Developer', 'Technology'),
(6, 1, 'Eva Martinez', 'Chief Financial Officer', 'Finance'),
(7, 1, 'Grace Tan', 'HR Manager', 'Human Resources'),
(8, 7, 'Helen Zhou', 'Recruiter', 'Human Resources');

-- Evaluasi kinerja
CREATE TABLE evaluations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeId INT,
  evaluator VARCHAR(100),
  score INT,
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employeeId) REFERENCES employees(id)
);

-- Pengajuan cuti
CREATE TABLE leaves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeId INT,
  start_date DATE,
  end_date DATE,
  reason TEXT,
  status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employeeId) REFERENCES employees(id)
);
