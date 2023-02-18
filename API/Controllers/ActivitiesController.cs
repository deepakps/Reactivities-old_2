using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

// Date - 13th Feb, 2023.
namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // CancellationToken code commented as it was writen for demo purpose.
        // Date - 18th Feb, 2023.
        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities(/*CancellationToken ct*/)
        {
            return await Mediator.Send(new List.Query()/*, ct*/);
        }

        [HttpGet("{id}")] //api/activities/{id}
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        // When we make use of IActionResult it gives access to the Http response type, e.g. return Ok, return bad req, etc.
        // Date - 15th Feb, 2023.
        // We can make use of attribute [FromBody] to specifically tell the API compiler where to find request attributes.
        // Date - 13th Feb, 2023.
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}