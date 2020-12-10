using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AirlineReservation.Models;

namespace AirlineReservation.Controllers
{
    public class PassengerController : ApiController
    {
        [Route("Api/AddPassenger")]
        [HttpPost]
        public object createclass(AddPassenger Lvm)
        {
            try
            {
                FRSEntities db = new FRSEntities();
                Passenger Ru = new Passenger();
                if (Ru.PassengerID == 0)
                {
                    Ru.FirstName = Lvm.FirstName;
                    Ru.LastName = Lvm.LastName;
                    Ru.Age = Lvm.Age;
                    Ru.BookingID = Lvm.BookingID;
                    Ru.Email = Lvm.Email;
                    Ru.SeatID = Lvm.SeatID;
                    db.Passengers.Add(Ru);
                    db.SaveChanges();
                    return new Response
                    { Status = "Success", Message = "SuccessFully Saved." };
                }
            }
            catch (Exception)
            {
                throw;
            }
            return new Response
            { Status = "Error", Message = "Invalid Data." };
        }
        /* public class PassengerController : ApiController
         {

             [Route("Passengerdetails")]
             [HttpPost]
             public IHttpActionResult Details(string Fname, string Lname, int Age, int BookingId, string Email, string seatid)
             {

                 FRSEntities db = new FRSEntities();
                 Passenger p = new Passenger();


                 p.FirstName = Fname;
                 p.LastName = Lname;
                 p.Age = Age;
                 p.BookingID = BookingId;
                 p.Email = Email;
                 p.SeatID = seatid;
                 db.Passengers.Add(p);
                 db.SaveChanges();
                 return Ok();
             }*/
    }
}

