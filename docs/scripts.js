// Function to handle the wish submission
document.getElementById("wishForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get input values
    const wishName = document.getElementById("wishName").value.trim();
    const wishText = document.getElementById("wishText").value.trim();

    // Validation
    if (wishName && wishText) {
        // Create a new div element to hold the wish
        const wishDiv = document.createElement("div");
        wishDiv.classList.add("wish");

        // Create the wish content
        wishDiv.innerHTML = `
            <h4>${wishName}</h4>
            <p>"${wishText}"</p>
        `;

        // Append the new wish to the wish tree container
        document.getElementById("wishTree").appendChild(wishDiv);

        // Clear the form inputs
        document.getElementById("wishName").value = "";
        document.getElementById("wishText").value = "";

        // Optionally: Display a success message
        alert("Thank you for your wish!");
    } else {
        alert("Please fill out both your name and your wish.");
    }
});
