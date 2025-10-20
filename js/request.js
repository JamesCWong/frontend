class RequestHandler {
    constructor() {
        //Url for hosting service.
        this.backendUrl = 'https://asd.onrender.com';

        document.getElementById('submit').onclick = this.sendQuery.bind(this);
    }

    sendQuery() {
        const query = document.getElementById('sql').value;
        const lowerQuery = query.trim().toLowerCase();

        if (lowerQuery.startsWith('select')) {
            fetch(`${this.backendUrl}/?q=${encodeURIComponent(query)}`)
                .then(res => res.text())
                .then(data => document.getElementById('response').textContent = data)
                .catch(err => document.getElementById('response').textContent = err);
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
}

let reqHandler = new RequestHandler();