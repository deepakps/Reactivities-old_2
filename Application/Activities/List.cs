using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    // CancellationToken helps to cancel the request if it is no longer needed.
    // There will be circumstances where request takes longer time than usual & user might cancel it from his side.
    // CancellationToken code commented as it was writen for demo purpose.
    // Date - 18th Feb, 2023.
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            /*private readonly ILogger<List> _logger;*/
            public Handler(DataContext context/*, ILogger<List> logger*/)
            {
                /*_logger = logger;*/
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                /*try
                {
                    for (int i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        _logger.LogInformation($"Task {i} has completed!");
                    }
                }
                catch (System.Exception)
                {
                    _logger.LogInformation("Task was completed!");
                }*/
                return await _context.Activities.ToListAsync();
            }
        }
    }
}