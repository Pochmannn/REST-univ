using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjApi.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Producent { get; set; }
        public string Model { get; set; }
        public string Typ { get; set; }
        public string RokProdukcji { get; set; }
        public string KrajProdukcji { get; set; }
        public string PrzebiegKm { get; set; }
        public string MocKM { get; set; }

    }
}
