const http = require('http');

function request(token) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '127.0.0.1',
            port: 3001,
            path: '/v1/test-token',
            method: 'GET',
            headers: {},
        };

        if (token) {
            options.headers['X-Service-Token'] = token;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: body ? JSON.parse(body) : null });
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function runTests() {
    try {
        console.log('Testing without token (should fail)...');
        let res = await request();
        console.log('Status:', res.statusCode, 'Body:', res.body);

        console.log('\nTesting with wrong token (should fail)...');
        res = await request('wrong-token');
        console.log('Status:', res.statusCode, 'Body:', res.body);

        console.log('\nTesting with correct token (should succeed)...');
        res = await request('my-secret-token');
        console.log('Status:', res.statusCode, 'Body:', res.body);

    } catch (error) {
        console.error('Test failed:', error);
    }
}

runTests();
