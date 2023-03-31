import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

// Date - 26th Feb, 2023.

interface Props {
    closeForm: () => void;
    activity: Activity | undefined;
}

export default function ActivityForm({ closeForm, activity: selectedActivity }: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        console.log(activity);
    }

    // After simply declaring value property we are broking typing into the input field. That is the reason react makes the field readonly 
    // as react unable to track changes. That is the reason we handle onChange inside the input field.
    // Date - 06th Mar, 2023.
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return (
        // clearing property to clear any previous floats in HTML.
        // Date - 26th Feb, 2023.
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated="right" positive type="submit" content="Submit" />
                <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}