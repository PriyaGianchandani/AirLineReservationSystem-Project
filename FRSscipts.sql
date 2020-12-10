create database FRS
use FRS

create table RegisteredUsers(FirstName nvarchar(50) not null,LastName nvarchar(50) not null,Email nvarchar(100) not null Primary Key,Password nvarchar(50) not null,DOB date not null,ContactNo nvarchar(50) not null)

create table Flight(FlightID int not null Primary Key Identity(100,1),Source nvarchar(50) not null,
					Destination nvarchar(50) not null,ArrivalTime time not null,DepartureTime time not null,
					NoOfSeats int not null,FlightDate date not null,Duration int not null)


create table Seat(SeatID int Primary Key not null,FlightID int Foreign Key references Flight(FlightID)not null,ClassID int Foreign Key references Class(ClassID) not null)
create table Class(ClassID int Primary Key not null,FlightID int Foreign Key references Flight(FlightID) not null,ClassName nvarchar(30) not null,Cost int not null)



create table Booking(BookingID int Primary Key not null Identity(1001,1),
					 FlightID int Foreign Key references Flight(FlightID) not null,
					 Email nvarchar(100) Foreign Key references RegisteredUsers(Email) not null,
					 ClassID int Foreign Key references Class(ClassID) not null,
					 SeatID int Foreign Key references Seat(SeatID) not null,
					 BookingDate date not null,
					 NoofTickets int not null,
					 BookingAmount int not null,
					 DateOfDeparture date not null,
					 ReturnDate date,
					 ReturnTicket bit not null,
					 AvailableTickets int not null)

create table Passengers(PassengerID int Primary Key not null,
						FirstName nvarchar(50) not null,
						LastName nvarchar(50) not null,
						Age int not null,
						BookingID int Foreign Key references Booking(BookingID) not null,
						Email nvarchar(100) Foreign Key references Registeredusers(Email) not null)


create table Cancellations(CancellationID int Primary Key not null identity(1,1),
						   CancellationDate date not null,
						   FlightID int Foreign Key references Flight(FlightID) not null,
						   RefundAmount int not null,
						   BookingID int Foreign Key references Booking(BookingID) not null)


Insert into RegisteredUsers values('Nisarg','Virvadia','nisargvirvadia@gmail.com','Qwerty123','1998-12-17','8779283879')

select * from RegisteredUsers
Insert into RegisteredUsers values('Udit','Bhatia','uditbhatia@gmail.com','Abc123','1998-11-19','9779283888'),
('Priya','Gianchandani','priya@gmail.com','Zxc123','1998-10-14','9889283888'),('Susan','Sunny','susansunny@gmail.com','Pqr123','1998-12-18','9779283876')

sp_rename 'Flight.Source','SouceFlight','COLUMN';
sp_rename 'Flight.SouceFlight','SourceFlight','COLUMN';


select * from Flight

Insert into Flight(SourceFlight,Destination,ArrivalTime,DepartureTime,NoOfSeats,FlightDate,Duration)
values ('Mumbai','Delhi','13:30','14:30',50,'2020-12-01',120)

update Flight set DepartureTime='11:30' where FlightID=100
select * from Flight

Insert into Flight(SourceFlight,Destination,ArrivalTime,DepartureTime,NoOfSeats,FlightDate,Duration)
values ('Kolkata','Banglore','13:30','12:00',40,'2020-11-10',90),('Chennai','Hyderabad','14:30','12:30',50,'2020-12-12',120)
update Flight set FlightDate='2021-05-01' where FlightID=100
update Flight set FlightDate='2021-02-01' where FlightID=101
update Flight set FlightDate='2021-04-03' where FlightID=102

select * from Class
select * from Seat

Insert into Class values(1,100,'Business',5000),(2,100,'Economy',3000)
Insert into Seat values(1,100,1),(2,100,1),(3,100,2)

select * from Booking

alter table Booking drop column AvailableTickets

Insert into Booking(FlightID,Email,ClassID,SeatID,BookingDate,NoofTickets,BookingAmount,DateOfDeparture,ReturnTicket)
values(100,'nisargvirvadia@gmail.com',1,1,'2021-04-03',1,5000,'2020-12-01',0)

Insert into Booking(FlightID,Email,ClassID,SeatID,BookingDate,NoofTickets,BookingAmount,DateOfDeparture,ReturnTicket)
values(101,'uditbhatia@gmail.com',2,2,'2021-01-01',1,3000,'2020-11-10',0)


select * from Passengers

Insert into Passengers values (1,'Nisarg','Virvadia',22,1001,'nisargvirvadia@gmail.com')
Insert into Passengers values (2,'Udit','Bhatia',22,1002,'uditbhatia@gmail.com')

select * from Cancellations

Insert into Cancellations values(1,'2020-11-09',100,1000,1001)
Insert into Cancellations values(2,'2020-11-10',101,900,1002)

Alter table registeredusers Add  Title nvarchar(20)
select * from RegisteredUsers

Insert into RegisteredUsers

update RegisteredUsers set Title='Mr' where Title IS Null

update RegisteredUsers set Title='Mrs' where FirstName='Priya'
update RegisteredUsers set Title='Mrs' where FirstName='Susan'


ALTER TABLE
  registeredusers
ALTER COLUMN
  Title
    NVARCHAR(20) NOT NULL;



select * from Flight


