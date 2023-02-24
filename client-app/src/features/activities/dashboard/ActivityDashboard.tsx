import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";

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
        </Grid>
    )
}