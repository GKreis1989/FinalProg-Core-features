document.addEventListener("DOMContentLoaded", async function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResultsContainer = document.getElementById("searchResults");

    const searchFDA = async (query) => {
        const apiKey = "YOUR_API_KEY";
        const fdaApiEndpoint = `https://api.fda.gov/drug/event.json?search=${query}&api_key=${apiKey}`;

        try {
            const response = await fetch(fdaApiEndpoint);
            const searchData = await response.json();
            displaySearchResults(searchData.results);
        } catch (error) {
            console.error("Error fetching FDA data:", error);
        }
    };

    const displaySearchResults = (results) => {
        searchResultsContainer.innerHTML = "";

        results.forEach((result) => {
            const resultCard = document.createElement("div");
            resultCard.classList.add("result-card");

            const resultTitleElement = document.createElement("p");
            resultTitleElement.textContent = `Title: ${result.title}`;
            resultCard.appendChild(resultTitleElement);

            searchResultsContainer.appendChild(resultCard);
        });
    };

    searchButton.addEventListener("click", async () => {
        const searchQuery = searchInput.value.trim();

        if (searchQuery !== "") {
            searchFDA(searchQuery);
        }
    });

    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const userStatusElement = document.getElementById("userStatus");

    let currentUser = null;

    const login = (username, password) => {
        currentUser = { username: "exampleUser" };
        updateLoginStatus();
    };

    const logout = () => {
        currentUser = null;
        updateLoginStatus();
    };

    const updateLoginStatus = () => {
        if (currentUser) {
            userStatusElement.textContent = `Logged in as ${currentUser.username}`;
            loginButton.style.display = "none";
            logoutButton.style.display = "block";
        } else {
            userStatusElement.textContent = "Not logged in";
            loginButton.style.display = "block";
            logoutButton.style.display = "none";
        }
    };

    loginButton.addEventListener("click", () => {
        const username = prompt("Enter your username:");
        const password = prompt("Enter your password:");
        login(username, password);
    });

    logoutButton.addEventListener("click", () => {
        logout();
    });

    const prescriptionContainer = document.getElementById("prescriptionContainer");

    const displayPrescriptions = (prescriptions) => {
        prescriptionContainer.innerHTML = "";
        prescriptions.forEach((prescription) => {
            const prescriptionCard = document.createElement("div");
            prescriptionCard.classList.add("prescription-card");

            const prescriptionDetailsElement = document.createElement("p");
            prescriptionDetailsElement.textContent = `Drug: ${prescription.drug}, Dosage: ${prescription.dosage}`;
            prescriptionCard.appendChild(prescriptionDetailsElement);

            prescriptionContainer.appendChild(prescriptionCard);
        });
    };

    const fetchPrescriptions = () => {
        const prescriptions = [
            { drug: "Aspirin", dosage: "10mg" },
            { drug: "Ibuprofen", dosage: "20mg" },
            // Add more prescriptions based on your data
        ];
        displayPrescriptions(prescriptions);
    };

    fetchPrescriptions();
});
