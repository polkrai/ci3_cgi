var dhymlxCalendar;
var inputObj;

	dhymlxCalendar = new dhtmlXCalendarObject(); //{input: "appointment_date", button: "calendar_icon"}
	
	inputObj = document.getElementById("appointment_date");
	
	dhymlxCalendar.attachObj(inputObj);
