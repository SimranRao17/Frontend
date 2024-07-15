document.addEventListener('DOMContentLoaded', function() {
    const btnRetrieveData = document.getElementById('btnRetrieveData');
    const btnTransferData = document.getElementById('btnTransferData');
    const logTextArea = document.getElementById('logTextArea');

    const baseURL = 'http://localhost'; // Adjust base URL if microservices are on a different host

    btnRetrieveData.addEventListener('click', function() {
        logTextArea.value = ''; // Clear log area
        logMessage('Retrieving data from MySQL...');

        fetch(`${baseURL}:8082/gilhari/v1/Loan`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                logMessage('Successfully retrieved data from MySQL');
                // Process data as needed
            })
            .catch(error => {
                logMessage(`Error retrieving data: ${error.message}`);
            });
    });

    btnTransferData.addEventListener('click', function() {
        logTextArea.value = ''; // Clear log area
        logMessage('Transferring data to PostgreSQL...');

        const postData = {
            // Define your data to post
        };

        fetch(`${baseURL}:8083/gilhari/v1/LoanH`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            logMessage('Successfully transferred data to PostgreSQL');
            // Process response data as needed
        })
        .catch(error => {
            logMessage(`Error transferring data: ${error.message}`);
        });
    });

    function logMessage(message) {
        logTextArea.value += `${message}\n`;
    }
});
