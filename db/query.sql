-- SELECT 
-- FROM 
-- JOIN  ON  = ;

-- will start with viewing departments first --
SELECT * from department;
SELECT * from role;
SELECT * from employee;


-- SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department_id, role.salary, employee.manager_id
-- FROM employee
-- INNER JOIN department ON department.department_id = role.department_id 
-- INNER JOIN role ON role.id = employee.role_id;

SELECT employee.id AS id, 
employee.first_name AS first_name, 
employee.last_name AS last_name, 
role.title AS title, 
role.department_id AS department_id , 
role.salary AS salary, employee.manager_id AS manager_id
FROM employee
INNER JOIN role ON role.id = employee.role_id
INNER JOIN department ON department.id = role.department_id; 


-- WHERE employee.id = 1;