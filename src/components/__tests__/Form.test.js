import React from "react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];


  xit("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form
        interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });


  xit("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form
        name="Lydia Miller-Jones"
        interviewers={interviewers} />
    )
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });


  

});

