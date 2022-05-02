## Quick example
```js
// Callbacks
requests.get('https://example.com/', (err, data) => { console.log(data.status); });

// Promises
requests.get('https://example.com/')
    .then((err, data) => {
        console.log(data.status);
    });
    
// Passing some data
requests.get('https://example.com/', { json: {'key':'value'} });

// Link params
requests.get('https://example.com/', { params: {'key':'value'} });
```
 
