import { useEffect, useState } from "react";

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
      
      // Update spots remaining when creating a new appointment
      const days = state.days.map((day) => {
        return day.appointments.includes(id) ? { ...day, spots: day.spots - 1 } : day;
      });

      return axios.put(`/api/appointments/${id}`, { interview })
        .then((response) => {
          setState((prev) => ({
            ...prev,
            appointments,
            days
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

    // Update spots remaining when cancelling an appointment
    const days = state.days.map((day) => {
      return day.appointments.includes(id) ? { ...day, spots: day.spots + 1 } : day;
    });
    
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      setState((prev) => ({
        ...prev,
        appointments,
        days
      }));
    })
  });

  return { state, setDay, bookInterview, cancelInterview }
};

