import { validateForm } from "./modules/form.js";
import { hideForm } from "./modules/form.js";
import {AIRPORT} from "./config.js";
import { HEREAPI } from "./config.js";



document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById("bookingForm");
    const landingAirportSelect = document.querySelector('select[name="landingAirport"]');
    const hotelSelect = document.querySelector('select[name="accommodation"]');
    const roundTripSelect = document.querySelector('select[name="round"]');
    const hotelLocationSelect = document.querySelector('select[name="hotelLocation"]');
    const travelersselect = document.querySelector('select[name="numoftravelers"]');
    

    const airportUrl = AIRPORT();

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        if (validateForm()) {
            calculatePrice();
            hideForm();

            const customerName = document.forms["bookingForm"]["customerName"].value;
            const email = document.forms["bookingForm"]["email"].value;
            const phoneNumber = document.forms["bookingForm"]["phoneNumber"].value;
            const specialRequests = document.forms["bookingForm"]["specialRequests"].value;
            const dtime = document.forms["bookingForm"]["departuretime"].value; // Corrected
            const atime = document.forms["bookingForm"]["ArrivalTime"].value; // Corrected
            const totalCost = await calculatePrice();
            const ariivalDate = document.forms["bookingForm"]["ArrivalDate"].value;
            const departureDate = document.forms["bookingForm"]["DepartureDate"].value;
            const numberOfTravelers = parseInt(document.querySelector('input[name="numTravelers"]').value, 10);

            function formatDateToISO(dateString) {
                const parts = dateString.split('/');
                return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
            }

            const hotelText = hotelSelect.options[hotelSelect.selectedIndex].textContent;
            const landingAirportText = landingAirportSelect.options[landingAirportSelect.selectedIndex].textContent;
            const roundTripText = roundTripSelect.options[roundTripSelect.selectedIndex].textContent;
            const hotelLocationText = hotelLocationSelect.options[hotelLocationSelect.selectedIndex].textContent;

            const booking = {
                customerName,
                email,
                phoneNumber,
                ariivalDate: formatDateToISO(ariivalDate),
                departureDate: formatDateToISO(departureDate),
                hotelLocation: hotelLocationText,
                landingAirport: landingAirportText,
                roundTrip: roundTripText,
                accommodation: hotelText,
                specialRequests,
                departureTime: dtime,
                arrivalTime: atime,
                //numberoftravelers : document.querySelector('input[name="numTravelers"]').value, // Corrected
                totalCost : totalCost,
                numberOfTravelers

            };

        

            try {
                const response = await fetch(airportUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(booking)
                });

                console.log(booking);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                alert('Booking created successfully!');
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while creating the booking. Please try again later.');
            }
        }
    });
});



 

function calculatePrice() {
    return new Promise((resolve, reject) => {
        // Get the selected values
        const start = document.querySelector('select[name="landingAirport"]').value.split(',').map(Number);
        const end = document.querySelector('select[name="accommodation"]').value.split(',').map(Number);
        const travelers = document.getElementsByName('numTravelers')[0].value;
        const round = document.getElementsByName('round')[0].value;

        // Check if all required fields are filled
        if (start && end && travelers && round) {
            try {
                // Get API key from a secure location (environment variable, backend)
                const apiKey = HEREAPI();


                // Construct URL for routing API request
                const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${start}&destination=${end}&return=summary&apiKey=${apiKey}`;

                // Make a request to the HERE Routing API
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Check if routes are found in the response data
                        if (!data.routes || data.routes.length === 0) {
                            throw new Error('No routes found');
                        }
                        // Extract distance from the response data
                        const distance = data.routes[0].sections[0].summary.length / 1000; // Distance in kilometers

                        // Calculate price based on distance and fixed rate
                        let price = (distance * 2); // Multiplying distance by 2 to get the price

                        if (round === 'yes') {
                            price = (distance * 2);
                        } else {
                            price = distance;
                        }

                        // Adjust price for extra travelers
                        if (travelers > 4) {
                            const extrafee = travelers - 4;
                            price += extrafee * 30;
                        }

                        // Resolve the promise with the calculated price
                        resolve(price);
                    })
                    .catch(error => {
                        // Reject the promise with the error
                        console.error('Error:', error);
                        reject('An error occurred while calculating the price. Please try again later.');
                    });
            } catch (error) {
                // Reject the promise with unexpected errors
                console.error('Unexpected error:', error);
                reject('An unexpected error occurred. Please try again later.');
            }
        } else {
            // Reject the promise if any required field is empty
            reject('Please fill out all required fields.');
        }
    });
}

