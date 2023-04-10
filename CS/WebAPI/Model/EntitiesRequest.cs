
using System.Collections.Generic;

namespace Model
{
    public class EntitiesRequest
    {
        public int RowFrom { get; set; }
        public int RowTo { get; set; }
        public string OrderBy { get; set; }
        public Dictionary<string, string> Search { get; set; }

        public int page { get; set; }
        public int pageSize { get; set; }
    }

}
