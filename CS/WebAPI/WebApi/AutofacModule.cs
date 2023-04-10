using Autofac;
using Core.Email;
using Core.Security;
using Repository;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace WebApi
{
    public class AutofacModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<RepositoryModule>();
            builder.RegisterType<JwtTokenHandler>().As<IJwtTokenHandler>();
            builder.RegisterType<EmailSender>().As<IEmailSender>();
        }
    }
}
