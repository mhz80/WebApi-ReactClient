import React, { FormEvent, useContext, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
  const activityStore = useContext(ActivityStore);
  const { createActivity, editActivity, submitting, cancelFormOpen } = activityStore;
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" value={activity.title} onChange={handleInputChange} name="title" />
        <Form.TextArea
          rows={2}
          placeholder="Decription"
          value={activity.description}
          onChange={handleInputChange}
          name="decription"
        />
        <Form.Input placeholder="Category" value={activity.category} onChange={handleInputChange} name="category" />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          onChange={handleInputChange}
          name="date"
        />
        <Form.Input placeholder="City" value={activity.city} onChange={handleInputChange} name="city" />
        <Form.Input placeholder="Venue" value={activity.venue} onChange={handleInputChange} name="venue" />
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button onClick={cancelFormOpen} floated="right" positive type="cancel" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
