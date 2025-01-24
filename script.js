// document.addEventListener("DOMContentLoaded", function() {

    function reloadPage() {
        location.reload();
    }
    document.getElementById("fetch-stats").addEventListener("click", async () => {
        
        const username = document.getElementById("username").value.trim();
        // reloadPage()
        if (!username) {
            alert("Please enter a valid username!");
            return;
        }
        let ur=`https://www.codechef.com/users/${username}`;
        const apiUrl = `https://codechef-api.vercel.app/handle/${username}`;
        function profilelink(){
            window.location.href = ur;
        }
        document.getElementById("link").addEventListener("click",profilelink);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                alert("User not found or API error!");
                return;
            }
    
            const data = await response.json();
            populateProfile(data);
            populateHeatmap(data.heatMap);
            populateContestPerformance(data.ratingData);
        } catch (error) {
            console.error("Error fetching stats:", error);
            alert("Failed to fetch data. Please try again later.");
        }
    });
    
    function populateProfile(data) {
        document.getElementById("profile").classList.remove("hidden");
        document.getElementById("profile-pic").src = data.profile;
        document.getElementById("profile-name").textContent = data.name || "N/A";
        document.getElementById("profile-rating").textContent = `Current Rating: ${data.currentRating}`;
        document.getElementById("profile-hrating").textContent = ` Highest Rating: ${data. highestRating}`;
        document.getElementById("profile-rank").textContent = `Global Rank: ${data.globalRank}, Country Rank: ${data.countryRank}`;
        document.getElementById("profile-stars").textContent = `Stars: ${data.stars}`;
    }
    
    let heatmapChart = null; 

function populateHeatmap(heatMap) {
    document.getElementById("heatmap").classList.remove("hidden");

    const ctx = document.getElementById("heatmap-canvas").getContext("2d");

    
    if (heatmapChart) {
        heatmapChart.destroy();
    }

    const labels = heatMap.map(entry => entry.date);
    const values = heatMap.map(entry => entry.value);

    heatmapChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Activity",
                data: values,
                backgroundColor: "#4CAF50",
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: "User Activity Heatmap" },
            },
        },
    });
}

function populateContestPerformance(ratingData) {
    document.getElementById("contest-performance").classList.remove("hidden");
 
    const existingChart = Chart.getChart("rating-chart");
    if (existingChart) {
        existingChart.destroy();
    }
 
    const ctx = document.getElementById("rating-chart").getContext("2d");
    const labels = ratingData.map(contest => contest.name);
    const ratings = ratingData.map(contest => contest.rating);
 
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Rating Progression",
                data: ratings,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                fill: true,
                tension: 0.4,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Rating Progression Over Contests"
                },
            },
        }
    });
 
    const tableBody = document.getElementById("contest-table-body");
    tableBody.innerHTML = "";
    
    ratingData.forEach(contest => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contest.name}</td>
            <td>${contest.getday}-${contest.getmonth}-${contest.getyear}</td>
            <td>${contest.rating}</td>
            <td>${contest.rank}</td>
        `;
        tableBody.appendChild(row);
    });
 }