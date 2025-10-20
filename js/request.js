class RequestHandler {
    constructor() {
        //Url for hosting service.
        this.backendUrl = 'https://lab6-backend-7pjd.onrender.com';

        document.getElementById('submit').onclick = this.sendQuery.bind(this);
        document.getElementById('postButton').onclick = this.staticQuery.bind(this);
    }

    sendQuery() {
        const query = document.getElementById('sql').value;
        const lowerQuery = query.trim().toLowerCase();
        //Sends a GET for the select query
        if (lowerQuery.startsWith('select')) {
            fetch(`${this.backendUrl}/?q=${encodeURIComponent(query)}`)
                .then(res => res.text())
                .then(data => document.getElementById('response').textContent = data)
                .catch(err => document.getElementById('response').textContent = err);
        //Sends a POST for the insert query
        } else if (lowerQuery.startsWith('insert')) {
            fetch(this.backendUrl + '/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            })
            .then(res => res.text())
            .then(data => document.getElementById('response').textContent = data)
            .catch(err => document.getElementById('response').textContent = err);
        } else {
            document.getElementById('response').textContent = RESPONSE_ERROR;
        }
    }

    staticQuery() {
        //The static query
        const query = `
            INSERT INTO patients (name, dateOfBirth) VALUES 
            ('Sara Brown', '1901-01-01'),
            ('John Smith', '1941-01-01'),
            ('Jack Ma', '1961-01-30'),
            ('Elon Musk', '1999-01-01');
        `;

        trimQuery = query.trim();

        fetch(this.backendUrl + '/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({trimQuery})
        })
        .then(res => res.text())
        //Display the response or error.
        .then(data =>document.getElementById('presetResponse').textContent = data)
        .catch(err => document.getElementById('response').textContent = err);
    }
}

let reqHandler = new RequestHandler();