# Interview Scheduler

Interview Scheduler is a single-page application that was built using React and test with the latest tools and techniques. This application allows users to book, cancel and edit interviews. 



## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts



## Screenshots

##### Main View
!["Main View"](https://github.com/Amphakarn/scheduler/blob/master/docs/SchedulerMainView.png?raw=true)


##### Add New Appointment Form
!["Add New Appointment Form"](https://github.com/Amphakarn/scheduler/blob/master/docs/AddAppointment.png?raw=true)


##### Edit or Delete Appointment View (Hover state)
!["Edit or Delete Appointment View (Hover state)"](https://github.com/Amphakarn/scheduler/blob/master/docs/HoverEditDelete.png?raw=true)


##### Confirmation Message Upon Delete
!["Confirmation Message Upon Delete"](https://github.com/Amphakarn/scheduler/blob/master/docs/DeleteConfirmation.png?raw=true)


##### Edit Appointment Form
!["Edit Appointment Form"](https://github.com/Amphakarn/scheduler/blob/master/docs/EditAppointment.png?raw=true)



## Getting Started

### Setup

In order to run this application, you have to have two servers running, scheduler server (scheduler-api) and scheduler client. 
The API server runs on port 8001, and the client runs on port 8000.

### Setup API server

Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a **new directory** and follow the README.md instructions.


### Running Webpack Development Server

From the root directory of the project, execute the following commands:
1) Install dependencies with `npm install`.
2) Run `npm start`
3) Visit http://localhost:8000 in the browser

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```
