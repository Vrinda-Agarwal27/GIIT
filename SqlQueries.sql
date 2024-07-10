create database GIIT;
CREATE TABLE GIIT.employee (
                          employee_id INT PRIMARY KEY,
                          first_name VARCHAR(50) NOT NULL,
                          last_name VARCHAR(50) NOT NULL,
                          date_of_birth DATE,
                          gender CHAR(1),
                          email VARCHAR(100) UNIQUE,
                          phone_number VARCHAR(20),
                          hire_date DATE,
                          job_title VARCHAR(100),
                          department VARCHAR(50),
                          salary DECIMAL(10, 2),
                          is_active BOOLEAN DEFAULT true,
                          manager_id INT,
                          work_location VARCHAR(100),
                          notes TEXT
);
DELIMITER //

CREATE PROCEDURE insert_single_employee()
BEGIN
    DECLARE v_first_name VARCHAR(50);
    DECLARE v_last_name VARCHAR(50);
    DECLARE v_department VARCHAR(50);
    DECLARE v_location VARCHAR(100);
    DECLARE v_email VARCHAR(100);

    SET v_first_name = ELT(1 + FLOOR(RAND() * 5), 'John', 'Jane', 'Mike', 'Emily', 'David');
    SET v_last_name = ELT(1 + FLOOR(RAND() * 5), 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones');
    SET v_department = ELT(1 + FLOOR(RAND() * 5), 'HR', 'IT', 'Finance', 'Marketing', 'Sales');
    SET v_location = ELT(1 + FLOOR(RAND() * 5), 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix');

    -- Generate a unique email by adding a random number
    SET v_email = CONCAT(LOWER(v_first_name), '.', LOWER(v_last_name), FLOOR(RAND() * 10000), '@example.com');

    INSERT INTO GIIT.employee (
        employee_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone_number,
        hire_date,
        job_title,
        department,
        salary,
        is_active,
        manager_id,
        work_location,
        notes
    ) VALUES (
                 (SELECT COALESCE(MAX(employee_id), 0) + 1 FROM employee e),
                 v_first_name,
                 v_last_name,
                 DATE_SUB(CURDATE(), INTERVAL 18 + FLOOR(RAND() * 47) YEAR),
                 IF(RAND() > 0.5, 'M', 'F'),
                 v_email,
                 CONCAT('(', LPAD(FLOOR(RAND() * 999), 3, '0'), ') ', LPAD(FLOOR(RAND() * 999), 3, '0'), '-', LPAD(FLOOR(RAND() * 9999), 4, '0')),
                 DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 3650) DAY),
                 ELT(1 + FLOOR(RAND() * 5), 'Manager', 'Developer', 'Analyst', 'Designer', 'Coordinator'),
                 v_department,
                 ROUND(RAND() * 100000 + 30000, 2),
                 TRUE,
                 1 + FLOOR(RAND() * 10),
                 v_location,
                 'Employee note'
             );
END //

DELIMITER ;
DELIMITER //

CREATE PROCEDURE insert_multiple_employees(IN num_employees INT)
BEGIN
    DECLARE i INT DEFAULT 0;

    WHILE i < num_employees DO
            CALL insert_single_employee();
            SET i = i + 1;
        END WHILE;
END //

DELIMITER ;
CALL insert_multiple_employees(1000);
DELIMITER //

CREATE PROCEDURE insert_single_employee()
BEGIN
    DECLARE v_first_name VARCHAR(50);
    DECLARE v_last_name VARCHAR(50);
    DECLARE v_department VARCHAR(50);
    DECLARE v_location VARCHAR(100);
    DECLARE v_email VARCHAR(100);
    DECLARE email_exists INT DEFAULT 1;

    SET v_first_name = ELT(1 + FLOOR(RAND() * 5), 'John', 'Jane', 'Mike', 'Emily', 'David');
    SET v_last_name = ELT(1 + FLOOR(RAND() * 5), 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones');
    SET v_department = ELT(1 + FLOOR(RAND() * 5), 'HR', 'IT', 'Finance', 'Marketing', 'Sales');
    SET v_location = ELT(1 + FLOOR(RAND() * 5), 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix');

    -- Generate a unique email by adding a random number
    WHILE email_exists = 1 DO
        SET v_email = CONCAT(LOWER(v_first_name), '.', LOWER(v_last_name), FLOOR(RAND() * 10000), '@example.com');
        SELECT COUNT(*) INTO email_exists FROM employee WHERE email = v_email;
    END WHILE;

    INSERT INTO employee (
        employee_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone_number,
        hire_date,
        job_title,
        department,
        salary,
        is_active,
        manager_id,
        work_location,
        notes
    ) VALUES (
        (SELECT COALESCE(MAX(employee_id), 0) + 1 FROM employee e),
        v_first_name,
        v_last_name,
        DATE_SUB(CURDATE(), INTERVAL 18 + FLOOR(RAND() * 47) YEAR),
        IF(RAND() > 0.5, 'M', 'F'),
        v_email,
        CONCAT('(', LPAD(FLOOR(RAND() * 1000), 3, '0'), ') ', LPAD(FLOOR(RAND() * 1000), 3, '0'), '-', LPAD(FLOOR(RAND() * 10000), 4, '0')),
        DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 3650) DAY),
        ELT(1 + FLOOR(RAND() * 5), 'Manager', 'Developer', 'Analyst', 'Designer', 'Coordinator'),
        v_department,
        ROUND(RAND() * 100000 + 30000, 2),
        TRUE,
        1 + FLOOR(RAND() * 10),
        v_location,
        'Employee note'
    );
