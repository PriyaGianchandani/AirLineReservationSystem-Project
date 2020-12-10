using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AirlineReservation.Models;

namespace AirlineReservation.Controllers
{
    public class ClassController : ApiController
    {
        private int ecost = 0;
        [Route("Api/AddClass")]
        [HttpPost]
        public object createclass(AddClass Lvm)
        {
            try
            {
                FRSEntities db = new FRSEntities();
                Class Ru = new Class();
                if (Ru.ClassID == 0)
                {
                    Ru.ClassID = Lvm.ClassID;
                    Ru.FlightID = Lvm.FlightID;
                    Ru.BusinessCost = Lvm.BusinessCost;
                    Ru.NoOfBusinessSeats = Lvm.NoOfBusinessSeats;
                    Ru.EconomyCost = Lvm.EconomyCost;
                    Ru.NoOfEconomySeats = Lvm.NoOfEconomySeats;
                    db.Classes.Add(Ru);
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
        [Route("Api/GetClass")]
        [HttpGet]
        public IHttpActionResult GetClass(int id)
        {
            FRSEntities db = new FRSEntities();
            List<Class> countrylist = new List<Class>();
            //var exists = countrylist.Find(p => p.FlightID == id);
            //if (countrylist.Exists(p => p.FlightID == id))
            ecost = db.Classes.Where(p => p.FlightID == id).First().ClassID;
            return Ok(ecost);
        }

        [Route("Api/GetEconomyCost")]
        [HttpGet]
        public IHttpActionResult GetEconomyCost(int id)
        {
            FRSEntities db = new FRSEntities();
            List<Class> countrylist = new List<Class>();
            var cost = db.Classes.Where(s => s.FlightID == id).First().EconomyCost;
            if (cost == 0)
            {
                return NotFound();
            }
            return Ok(cost);
        }
        [Route("Api/GetBusinessCost")]
        [HttpGet]
        public IHttpActionResult GetBusinessCost(int id)
        {
            FRSEntities db = new FRSEntities();
            List<Class> countrylist = new List<Class>();

            var cost = db.Classes.Where(s => s.FlightID == id).First().BusinessCost;
            if (cost == 0)
            {
                return NotFound();
            }
            return Ok(cost);
        }
        [Route("Api/GetsysDate")]
        [HttpGet]
        public IHttpActionResult GetDate()
        {
            string dt = DateTime.Now.ToString("dd/MM/yyyy");
            return Ok(dt);
        }

    }
}