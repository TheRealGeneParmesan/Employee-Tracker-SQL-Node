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
VALUES (1, "Kendrick", "Lamar", 1),
       (2, "Biggie", "Smalls", 2),
       (3, "Steve", "Buschemi", 3),
       (4, "John", "Doe", 4),
       (5, "John", "Cena", 5);



