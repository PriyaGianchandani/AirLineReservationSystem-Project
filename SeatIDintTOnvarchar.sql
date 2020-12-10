
  

  sp_help Booking
  sp_help Seat

ALTER TABLE Booking
DROP CONSTRAINT FK__Booking__SeatID__38996AB5

ALTER TABLE Seat
DROP CONSTRAINT PK__Seat__311713D34C430912

ALTER TABLE Seat ALTER COLUMN SeatID NVARCHAR (50)

select * from Booking

alter table Seat
alter column SeatID nvarchar(50) not null

ALTER TABLE Seat
ADD PRIMARY KEY (SeatID)

ALTER TABLE Booking
ADD SeatID nvarchar(50) Not null,
CONSTRAINT fk_SeatID FOREIGN KEY(SeatID) 
REFERENCES Seat(SeatID)