END //

DELIMITER ;
DROP PROCEDURE IF EXISTS insert_single_employee;
DELIMITER //

CREATE PROCEDURE insert_single_employee()
BEGIN
    DECLARE v_first_name VARCHAR(50);
    DECLARE v_last_name VARCHAR(50);
    DECLARE v_department VARCHAR(50);
    DECLARE v_location VARCHAR(100);
    DECLARE v_email VARCHAR(100);
    DECLARE email_exists INT DEFAULT 1;

    SET v_first_name = ELT(1 + FLOOR(RAND() * 5), 'John', 'Jane', 'Mike', 'Emily', 'David');
    SET v_last_name = ELT(1 + FLOOR(RAND() * 5), 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones');
    SET v_department = ELT(1 + FLOOR(RAND() * 5), 'HR', 'IT', 'Finance', 'Marketing', 'Sales');
    SET v_location = ELT(1 + FLOOR(RAND() * 5), 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix');

    -- Generate a unique email by adding a random number
    WHILE email_exists = 1 DO
        SET v_email = CONCAT(LOWER(v_first_name), '.', LOWER(v_last_name), FLOOR(RAND() * 10000), '@example.com');
        SELECT COUNT(*) INTO email_exists FROM employee WHERE email = v_email;
    END WHILE;

    INSERT INTO employee (
        employee_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone_number,
        hire_date,
        job_title,
        department,
        salary,
        is_active,
        manager_id,
        work_location,
        notes
    ) VALUES (
        (SELECT COALESCE(MAX(employee_id), 0) + 1 FROM employee e),
        v_first_name,
        v_last_name,
        DATE_SUB(CURDATE(), INTERVAL 18 + FLOOR(RAND() * 47) YEAR),
        IF(RAND() > 0.5, 'M', 'F'),
        v_email,
        CONCAT('(', LPAD(FLOOR(RAND() * 1000), 3, '0'), ') ', LPAD(FLOOR(RAND() * 1000), 3, '0'), '-', LPAD(FLOOR(RAND() * 10000), 4, '0')),
        DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 3650) DAY),
        ELT(1 + FLOOR(RAND() * 5), 'Manager', 'Developer', 'Analyst', 'Designer', 'Coordinator'),
        v_department,
        ROUND(RAND() * 100000 + 30000, 2),
        TRUE,
        1 + FLOOR(RAND() * 10),
        v_location,
        'Employee note'
    );
END //

DELIMITER ;
DELIMITER //

CREATE PROCEDURE insert_multiple_employees(IN num_employees INT)
BEGIN
    DECLARE i INT DEFAULT 0;

    WHILE i < num_employees DO
            CALL insert_single_employee();
            SET i = i + 1;
        END WHILE;
END //

DELIMITER ;
CALL insert_multiple_employees(1000);

select * from employee;
select first_name,last_name from employee;
select distinct department from employee; 
select count(*) as count from employee; 
select max(salary) as max_salary from employee;
select avg(age) as AVG_AGE from employee;
describe employee;
SELECT AVG(DATEDIFF(CURDATE(), date_of_birth) / 365) AS average_age FROM employee;
select * from employee where first_name='John';
select * from employee where year(hire_date)=2023;
select department, count(*) from employee group by department;
select * from employee order by salary desc;
select * from employee order by salary desc limit 5;
select sum(salary) as total_salary from employee;
select * from employee where last_name like 'S%';
select gender,count(*) from employee group by gender;
select * from employee where salary>75000;
select max(datediff(curdate(),hire_date)) from employee;
SELECT employee_id,first_name,last_name,hire_date,DATEDIFF(CURDATE(), hire_date) AS tenure_days FROM employee ORDER BY tenure_days DESC LIMIT 1;
select department,avg(salary) as AVG_SALARY from employee group by department;
select * from employee where datediff(curdate(),date_of_birth)>40;
SELECT 
    employee_id,
    first_name,
    last_name,
    date_of_birth,
    TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age
FROM 
    employee
WHERE 
    TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) > 40;
SELECT * FROM employee WHERE hire_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND hire_date <= CURDATE();
select department,avg_salary from (select department,avg(salary) as avg_salary from employee group by department) as dept_avg group by department order by avg_salary desc limit 1; 
update employee set salary=120000 where employee_id=27;
delete from employee where is_active=false and employee_id>0;
select * from employee where manager_id is null;
select employee_id,first_name,last_name,salary,department from employee where (department,salary) in (select department,max(salary) from employee group by department); 
select * from employee where last_name in (select last_name from employee group by last_name) order by last_name,first_name asc;
SELECT MAX(salary) AS second_highest_salary FROM employee WHERE salary < (SELECT MAX(salary) FROM employee);
describe employee;
select e.employee_id,e.first_name,e.last_name,e.salary,e.department,(select first_name from employee where employee_id=e.manager_id) as manager_fname,(select last_name from employee where employee_id=e.manager_id) as manager_lname from employee e;
select department,count(*) as emp_count from employee group by department having count(*)>50;
select department,(max(salary)-min(salary)) as sal_range from employee group by department; 
select employee_id,first_name,last_name,date_of_birth from employee where month(date_of_birth)=month(curdate());