CREATE PROCEDURE proc_searchflight 
@SourceFlight varchar(50),
@Destination varchar(50)
AS
BEGIN
select * from Flight where SourceFlight=@SourceFlight AND Destination=@Destination
END

CREATE PROCEDURE proc_flightsearch 
@SourceFlight varchar(50),
@Destination varchar(50)
AS
BEGIN
select * from Flight where SourceFlight=@SourceFlight AND Destination=@Destination
END     Creating new procedure

CREATE PROCEDURE proc_finalflightsearch 
@SourceFlight varchar(50),
@Destination varchar(50)
AS
BEGIN
select * from Flight where SourceFlight=@SourceFlight AND Destination=@Destination AND Del=1
END

exec proc_finalflightsearch @SourceFlight='Mumbai',@Destination='Delhi'



Insert into Flight(SourceFlight,Destination,ArrivalTime,DepartureTime,NoOfSeats,FlightDate,Duration)
values ('Mumbai','Delhi','8:30','6:30',65,'2020-12-01',120)

select * from Flight

Delete from Flight where FlightID=103


CREATE PROCEDURE proc_validateuser 
@Username varchar(50),
@Password varchar(50)
AS
BEGIN
select * from RegisteredUsers where Email=@Username AND Password=@Password
END

select * from RegisteredUsers

exec proc_validateuser @Username='abcde@gmail.com',@Password='qwert123'

sp_help Flight

select * from Flight


select * from Class
Delete from Class where FlightID=100

ALTER TABLE Class
ADD NoOfClassSeats int NOT NULL default 25

Delete from Class where ClassName='Business'

select * from Seat

Delete from Seat where ClassID=1

select * from Booking

Delete from Booking where BookingID=1001

select * from Cancellations

Delete from Cancellations where BookingID=1001
Delete from Cancellations where BookingID=1002


select * from Passengers
Delete from Passengers where BookingID=1001
Delete from Passengers where BookingID=1002

Delete from Booking where BookingID=1001
Delete from Booking where BookingID=1002

Delete from Seat where ClassID=1
Delete from Seat where ClassID=2

Delete from Class where ClassName='Business'
Delete from Class where ClassName='Economy'

ALTER TABLE Class
ADD Economy nvarchar(30) NOT NULL 

ALTER TABLE Class
ADD Business nvarchar(30) NOT NULL 

ALTER TABLE Class
Drop Column Business

select * from Class

Alter table Class
Add EconomyCost int NOT NULL

Alter table Class
Add NoOfEconomySeats int NOT NULL

ALTER TABLE Class
RENAME COLUMN ClassName TO Business

ALTER TABLE Class
RENAME COLUMN Cost TO BusinessCost

EXEC sp_rename 'Class.ClassName', 'Business', 'COLUMN'
EXEC sp_rename 'Class.Cost', 'BusinessCost', 'COLUMN'
EXEC sp_rename 'Class.NoOfClassSeats', 'NoOfBusinessSeats', 'COLUMN'

select * from Flight
select * from Class


ALTER TABLE Class
Drop Column Business

ALTER TABLE Class
Drop Column Economy

select * from RegisteredUsers

Insert into RegisteredUsers values('Udit1','Bhatia1','udit.bhatia11@gmail.com','Abc1234','1988-11-19','9779283868','Mr')

select * from Flight

select * from Booking

select * from Passengers

Alter table Booking Drop column SeatID

sp_help booking
Alter table Booking drop constraint FK__Booking__SeatID__4F7CD00D

Drop table Seat 

select * from Flight
Alter table Flight add Del int not null default 1

select * from Seat

Drop table Passengers

create table Passengers(PassengerID int Primary Key Identity(1,1) not null,
						FirstName nvarchar(50) not null,
						LastName nvarchar(50) not null,
						Age int not null,
						BookingID int Foreign Key references Booking(BookingID) not null,
						Email nvarchar(100) Foreign Key references Registeredusers(Email) not null,
						SeatID nvarchar(50) Foreign Key references Seat(SeatID) not null)

select * from Passengers

alter table Booking
Add ClassDetails nvarchar(30) 

select * from Booking
select * from Class

select * from Flight

alter table Flight
Add SeatAvailability int 
update  Flight set seatavailability=45 where FlightID=100

select * from Booking

select * from Class

update Booking set ClassDetails='Business Class' where FlightID=100

select * from Passengers
select * from seat 

alter table Seat
drop constraint FK__Seat__FlightID__48CFD27E

sp_help Passengers
alter table Passengers
drop constraint FK__Passenger__SeatI__06CD04F7

drop table Seat

update Flight set Del=0 where FlightID=103

sp_help Passengers
delete from Passengers 

alter table Booking
Drop column Del

alter table Passengers add SeatID nvarchar(20)
select * from Passengers

alter table Booking
add Del int default 1 not null

select * from Booking

sp_help Booking


alter table Booking
drop constraint DF__Booking__Del__2A164134

sp_help Cancellations

Alter table Cancellations
drop column CancellationID 

drop table Cancellations
alter table Cancellations
add CancellationID int identity(1,1)

sp_help Cancellations

select * from Passengers
select * from Cancellations

select * from Flight

select * from RegisteredUsers
ALTER TABLE Cancellations ADD CONSTRAINT PK_CancellationID PRIMARY KEY (CancellationID)

sp_help Cancellations

ALTER TABLE Booking ALTER COLUMN ReturnTicket bit NULL