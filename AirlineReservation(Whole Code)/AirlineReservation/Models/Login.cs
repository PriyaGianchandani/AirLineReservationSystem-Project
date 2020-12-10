using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirlineReservation.Models
{
    public class Login
    {
        public string UserName { set; get; }
        public string Password { set; get; }
    }
    public class Registration : RegisteredUser { }
    public class AddFlight : Flight { }
    public class AddClass : Class { }
    public class AddPassenger : Passenger { }
    public class AddBooking : Booking { }
    public class Cancel : Cancellation { }
}