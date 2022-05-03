const { requests } = require('../lib/index.js');

requests.get('https://httpbin.org/cookies', {follow_redirects: true, cookies:[{name:'aboba',value:'yes'}] }, (err ,data) => {
    console.log(err, data);
});