//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AirlineReservation.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    
    [DataContract]
    public partial class Flight
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Flight()
        {
            this.Bookings = new HashSet<Booking>();
            this.Cancellations = new HashSet<Cancellation>();
            this.Classes = new HashSet<Class>();
            this.Seats = new HashSet<Seat>();
        }
    
        [DataMember]
        public int FlightID { get; set; }

        [DataMember]
        public string SourceFlight { get; set; }

        [DataMember]
        public string Destination { get; set; }

        [DataMember]
        public System.TimeSpan ArrivalTime { get; set; }

        [DataMember]
        public System.TimeSpan DepartureTime { get; set; }

        [DataMember]
        public int NoOfSeats { get; set; }

        [DataMember]
        public System.DateTime FlightDate { get; set; }

        [DataMember]
        public int Duration { get; set; }

        [DataMember]
        public int Del { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Booking> Bookings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Cancellation> Cancellations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Class> Classes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Seat> Seats { get; set; }
    }
}
