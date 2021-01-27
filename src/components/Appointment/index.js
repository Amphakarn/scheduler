import React from 'react';
import useVisualMode from "hooks/useVisualMode.js"

import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error.js";


export default function Appointment(props) {

  // console.log("***PROPS for Appointment = ", props);

  // mode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer,
      };
      transition(SAVING, true);
      props.bookInterview(props.id, interview) //props.id --> appointment id
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
    } 
    else {
      alert("Please fill in information"); //to fix
    }
  };

  const destroy = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      { mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}

      { mode === SAVING &&
        <Status message="Saving" />}


      { mode === DELETING &&
        <Status message="Deleting" />}

      { mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
        />
      )}

      { mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />
      )}

      { mode === EDIT && (
        <Form
        name={props.interview && props.interview.student}
        interviewer={props.interview && props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />
      )}  

      { mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete this interview?"}
          onCancel={back}
          onConfirm={destroy}
        />
      )}

      { mode === ERROR_SAVE && (
        <Error
          message={"Error could not save appointment!"}
          onClose={() => back()}
        />
      )}

      { mode === ERROR_DELETE && (
        <Error
          message={"Error could not cancel appointment!"}
          onClose={() => back()}
        />
      )}
    </article>
  );
};