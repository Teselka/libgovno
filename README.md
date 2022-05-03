## How to use
1. Install package from npm
```npm install libgovno```

2. Include lib
```const { requests } = require('libgovno');```

## Quick example
```js
// Callbacks
requests.get('https://example.com/', (err, data) => { console.log(data.status); });

// Promises
requests.get('https://example.com/')
    .then((err, data) => {
        console.log(data.status);
    });
    
// Async await
const data = await requests.get('https://example.com/');
    
// Passing some data
requests.get('https://example.com/', { json: {'key':'value'} });

// Link params
requests.get('https://example.com/', { params: {'key':'value'} });

// Cookies
requests.get('https://httpbin.org/cookies', { cookies:[ { name:'aboba',value:'yes' } ] });  
```
 
