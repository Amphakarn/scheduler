import React, { useEffect, useState } from "react";

import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

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
  });

  return { state, setDay, bookInterview, cancelInterview }
}

