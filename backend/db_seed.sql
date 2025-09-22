CREATE DATABASE IF NOT EXISTS orgchart_demo;
USE orgchart_demo;

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parentId INT NULL,
  name VARCHAR(100),
  position VARCHAR(100),
  department VARCHAR(100)
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
