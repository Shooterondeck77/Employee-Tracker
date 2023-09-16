INSERT INTO department (id, department_name)
VALUES (1, "Management"),
       (2, "Sales"),
       (3, "Mechanic"),
       (4, "Finance"),
       (5, "Legal"),
       (6, "Costumer Service"),
       (7, "Insurance");

-- Role seeds
INSERT INTO roles (department_id, title, salary)
VALUES (1, "CEO", 1000000),
       (2, "Lead Sales", 101000),
       (2, "Salesperson", 70000),
       (3, "Lead Mechanic", 130000),
       (3, "Assitant Mechanic", 100000),
       (4, "Accountant Manager", 110000),
       (4, "Accountant", 90000),
       (5, "Legal Team Lead", 190000),
       (5, "Lawyer", 160000),
       (6, "Lead Costumer Service", 80000),
       (6, "Costumer Service Person", 60000),
       (7, "Insurance Representative", 65000);

-- Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lopez", "Jose", 1, null),
       ("Ronaldo", "Cristiano", 2, 1),
       ("Hardy", "Tom", 3, 2),
       ("Parker", "Peter", 4, 1),
       ("Heart", "Kevin", 5, 3), 
       ("Levine", "Adam", 6, 1),
       ("Lionel", "Messi", 7, 4),
       ("Malik", "Zayn", 8, 1),
       ("Wayne", "Bruce", 9, 5),
       ("Morales", "Miles", 10, 1),
       ("Lopez", "Jennifer", 11, 6),
       ("Craig", "Daniel", 12, 1);