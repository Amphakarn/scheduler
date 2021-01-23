//... returns an array of appointments for that day

export function getAppointmentsForDay(state, day) {

  const dayFound = state.days.find(eachDay => eachDay.name === day);

  // console.log("STATE = ", state)
  // console.log("DAYFOUND = ", dayFound)

  if (dayFound === undefined && state.days.length === 0) {
    return [];
  }

  const appointments = dayFound.appointments.map(appointmentID =>
    state.appointments[appointmentID]);

  return appointments;
}


export function getInterview(state, interview) {

  if (!interview) {
    return null
  }

  const interviewerID = interview.interviewer;
  const interviewerInfo = state.interviewers[interviewerID];
  const result = { ...interview, interviewer: interviewerInfo };
  
  // console.log("result = ", result)

  return result;
}