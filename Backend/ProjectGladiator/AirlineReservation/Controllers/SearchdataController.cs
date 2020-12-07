using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AirlineReservation.Models;

namespace AirlineReservation.Controllers
{
    [RoutePrefix("Api/Searchdata")]
    public class SearchdataController : ApiController
    {

        FRSEntities DB = new FRSEntities();
        [Route("showdata")]
        [HttpGet]
        public object showdata()
        {
            var a = DB.Flights.ToList();
            return a;
        }

        [Route("search")]
        [HttpPost]
        public object search(searchdata sd)
        {
            var a = DB.proc_searchflight(sd.SourceFlight, sd.Destination);
            return a;
        }
    }
}
