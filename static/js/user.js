let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
btn.addEventListener("click", function () {
  sidebar.classList.toggle('active');
});

function showContent(id) {
  var elements = document.getElementsByClassName('container');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = 'none';
  }
  document.getElementById(id).style.display = 'block';
}

function toggleDropdown(event) {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.classList.toggle("show");
  event.stopPropagation(); // Prevent the click event from propagating to the window
}

// Close the dropdown menu if the user clicks outside of it
window.addEventListener("click", function (event) {
  var dropdownContent = document.getElementById("dropdownContent");
  var userDropdown = document.querySelector('.user-dropdown');
  if (!userDropdown.contains(event.target)) { // Close dropdown if the click is not within the user-dropdown
    dropdownContent.classList.remove("show");
  }
});


/* Check_access */
document.addEventListener('DOMContentLoaded', function () {
  const errorBox = document.querySelector('.error');
  const errorTitle = document.querySelector('.error__title');
  const errorClose = document.querySelector('.error__close');

  errorClose.addEventListener('click', function () {
    errorBox.classList.remove('show'); // Remove the 'show' class to hide the error box
  });

  const toggleButton = document.getElementById('toggleButton');
  toggleButton.addEventListener('click', function () {
    // Check access status
    fetch('/check_access')
      .then(response => response.json())
      .then(data => {
        var accessGranted = data.accessGranted;
        if (accessGranted === true) {
          // Access granted, redirect to face recognition page
          window.location.href = '/video';
        } else {
          // Access denied, show error message in the error box
          errorTitle.textContent = "Access to face recognition is disabled.";
          errorBox.classList.add('show'); // Add the 'show' class to display the error box
        }
      })
      .catch(error => {
        console.error('Error checking access: ', error);
      });
  });
});

/* clock */
function startTime() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
  hr = (hr == 0) ? 12 : hr;
  hr = (hr > 12) ? hr - 12 : hr;
  //Add a zero in front of numbers<10
  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var curWeekDay = days[today.getDay()];
  var curDay = today.getDate();
  var curMonth = months[today.getMonth()];
  var curYear = today.getFullYear();
  var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
  document.getElementById("date").innerHTML = date;

  var time = setTimeout(function () { startTime() }, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
startTime();

/* calendar */
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const calendar = document.querySelector('.calendar');
const month_picker = document.querySelector('#month-picker');

month_picker.onclick = () => {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
  const calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  const calendar_header_year = document.querySelector('#year');
  const days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const currentDate = new Date();

  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  const first_day = new Date(year, month);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    const day = document.createElement('div');

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

const month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  const month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  };
});

(function () {
  month_list.classList.add('hideonce');
})();

document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
  'en-US',
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
  const timer = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
  let time = `${`${timer.getHours()}`.padStart(2, '0')}:${`${timer.getMinutes()}`.padStart(
    2,
    '0'
  )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
  todayShowTime.textContent = formateTimer;
}, 1000);

// Fetch holiday data from the provided link
fetch('https://testing--2d00a113-7f27-4ead-92a5-c2f99c14bbf2.app.getlazy.ai/holidays/en.indian/2024')
  .then(response => response.json())
  .then(data => {
    const holidays = data.holidays;
    highlightHolidays(holidays);
  })
  .catch(error => console.error('Error fetching holiday data:', error));

// Function to highlight holidays on the calendar
const highlightHolidays = (holidays) => {
  const calendarDays = document.querySelectorAll('.calendar-days div');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  holidays.forEach(holiday => {
    const holidayDate = new Date(holiday.date);
    const holidayYear = holidayDate.getFullYear();
    const holidayMonth = holidayDate.getMonth();
    const holidayDay = holidayDate.getDate();

    // Check if the holiday is in the current year and month
    if (holidayYear === currentYear && holidayMonth === currentMonth) {
      calendarDays.forEach(day => {
        const calendarDate = parseInt(day.textContent);
        if (calendarDate === holidayDay) {
          day.classList.add('holiday');
          day.setAttribute('title', holiday.name);
        }
      });
    }
  });
};

fetch('/attendance_percentage')
.then(response => response.json())
.then(data => {
    const months = Object.keys(data.attendance_percentage);
    months.forEach(month => {
        const barContainer = document.getElementById(month.toLowerCase());
        const attendancePercentage = data.attendance_percentage[month];
        const bar = barContainer.querySelector('.bar');
        bar.style.height = `${attendancePercentage}%`;
    });
})
.catch(error => console.error('Error fetching attendance percentages:', error));