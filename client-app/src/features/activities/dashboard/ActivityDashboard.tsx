import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

// Date - 21st Feb, 2023.

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                {/* List & List.Item code shifted to ActivityList.tsx.
                    Date - 22nd Feb, 2023. */}
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity &&
                    <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}