function search() {
    const fieldName = document.getElementById('fieldName').value;
    const comparison = document.getElementById('comparison').value;
    const searchInput = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');

    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const fieldIndex = headers.indexOf(fieldName);
            let found = false;
            let results = '';

            rows.slice(1).forEach(row => {
                const columns = row.split(',');
                const fieldValue = columns[fieldIndex];

                let match = false;
                switch (comparison) {
                    case 'contains':
                        match = fieldValue.includes(searchInput);
                        break;
                    case 'doesNotContain':
                        match = !fieldValue.includes(searchInput);
                        break;
                    case 'isEqualTo':
                        match = fieldValue === searchInput;
                        break;
                    case 'isNotEqualTo':
                        match = fieldValue !== searchInput;
                        break;
                }

                if (match) {
                    results += `<p>Found: ${row}</p>`;
                    found = true;
                }
            });

            if (!found) {
                resultDiv.innerHTML = 'No results found';
            } else {
                resultDiv.innerHTML = results;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error occurred while searching';
        });
}
