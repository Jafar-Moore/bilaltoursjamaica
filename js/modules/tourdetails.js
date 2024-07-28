export function getTourDetails(){
const tourlinks = document.querySelectorAll('.tourlink');

// Add click event listener to each element
tourlinks.forEach(tourlink => {
    tourlink.addEventListener('click', function(event) {
        // `this` refers to the clicked element
        alert(`Clicked: ${this.textContent}`);
        console.log("say something")
    });
});
}