INSERT INTO departments (department_name)
VALUES ('Sales'),
       ('Marketing'),
       ('Accounting'),
       ('Eating'),
       ('Tasting');

INSERT INTO roles (title, salary, department_id)
VALUES ('BananaSales', 60000, 1),
       ('OrangeMarketer', 50000, 2),
       ('BlueberryEater', 75000, 4),
       ('ChocolateInvestigator', 130000, 3),
       ('CerealKiller', 82000, 5);


INSERT INTO employees (role_id, first_name, last_name, manager_id)
VALUES (1, 'Kendrick', 'Lamar', 5),
       (2, 'Biggie', 'Smalls', 4),
       (3, 'Steve', 'Buschemi', 3),
       (4, 'John', 'Doe', 2),
       (5, 'John', 'Cena', 1);

