const fetch = require('./fetch-icon');

let icon = fetch.fetchIcon('http://go.microsoft.com/fwlink/?LinkId=259577');

icon.subscribe({
    next: x => console.log(x)
})