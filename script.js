function search() {
    const searchInput = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');

    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            let found = false;
            rows.forEach(row => {
                if (row.includes(searchInput)) {
                    resultDiv.innerHTML = `Found: ${row}`;
                    found = true;
                }
            });
            if (!found) {
                resultDiv.innerHTML = 'No results found';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error occurred while searching';
        });
}
