

export function validateForm() {
    var customerName = document.forms["bookingForm"]["customerName"].value;
    var email = document.forms["bookingForm"]["email"].value;
    var phoneNumber = document.forms["bookingForm"]["phoneNumber"].value;
    //var travelers = document.forms["bookingForm"]["numofravelers"].value;
    const travelers = document.getElementsByName('numTravelers')[0].value;
    var round = document.forms["bookingForm"]["round"].value;
    var startDate = document.forms["bookingForm"]["ArrivalDate"].value;
    var endDate = document.forms["bookingForm"]["DepartureDate"].value;
    var landingAirport = document.forms["bookingForm"]["landingAirport"].value;
    var accommodation = document.forms["bookingForm"]["accommodation"].value;
    var specialRequests = document.forms["bookingForm"]["specialRequests"].value;
    var dtime =  document.forms["bookingForm"]["departuretime"].value;
    var atime =  document.forms["bookingForm"]["ArrivalTime"].value;

    // Validation for Customer Name

    // if (!/^\d+$/.test(dtime)) {
    //     alert("departure time can only contain numbers.");
    //     return false;
    // }

    // if (!/^\d+$/.test(atime)) {
    //     alert("departure time can only contain numbers.");
    //     return false;
    // }
    if (customerName == "") {
        alert("Please enter your name.");
        return false;
    }
    if (!/^[a-zA-Z ]+$/.test(customerName)) {
        alert("Name can only contain letters.");
        return false;
    }

    // Validation for Email
    if (email == "") {
        alert("Please enter your email address.");
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validation for Phone Number
    if (phoneNumber == "") {
        alert("Please enter your phone number.");
        return false;
    }
    if (!/^\d+$/.test(phoneNumber)) {
        alert("Phone number can only contain numbers.");
        return false;
    }

    // Validation for Number of Travelers
    if (travelers == "") {
        alert("Please enter the number of travelers.");
        return false;
    }

    // Validation for Round trip
    if (round == "" ) {
        alert("Please specify if it's a round trip.");
        return false;
    }

    // Validation for Depart Date
    if (startDate == "") {
        alert("Please select the departure date.");
        return false;
    }

    // Validation for Return Date
    if (endDate == "") {
        alert("Please select the return date.");
        return false;
    }

    // Validation for Landing Airport
    if (landingAirport == "") {
        alert("Please enter the landing airport.");
        return false;
    }

    if (new Date(endDate) < new Date(startDate)) {
        alert("End date cannot be earlier than the Start date.");
        return false;
    }

    // Validation for Accommodation
    if (accommodation == "") {
        alert("Please enter the accommodation address.");
        return false;
    }

    // Validation for Special Requests
    if (specialRequests == "") {
        alert("Please enter any special requests.");
        return false;
    }
    // If all validations pass, the form will be submitted
    return true;
}



export function hideForm() {
    var form = document.getElementById('bookingForm');
    if (form.checkValidity()) {
        form.classList.add('hidden');
        return true; // Allow form submission
    } else {
        // Handle validation failure (e.g., display error messages)
        return false; // Prevent form submission
    }
}

