using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using AirlineReservation.Models;

namespace AirlineReservation.Controllers
{
    public class EmailController : ApiController
    {
        FRSEntities db = new FRSEntities();
        //[System.Web.Http.AcceptVerbs("GET", "POST")]
        //[System.Web.Http.HttpGet]
        public bool CheckEmail(string email)
        {
            var isValidEmail = db.RegisteredUsers.Where(w => w.Email == email).FirstOrDefault();
            if (isValidEmail != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [Route("send-email")]
        [HttpGet]
        public async Task<int> SendEmail(string to)
        {
            if (CheckEmail(to) == true)
            {

                string from = "punsairways@gmail.com";
                string subject = "Welcome to PUNS Airways";
                Random generator = new Random();
                int r = generator.Next(1000, 10000);
                string body = "Hello , Your otp is " + r;

                SmtpClient smtp = new SmtpClient();

                MailMessage mm = new MailMessage();
                mm.From = new MailAddress(from);
                mm.To.Add(to);
                mm.Subject = subject;
                mm.Body = body;
                await Task.Run(() => smtp.SendAsync(mm, null));
                return r;
            }
            else
            {
                return 0;
            }

        }
        [Route("update-password")]
        [HttpPut]
        public dynamic UpdatePassword(string email, string password)
        {
            //var query = from user in tblUser where user.email == email select user;
            //var query = db.Customers.Find(email);
            List<RegisteredUser> emp = db.RegisteredUsers.ToList();
            foreach (var item in emp)
            {
                if (item.Email == email)
                {
                    item.Password = password;
                    //item.ConfirmPassword = password;
                    db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "Valid");
                }

            }
            return Request.CreateResponse(HttpStatusCode.NotFound, "NotFound");
        }

    }
}