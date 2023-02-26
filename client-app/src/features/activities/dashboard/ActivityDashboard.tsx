import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

// Date - 21st Feb, 2023.

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                {/* List & List.Item code shifted to ActivityList.tsx.
                    Date - 22nd Feb, 2023. */}
                <ActivityList activities={activities} />
            </Grid.Column>
            <Grid.Column width="6">
                {activities[0] &&
                    <ActivityDetails activity={activities[0]} />}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}