use company_db;

INSERT INTO department (name)
VALUES ("Engineering"),
       ("HR"),
       ("Finance"),
       ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 75000, 3),
       ("developer", 90000, 4),
       ("director", 60000, 2),
       ("admin", 52000, 1);
        


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("tom", "johnson", 4, 24),
       ("sarah", "james", 3, 12),
       ("eric", "young", 1, 8),
       ("nick", "wilson", 2, 13);