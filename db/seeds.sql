INSERT INTO departments (dep_name)
VALUES ("sales"),
       ("marketing"),
       ("accounting"),
       ("eating"),
       ("tasting");

INSERT INTO roles (title, salary, department_id)
VALUES ("BananaSales", 60000, 1),
       ("OrangeMarketer", 50000, 2),
       ("BlueberryEater", 75000, 3),
       ("ChocolateInvestigator", 130000, 4),
       ("CerealKiller", 82000, 5);


INSERT INTO employees (role_id, first_name, last_name, manager_id)
VALUES (1, "Malia", "Brown", 1),
       (2, "Sara", "Lourd", 2),
       (3, "Tom", "Allen", 3),
       (4, "Sam", "Kash", 4),
       (5, "John", "Doe", 5);



