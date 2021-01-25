import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
} from "../helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log("PREV STATE = ", state.appointments[1])

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState((prev) => ({ ...prev, days }));
  // const setAppointments = appointments => setState((prev) => ({ ...prev, appointments }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((response) => {
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        }));
      })
  }, []);

  // Book a new appointment
  const bookInterview = ((id, interview) => {
    // console.log("INTERVIEW = ", interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log("...state.appointments[id]: ", appointments[id])

    // Update the existing appointments object with new appointment with the matching appointment id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => ({
          ...prev,
          appointments
        }));
      })
      .catch((error) => console.log(error));
  });

  // Delete an appointment
  const cancelInterview = ((id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      setState((prev) => ({
        ...prev,
        appointments
      }));
    })
    .catch((error) => console.log(error));
  });



  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  const appointment = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {state.days.length &&
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
