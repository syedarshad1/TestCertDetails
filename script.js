async function fetchCertificates() {
    const resultDiv = document.getElementById('result');

    try {
        const response = await axios.get('https://fis.keyfactorpki.com/KeyfactorAPI/Certificates', {
            auth: {
                username: 'your-username',
                password: 'your-password'
            },
            params: {
                includeExpired: true,
                includeRevoked: true
            }
        });

        let output = '<table><tr>';
        const headers = Object.keys(response.data[0]);
        headers.forEach(header => {
            output += `<th>${header}</th>`;
        });
        output += '</tr>';

        response.data.forEach(cert => {
            output += '<tr>';
            headers.forEach(header => {
                output += `<td>${cert[header]}</td>`;
            });
            output += '</tr>';
        });
        output += '</table>';
        resultDiv.innerHTML = output;
    } catch (error) {
        console.error('Error fetching certificates:', error);
        resultDiv.innerHTML = 'Error occurred while fetching certificates';
    }
}

function search() {
    const fieldName = document.getElementById('fieldName').value;
    const comparison = document.getElementById('comparison').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.trim()).filter(row => row.length > 0);
            const headers = rows[0].split(',').map(header => header.trim());
            let results = [];

            rows.slice(1).forEach(row => {
                const fields = row.split(',').map(field => field.trim());
                const fieldIndex = headers.indexOf(fieldName);
                if (fieldIndex !== -1) {
                    const fieldValue = fields[fieldIndex].toLowerCase();
                    let match = false;
                    if (comparison === 'contains' && fieldValue.includes(searchInput)) {
                        match = true;
                    } else if (comparison === 'does_not_contain' && !fieldValue.includes(searchInput)) {
                        match = true;
                    } else if (comparison === 'equals' && fieldValue === searchInput) {
                        match = true;
                    } else if (comparison === 'not_equals' && fieldValue !== searchInput) {
                        match = true;
                    }
                    if (match) {
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
