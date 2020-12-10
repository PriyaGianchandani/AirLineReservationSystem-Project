using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AirlineReservation.Models;

namespace AirlineReservation.Controllers
{
    public class RegisterController : ApiController
    {
        [Route("api/Login")]
        [HttpPost]
        public HttpResponseMessage PostLogin(string email, string password)
        {
            FRSEntities db = new FRSEntities();
            bool Exists = false;
            RegisteredUser ru = new RegisteredUser();
            List<RegisteredUser> users = db.RegisteredUsers.ToList();
            foreach (var item in users)
            {
                if (item.Email == email)
                {
                    Exists = true;
                    ru = item;
                    break;
                }
            }
            if (Exists)
            {
                if (ru.Password == password)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Success");
                }
                else
                    return Request.CreateResponse(HttpStatusCode.OK, "Wrong Password");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Invalid User");
            }
        }
        [Route("RegisterUser")]
        [HttpPost]
        public object createcontact(Registration Lvm)
        {
            try
            {
                FRSEntities db = new FRSEntities();
                RegisteredUser Ru = new RegisteredUser();
                if (Ru.Email == null)
                {
                    Ru.FirstName = Lvm.FirstName;
                    Ru.LastName = Lvm.LastName;
                    Ru.Email = Lvm.Email;
                    Ru.Password = Lvm.Password;
                    Ru.DOB = Lvm.DOB;
                    Ru.ContactNo = Lvm.ContactNo;
                    Ru.Title = Lvm.Title;
                    db.RegisteredUsers.Add(Ru);
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
