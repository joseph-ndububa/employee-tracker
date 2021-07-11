DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9, 2) NOT NULL,
  dept_id INTEGER,
  CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (dept_name) VALUES ('sales');
INSERT INTO department (dept_name) VALUES ('marketing');
INSERT INTO department (dept_name) VALUES ('it');
INSERT INTO department (dept_name) VALUES ('finance');
INSERT INTO department (dept_name) VALUES ('hr');

INSERT INTO role (title, salary) VALUES ('salesman', 70000.00);
INSERT INTO role (title, salary) VALUES ('tech support', 70000.00);
INSERT INTO role (title, salary) VALUES ('manager', 70000.00);
INSERT INTO role (title, salary) VALUES ('accounting clerk', 70000.00);
INSERT INTO role (title, salary) VALUES ('payroll admin', 70000.00);

INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
INSERT INTO employee (first_name, last_name) VALUES ('jon', 'jones');
