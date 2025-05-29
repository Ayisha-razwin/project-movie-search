document.getElementById('searchBtn').addEventListener('click', () => {
    const title = document.getElementById('movieInput').value.trim();
    const resultContainer = document.getElementById('movieResult');
    resultContainer.innerHTML = "";

    if (!title) {
        resultContainer.innerHTML = "<p class='text-danger'>Please enter a movie title.</p>";
        return;
    }

    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=thewdb`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
                resultContainer.innerHTML = "<p class='text-danger'>Movie not found. Please try another title.</p>";
            } else {
                resultContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${data.Poster}" alt="Poster of ${data.Title}">
                        </div>
                        <div class="col-md-8">
                            <h2>${data.Title} (${data.Year})</h2>
                            <p><strong>Plot:</strong> ${data.Plot}</p>
                            <p><strong>Genre:</strong> ${data.Genre}</p>
                            <p><strong>Director:</strong> ${data.Director}</p>
                        </div>
                    </div>
                `;
            }
        })
        .catch(err => {
            resultContainer.innerHTML = "<p class='text-danger'>An error occurred. Please try again later.</p>";
        });
});
