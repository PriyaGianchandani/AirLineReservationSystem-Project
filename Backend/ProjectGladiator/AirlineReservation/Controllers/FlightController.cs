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
    public class FlightController : ApiController
    {

        FRSEntities db = new FRSEntities();
        [Route("GetFlight")]
        public HttpResponseMessage Get()
        {
            var flight = db.Flights.ToList();
            if (flight.Count > 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK, flight);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "No Data Found");
            }
        }

        [Route("Api/AddFlight")]
        [HttpPost]
        public object createflight(AddFlight Lvm)
        {
            try
            {
                FRSEntities db = new FRSEntities();
                Flight Ru = new Flight();
                if (Ru.FlightID == 0)
                {

                    Ru.SourceFlight = Lvm.SourceFlight;
                    Ru.Destination = Lvm.Destination;
                    Ru.ArrivalTime = Lvm.ArrivalTime;
                    Ru.DepartureTime = Lvm.DepartureTime;
                    Ru.NoOfSeats = Lvm.NoOfSeats;
                    Ru.FlightDate = Lvm.FlightDate;
                    Ru.Duration = Lvm.Duration;
                    db.Flights.Add(Ru);
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

         /*[HttpPut]
          [Route("UpdateFlightDetails")]
          public IHttpActionResult PutEmaployeeMaster(Flight f)
          {
              if (!ModelState.IsValid)
              {
                  return BadRequest(ModelState);
              }

              try
              {
                  Flight objFlight = new Flight();
                  objFlight = db.Flights.Find(f.FlightID);
                  if (objFlight != null)
                  {
                      objFlight.SourceFlight = f.SourceFlight;
                      objFlight.Destination = f.Destination;
                      objFlight.ArrivalTime = f.ArrivalTime;
                      objFlight.DepartureTime = f.DepartureTime;
                      objFlight.NoOfSeats = f.NoOfSeats;
                      objFlight.FlightDate = f.FlightDate;
                      objFlight.Duration = f.Duration;

                  }
                  int i = this.db.SaveChanges();

              }
              catch (Exception)
              {
                  throw;
              }
              return Ok(f);
          }
          */
        [Route("GetAllFlights")]
        [HttpGet]
        public IEnumerable<Object> Get1()
        {
            var f = from q in db.Flights where q.Del == 1 select new { q.FlightID, q.SourceFlight,q.Destination,

                    q.DepartureTime,q.FlightDate,q.ArrivalTime};
            return f;
        }


        [Route("RemoveFlight")]
        [ResponseType(typeof(Flight))]
        [HttpPost]
        public HttpResponseMessage Delete(int id)
        {
            FRSEntities db = new FRSEntities();
            try
            {
                Flight flight = db.Flights.Where(q => q.FlightID == id).FirstOrDefault();
                flight.Del = 0;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Successful Deletion");
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Unsuccessful");
            }
        }


    }
}
