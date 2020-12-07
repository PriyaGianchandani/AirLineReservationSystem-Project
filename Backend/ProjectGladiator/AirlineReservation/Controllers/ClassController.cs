using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AirlineReservation.Models;

namespace AirlineReservation.Controllers
{
    public class ClassController : ApiController
    {
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
                    Ru.EconomyCost = Lvm.NoOfEconomySeats;
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
    }
}