const http = require('http');

function request(method, path, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: body ? JSON.parse(body) : null });
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    try {
        console.log('Testing GET /users (should be empty)...');
        let res = await request('GET', '/users');
        console.log('Status:', res.statusCode, 'Body:', res.body);

        console.log('\nTesting POST /users...');
        res = await request('POST', '/users', { name: 'John Doe', email: 'john@example.com' });
        console.log('Status:', res.statusCode, 'Body:', res.body);
        const userId = res.body.id;

        console.log('\nTesting GET /users/:id...');
        res = await request('GET', `/users/${userId}`);
        console.log('Status:', res.statusCode, 'Body:', res.body);

        console.log('\nTesting PUT /users/:id...');
        res = await request('PUT', `/users/${userId}`, { name: 'Jane Doe' });
        console.log('Status:', res.statusCode, 'Body:', res.body);

        console.log('\nTesting DELETE /users/:id...');
        res = await request('DELETE', `/users/${userId}`);
        console.log('Status:', res.statusCode);

        console.log('\nTesting GET /users (should be empty again)...');
        res = await request('GET', '/users');
        console.log('Status:', res.statusCode, 'Body:', res.body);

    } catch (error) {
        console.error('Test failed:', error);
    }
}

runTests();
