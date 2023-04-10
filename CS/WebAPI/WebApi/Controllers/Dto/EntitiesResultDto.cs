
using System.Collections.Generic;

namespace Model
{
    public class EntitiesResultDto<T>
    {

        public int TotalRows { get; set; }
        public IList<T> Entities { get; set; }
    }
}
