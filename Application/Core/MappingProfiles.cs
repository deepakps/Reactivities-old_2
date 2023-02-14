// 'Core' folder is responsible for things that are applicable for all our feature that is inside Application project.
// Date - 14th Feb, 2023.
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}