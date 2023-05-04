import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// Date - 21st Feb, 2023.
export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                {/* {selectedActivity && !editMode &&
                    <ActivityDetails />}
                {editMode &&
                    <ActivityForm />} */}
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
})