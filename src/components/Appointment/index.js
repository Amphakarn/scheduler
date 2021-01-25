import React from 'react';
import useVisualMode from "hooks/useVisualMode.js"

import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";


export default function Appointment(props) {

  console.log("***PROPS for Appointment = ", props);

  // mode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => transition(CREATE);
  const onEdit = () => transition(CREATE);
  const onDelete = () => transition(CONFIRM);
  const onConfirm = () => transition(DELETING);



  const save = (name, interviewer) => {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer,
      };
      transition(SAVING);
      props.bookInterview(props.id, interview) //props.id --> appointment id
        .then(() => transition(SHOW))
        .catch((err) => console.log(err));
    } else {
      alert("Please fill in information"); //to fix
    }
  }

  const destroy = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => console.log(err));
  };


  return (
    <article className="appointment">
      <Header time={props.time} />

      { mode === EMPTY &&
        <Empty onAdd={onAdd} />}

      { mode === SAVING &&
        <Status messaging="Saving" />}

      { mode === DELETING &&
        <Status messaging="Deleting" />}

      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      { mode === CREATE && (
        <Form
          name={props.interview && props.interview.student}
          interviewer={props.interviewers.name}
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

      {/* {props.interview ?
        <Show student={props.interview.student} interviewer={props.interview.interviewer} /> :
        <Empty />} */}
    </article>
  );
}