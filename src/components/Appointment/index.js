import React from 'react';
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode.js"


export default function Appointment(props) {

  console.log("***PROPS for Appointment = ", props);

  // mode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => transition(CREATE);

  const onSave = (name, interviewer) => {
    transition(SHOW);
  }

  // const onCancel = () => {
  //   back()
  // }

  // console.log("MODE = ", mode)


  return (
    <article className="appointment">
      <Header time={props.time} />
      { mode === EMPTY &&
        <Empty onAdd={onAdd} />}

      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )
      }

      { mode === CREATE && (
        <Form
          name={"Bee"}
          interviewer={null}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={onSave}
        />
      )}

      {/* {props.interview ?
        <Show student={props.interview.student} interviewer={props.interview.interviewer} /> :
        <Empty />} */}
    </article>
  );
}