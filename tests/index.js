const { requests } = require('../lib/index.js');


// (async () => {
//     const res = await ;
    
//     console.log(res.status);
// })();

// (async () => {
//     const get = await requests.get('https://httpbin.org/get', {follow_redirects: true});
//     //const get = requests.get('https://httpbin.org/get', {follow_redirects: true});
    
//     console.log(get);
// })();

const get = requests.get('https://httpbin.org/get', {follow_redirects: true}, (err ,data) => {
    console.log(err, data);
});