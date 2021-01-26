- Day should be a string
- Given anything else but a string, component should show an error message

- Days should be an array of object
- Given anything else but an array, component should show an error message

- Appointments should be object
- Given anything else but an object, component should show an error message

- Interviewers should be object
- Given anything else but an array, component should show an error message

- When an appointment is booked, the spot remaining for the specific day should be reduced by one

- When an appointment is cancelled, the spot remaining for the specific day should be increased by one

- If initial mode is EMPTY, when onAdd is selected, it should transition to CREATE mode.
- If mode is CREATE, when onCancel is selected, it should go back to EMPTY mode.
- If mode is CREATE, when onSave is selected, it should transition to SAVING mode
    - If promise returns resolve, it should transition to SHOW mode
    - If promise returns reject, it should transition to ERROR_SAVE mode


Form component
- Student name should not be null
- Interviewer should not be null