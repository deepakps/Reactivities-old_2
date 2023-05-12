import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

interface Props {
    activity: Activity
}

// Date - 12th May, 2023.
export default function ActivityListItem({ activity }: Props) {
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;
    const [target, setTarget] = useState('');

    // All the click events come from react Synthetic event
    // Date - 24th Apr, 2023.
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={Link} to={`/activities/${activity.id}`}
                        floated="right" content="View" color="blue" />
                    <Button
                        name={activity.id}
                        // Below && statement added is to check whether 
                        // click event is triggered for the same button or not.
                        loading={loading && target === activity.id}
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        floated="right"
                        content="Delete"
                        color="red" />
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}