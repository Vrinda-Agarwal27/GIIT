describe employee;
select * from employee;

select * from employee where employee_id in (select manager_id from employee) order by employee_id;
select manager_id from employee;
select employee_id,
    first_name,
    last_name,
    LENGTH(CONCAT(first_name, ' ', last_name)) AS name_length from employee where length(concat(first_name,' ',last_name))=(select max(length(concat(first_name,' ',last_name))) from employee);
    describe employee;
select department,round(avg(timestampdiff(year,hire_date,curdate()))) as tenure from employee group by department;
select employee_id,first_name,last_name,hire_date from employee where dayofweek(hire_date) in (1,7);
select employee_id,first_name,last_name,date_of_birth,salary from employee order by timestampdiff(year,date_of_birth,curdate()),salary;
select job_title from employee e where count(e.job_title) in (select max(count(e.job_title)) from employee);
SELECT job_title,COUNT(*) AS count
FROM 
    employee
GROUP BY 
    job_title
ORDER BY 
    count DESC
LIMIT 5;
select department,((count(*)/(select count(*) from employee))*100) as percentage from employee group by department;
select * from employee where salary>(select avg(salary) from employee) order by salary;
select e.employee_id,e.first_name,e.last_name,e.department,e.salary,(e.salary/(select max(salary) from employee group by e.department)) as rel_sal from employee e;
select e.department,avg(e.salary) as avg_salary from employee e group by e.department having avg(e.salary)<(select avg(salary) from employee) ;
select avg(salary) from employee;
select e.employee_id,e.first_name,e.last_name,e.hire_date,timestampdiff(year,e.hire_date,curdate()) as tenure from employee e where timestampdiff(year,e.hire_date,curdate())>(select timestampdiff(year,hire_date,curdate()) from employee where employee_id=e.manager_id);
select job_title,max(salary) from employee group by job_title;
SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    e.department,
    e.salary,
    (e.salary / dept_total.total_salary) * 100 AS percent_sal
FROM 
    employee e
JOIN 
    (SELECT 
         department, 
         SUM(salary) AS total_salary
     FROM 
         employee
     GROUP BY 
         department) AS dept_total
ON 
    e.department = dept_total.department;
select e.department,disparity.range_sal from employee e join (select department ,max(salary)-min(salary) as range_sal from employee group by department) as disparity on e.department=disparity.department group by department order by disparity.range_sal desc limit 1;
select sum(salary) as total_expense from employee;
select * from employee where hire_date in (select hire_date from employee group by hire_date having count(*)>1) order by hire_date;
select employee_id,first_name,last_name,timestampdiff(year,date_of_birth,curdate()) as age from employee;
select employee_id,first_name,last_name,timestampdiff(year,hire_date,curdate()) as years_of_service from employee;
select e.employee_id,e.first_name,e.last_name,e.department,hire_date from employee e join (select department,max(hire_date) as max_hire_date from employee group by department) as dept on e.department=dept.department and e.hire_date=dept.max_hire_date ;

