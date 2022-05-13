const { requests } = require('../lib/index.js');

const myassert = ((expr, name) => {
    expr ? console.info('✔️',name,'test passed') : console.error('❌',name,'test failed');
});

const methodtest = (async (method) => {
    const x = await requests[method](`https://httpbin.org/${method}`, {follow_redirects: true});
    myassert(x.status == 200, method);
});

(async () => {
    const x = await requests.get('https://httpbin.org/cookies', {
        cookies:[
            {
                name:'cookie',
                value: 'value'
            }
        ]
    });
    myassert(x.json().cookies.cookie === 'value', 'Cookie');

    const x1 = await requests.get('https://httpbin.org/absolute-redirect/6', {follow_redirects: true});
    myassert(x1.redirects == 6, 'Redirects');

})();