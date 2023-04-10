using System;
using System.Linq;
using System.Linq.Expressions;

namespace Repository.Extensions
{
    public static class IQueryableExtensions
    {
        public static IOrderedQueryable<TSource> OrderBy<TSource, TKey>(
            this IQueryable<TSource> source,
            Expression<Func<TSource, TKey>> keySelector,
            bool isAscending)
        {
            return isAscending ? source.OrderBy(keySelector) : source.OrderByDescending(keySelector);
        }
    }
}
