using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AirlineReservation.Models;

namespace AirlineReservation.Controllers
{
    public class CancelBookingController : ApiController
    {
        FRSEntities db = new FRSEntities();

        [Route("CancelBooking")]
        [ResponseType(typeof(Booking))]
        [HttpPost]
        public HttpResponseMessage Delete(int id)
        {
            FRSEntities db = new FRSEntities();
            try
            {
                Booking bk = db.Bookings.Where(q => q.BookingID == id).FirstOrDefault();
                bk.Del = 0;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Successful Deletion");
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Unsuccessful");
            }
        }
        [Route("Cancel")]
        [HttpPost]
        public object cancel(Cancel Lvm)
        {
            try
            {
                FRSEntities db = new FRSEntities();
                Cancellation c = new Cancellation();
                if (c.CancellationID == 0)
                {
                    c.CancellationDate = Lvm.CancellationDate;
                    c.FlightID = Lvm.FlightID;
                    c.RefundAmount = Lvm.RefundAmount;
                    c.BookingID = Lvm.BookingID;

                    db.Cancellations.Add(c);
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
        [Route("GetBookingID")]
        public IHttpActionResult GetBookingId(int id)
        {
            FRSEntities db = new FRSEntities();
            List<Booking> flights = db.Bookings.ToList();
            var bid = db.Bookings.Where(c => c.BookingID == id).FirstOrDefault().BookingID;
            return Ok(bid);
        }
        [Route("GetFlightByBID")]
        [HttpGet]
        public string GetFlightByBId(int id)
        {
            /* FRSEntities db = new FRSEntities();
             List<Booking> flights = db.Bookings.ToList();
             var fid = db.Bookings.Where(c => c.BookingID == id).FirstOrDefault().FlightID;
             return fid.ToString();*/
            return "Helloworld";
        }
        [Route("GetBookingAmount")]
        public IHttpActionResult GetBooingAmount(int id)
        {
            FRSEntities db = new FRSEntities();
            List<Booking> flights = db.Bookings.ToList();
            var amount = db.Bookings.Where(c => c.BookingID == id).FirstOrDefault().BookingAmount;
            return Ok(amount);
        }

        [Route("Cancellation")]
        [HttpPost]
        public IHttpActionResult GetCancel(int BookingID)
        {
            Cancellation cancel = new Cancellation();
            cancel.BookingID = BookingID;
            cancel.CancellationDate = DateTime.Now;
            cancel.FlightID = db.Bookings.Where(b => b.BookingID == BookingID).ToList()[0].FlightID;
            int BookingPrice = db.Bookings.Where(b => b.BookingID == BookingID).ToList()[0].BookingAmount;
            cancel.RefundAmount = BookingPrice - (int)(BookingPrice * 0.2);
            db.Cancellations.Add(cancel);
            db.SaveChanges();
            return Ok(new { message = "Success", RefundAmount = cancel.RefundAmount });
        }
    }
}