CREATE DATABASE DB;

USE DB;


CREATE TABLE Members(
   memberId INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
   IdentityCard VARCHAR(20),
   memberFName VARCHAR(20),
   memberLName VARCHAR(20),
   dateOfBirth VARCHAR(20),
   telephone VARCHAR(15),
   mobilePhone VARCHAR(20),
   city VARCHAR(20),
   street VARCHAR(20),
   building INT
);

CREATE TABLE Corona
(
   CoronaId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   memberId INT NOT NULL,
   positiveTestDate varchar(20),
   recoveryDate varchar(20), 
   FOREIGN KEY (memberId) REFERENCES Members(memberId) ON DELETE CASCADE
);

CREATE TABLE Vaccinations
(
   VaccinationsId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   memberId INT NOT NULL,
   manufacturer varchar(20),
   VaccinationDate varchar(20), 
   FOREIGN KEY (memberId) REFERENCES Members(memberId) ON DELETE CASCADE
);

INSERT INTO Members (IdentityCard, memberFName, memberLName, dateOfBirth, telephone, mobilePhone, city, street, building)
VALUES ('123456789', 'John', 'Doe', '12/02/1985', '123-456789', '987-654321', 'New York', 'Broadway', 123),
       ('987654321', 'Jane', 'Smith', '11/10/1994', '987-654321', '123-456789', 'Bnei Brak', 'Pinkas', 456),
       ('555555555', 'Alice', 'Johnson', '04/12/2002', '555-555555', '777-777777', 'Tel Aviv', 'Dizingof', 789),
       ('213782782', 'Avi', 'Levi', '20/08/2000', '555-555555', '777-777777', 'Tel Aviv', 'Dizingof', 789);

INSERT INTO Corona (memberId, positiveTestDate, recoveryDate)
VALUES (34, '12/02/2021', '30/02/2021'),
       (35, '12/03/2020', '12/04/2021'),
       (36, '12/10/2021', '29/10/2021');


INSERT INTO Vaccinations (memberId, manufacturer, VaccinationDate)
VALUES (34, 'Pfizer', '30/01/2021'),
       (35, 'Moderna', '10/05/2021'),
       (36, 'Johnson & Johnson', '30/11/2021');


SELECT * FROM Vaccinations;
SELECT * FROM Members;
SELECT * FROM Corona;

ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'ms213827827';

flush privileges;

 INSERT INTO Corona (memberId, positiveTestDate, recoveryDate) 
VALUES (1, '12/02/2021', '30/02/2021');
SELECT * FROM Corona;

select * from  Vaccinations 