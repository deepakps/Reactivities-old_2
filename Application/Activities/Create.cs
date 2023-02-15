using Domain;
using MediatR;
using Persistence;

// Date - 13th Feb, 2023.
namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // First EF first tracking changes locally inside our context in memory and 
                // adding details to the database when we call Add method.
                // Then SaveChangesAsync will actually write changes to the database. Though SaveChangesAsync is asynchronous method.
                // It is not returning anything. Therefore, we made call to Unit.Value.
                // Date - 13th Feb, 2023.
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}