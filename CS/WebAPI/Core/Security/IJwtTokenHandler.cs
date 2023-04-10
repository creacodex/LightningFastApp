using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

namespace Core.Security
{
    public interface IJwtTokenHandler
    {
        JwtToken GetToken(string userName, IList<string> userRoles);
    }
}