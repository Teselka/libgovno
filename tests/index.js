const { requests } = require('../lib/index.js');

const data = requests.get('https://httpbin.org/cookies', {synced:true,follow_redirects: true, cookies:[{name:'aboba',value:'yes'}] });
