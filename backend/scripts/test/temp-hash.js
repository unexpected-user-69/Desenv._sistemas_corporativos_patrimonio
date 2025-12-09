const bcrypt = require('bcryptjs');
const password = 'AdminPassword123!';
const pepper = process.env.HASH_PEPPER || '';
const hash = bcrypt.hashSync(password + pepper, 10);
console.log(hash);
