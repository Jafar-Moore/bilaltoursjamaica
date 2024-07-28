import { TOUR } from "./config.js";
import { hideForm } from "./modules/form.js";


$(document).ready(function() {


    const form = document.getElementById('tourbookingForm');

    form.addEventListener('submit', async (event) => {

        event.preventDefault();
        const formData = {
            name: document.querySelector('input[name="customerName"]').value,
            email: document.querySelector('input[name="email"]').value,
            phoneNumber: document.querySelector('input[name="phoneNumber"]').value,
            numberOfTravelers: document.querySelector('input[name="numTravelers"]').value,
            pickupLocation: document.querySelector('input[name="pickuplocation"]').value,
            pickupTime: document.querySelector('input[name="pickuptime"]').value,
            tourdetails: document.querySelector('input[name="tourdetails"]').value   // Get selected tour details
        };

        const tour = TOUR();

        try {
            const response = await fetch(tour, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Booking created successfully:', responseData);
            } else {
                console.error('Failed to create booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});


