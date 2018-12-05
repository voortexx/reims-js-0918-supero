import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import validate from "./validate";
import renderField from "./renderField";

const SendSport = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <div>
          <Label>Indiquez le sport pratiqué :</Label>
        </div>
        <Input
          name="sport_id"
          tag={Field}
          type="select"
          component="select"
          label="Session"
        >
          <option value="1">Running</option>
          <option value="2">Vélo</option>
          <option value="3">Natation</option>
          <option value="4">Musculation</option>
          <option value="5">Autres sports ext.</option>
          <option value="6">Autres sports int.</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Input
          name="activity_title"
          type="text"
          tag={Field}
          component={renderField}
          label="Nom de l'activité"
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="activity_difficulty"
          type="select"
          tag={Field}
          component="select"
          label="Difficulté"
        >
          <option>Difficulté</option>
          <option value="1">Facile</option>
          <option value="2">Intermediaire</option>
          <option value="3">Difficile</option>
          <option value="4">Intense</option>
        </Input>
      </FormGroup>
      <div>
        <Button type="submit" className="next">
          Suivant
        </Button>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: "addactivity", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SendSport);