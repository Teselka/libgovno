const { requests } = require('../lib/index.js');

(async () => {
    const data = await requests.get('https:///example.com/');
    console.log(data.text);
})();