import React from "react";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

// Date - 25th Feb, 2023.
export default observer(function ActivityList(/*{ activities, selectActivity, deleteActivity, submitting }: Props*/) {
    const { activityStore } = useStore();
    const { activitiesByDate } = activityStore;

    return (
        <Segment>
            <Item.Group divided>
                {/* Separated all the List Item specific code to another file, i.e. ActivityListItem.tsx.
                Date - 12th May, 2023. */}
                {activitiesByDate.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
    )
})