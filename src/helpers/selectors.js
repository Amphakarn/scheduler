//... returns an array of appointments for that day

export function getAppointmentsForDay(state, day) {

  const dayFound = state.days.find(eachDay => eachDay.name === day);

  // console.log("STATE = ", state)
  // console.log("DAYFOUND = ", dayFound)

  // if (dayFound === undefined && state.days.length === 0) {
    if (!dayFound) {
    return [];
  }

  const appointments = dayFound.appointments.map(appointmentId =>
    state.appointments[appointmentId]);

  return appointments;
}


export function getInterview(state, interview) {

  if (!interview) {
    return null
  }

  const interviewerId = interview.interviewer;
  const interviewerInfo = state.interviewers[interviewerId];
  const result = { ...interview, interviewer: interviewerInfo };

  // console.log("result = ", result)

  return result;
}


export function getInterviewersForDay(state, day) {

  const dayFound = state.days.find(eachDay => eachDay.name === day);

  // console.log("STATE = ", state)
  // console.log("DAYFOUND = ", dayFound)

  // if (dayFound === undefined && state.days.length === 0) {
    if (!dayFound) {
    return [];
  }

  const interviewers = dayFound.interviewers.map(interviewerId =>
    state.interviewers[interviewerId]);

  return interviewers;
}