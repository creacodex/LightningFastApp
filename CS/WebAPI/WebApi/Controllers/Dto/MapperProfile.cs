using Model;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Controllers.Dto
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<CarrierType, CarrierTypeDto>().ReverseMap();
            CreateMap<EntitiesResult<CarrierType>, EntitiesResultDto<CarrierTypeDto>>();
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<EntitiesResult<Client>, EntitiesResultDto<ClientDto>>();
            CreateMap<Delivery, DeliveryDto>().ReverseMap();
            CreateMap<EntitiesResult<Delivery>, EntitiesResultDto<DeliveryDto>>();
            CreateMap<ShippingType, ShippingTypeDto>().ReverseMap();
            CreateMap<EntitiesResult<ShippingType>, EntitiesResultDto<ShippingTypeDto>>();
            CreateMap<UsersDto, ApplicationUser>();
            CreateMap<ApplicationUser, UsersDto>();
            CreateMap<RegisterDto, ApplicationUser>()
                .ForMember(register => register.UserName, opt => opt.MapFrom(user => user.Email));
            CreateMap<InvitationDto, ApplicationUser>()
                .ForMember(register => register.UserName, opt => opt.MapFrom(user => user.Email));
        }
    }
}

