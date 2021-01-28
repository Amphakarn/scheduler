import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

// propTypes validating interviewers is an array.
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{props.interviewers.map(interviewer =>

        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.interviewer}
          setInterviewer={() => props.setInterviewer(interviewer.id)}
        />

      )};
      </ul>
    </section>
  );
};