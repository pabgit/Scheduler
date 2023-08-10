// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
    var alertButtonEl = $('#save');
    alertButtonEl.on('click', function () {
    alert('Hello World');
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  // Reads schedules from local storage and returns array of project objects.
  // Returns an empty array ([]) if there aren't any schedules.
  function readScheduleFromStorage() {
    var schedules = localStorage.getItem('schedules');
    if (schedules) {
      schedules = JSON.parse(schedules);
    } else {
      schedules = [];
    }
    return schedules;
  }

  // Takes an array of projects and saves them in localStorage.
  function saveProjectsToStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  // Gets project data from local storage and displays it
  function printProjectData() {
    
    // get projects from localStorage
    var projects = readProjectsFromStorage();

    // loop through each project and create a row
    for (var i = 0; i < projects.length; i += 1) {
      var project = projects[i];
      var projectDate = dayjs(project.date);
      // get date/time for start of today
      var today = dayjs().startOf('day');

      // Create row and columns for project
      var rowEl = $('<tr>');
      var nameEL = $('<td>').text(project.name);
      var typeEl = $('<td>').text(project.type);
      var dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));

    // add class to row by comparing project date to today's date
    if (projectDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
      rowEl.addClass('project-today');
    }

    // append elements to DOM to display them
    rowEl.append(nameEL, typeEl, dateEl, deleteEl);
    projectDisplayEl.append(rowEl);
  }
}


  // TODO: Add code to display the current date in the header of the page.
  var currentDayEl = $('#currentDay');
  function displayDay() {
    var today = dayjs().format('MMMM DD, YYYY');
    currentDayEl.text(today);
  }
  displayDay();
});
