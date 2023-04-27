import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

// Date - 25th Feb, 2023.

interface Props {
    activities: Activity[];
    /* Code refactored & shifted to activityStore.ts. Date - 26th Apr, 2023.
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;*/
    submitting: boolean;
}

export default function ActivityList({ activities, /*selectActivity, deleteActivity,*/ submitting }: Props) {
    // setTarget state added.
    // Date - 24th Apr, 2023.
    const [target, setTarget] = useState('');

    // All the click events come from react Synthetic event
    // Date - 24th Apr, 2023.
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        // deleteActivity(id);
    }

    const { activityStore } = useStore();

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated="right" content="View" color="blue" />
                                <Button
                                    name={activity.id}
                                    // Below && statement added is to check whether 
                                    // click event is triggered for the same button or not.
                                    loading={submitting && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    floated="right"
                                    content="Delete"
                                    color="red" />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}