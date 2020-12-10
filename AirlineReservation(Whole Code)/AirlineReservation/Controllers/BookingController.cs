using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AirlineReservation.Models;

namespace AirlineReservation.Controllers
{
    public class BookingController : ApiController
    {
        [Route("Api/ConfirmBooking")]
        [HttpPost]
        public object createbooking(AddBooking Lvm)
        {
            try
            {
                FRSEntities db = new FRSEntities();
                Booking Ru = new Booking();
                if (Ru.BookingID == 0)
                {
                    Ru.FlightID = Lvm.FlightID;
                    Ru.Email = Lvm.Email;
                    Ru.ClassID = Lvm.ClassID;
                    Ru.BookingDate = Lvm.BookingDate;
                    Ru.NoofTickets = Lvm.NoofTickets;
                    Ru.BookingAmount = Lvm.BookingAmount;
                    Ru.DateOfDeparture = Lvm.DateOfDeparture;
                    Ru.ReturnDate = Lvm.ReturnDate;
                    Ru.ReturnTicket = Lvm.ReturnTicket;
                    Ru.ClassDetails = Lvm.ClassDetails;
                    Ru.Del = 1;
                    db.Bookings.Add(Ru);
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
        [Route("Api/GetAvailableSeats")]
        [HttpPut]
        public void Put(int id, [FromUri] Flight f)
        {
            try
            {
                FRSEntities db = new FRSEntities();
                Booking booking = new Booking();
                //int count;
                f = (from p in db.Flights
                     where p.FlightID == id
                     select p).SingleOrDefault();
                booking = (from p in db.Bookings
                           where p.FlightID == id
                           select p).OrderByDescending(b => b.BookingID).ToList()[0];
                f.SeatAvailability = f.SeatAvailability - booking.NoofTickets;
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Ok(e.Message);
            }

        }
        [Route("Api/Getlastbooking")]
        [HttpGet]
        public IHttpActionResult GetLastBooking()
        {
            FRSEntities db = new FRSEntities();
            List<Booking> bookings = new List<Booking>();
            var bid = db.Bookings.OrderByDescending(p => p.BookingID).FirstOrDefault().BookingID;
            return Ok(bid);
        }
    }
}