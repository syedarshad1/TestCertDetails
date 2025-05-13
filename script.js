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
            let results = [];

            rows.slice(1).forEach(row => {
                const fields = row.split(',');
                const fieldIndex = headers.indexOf(fieldName);
                if (fieldIndex !== -1) {
                    const fieldValue = fields[fieldIndex];
                    if ((comparison === 'contains' && fieldValue.includes(searchInput)) ||
                        (comparison === 'equals' && fieldValue === searchInput)) {
                        results.push(fields);
                    }
                }
            });

            if (results.length > 0) {
                let output = '<table><tr>';
                headers.forEach(header => {
                    output += `<th>${header}</th>`;
                });
                output += '</tr>';

                results.forEach(result => {
                    output += '<tr>';
                    result.forEach(field => {
                        output += `<td>${field}</td>`;
                    });
                    output += '</tr>';
                });
                output += '</table>';
                resultDiv.innerHTML = output;
            } else {
                resultDiv.innerHTML = 'No results found';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error occurred while searching';
        });
}
