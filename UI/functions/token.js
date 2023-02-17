var cookies= document.cookie
.split(';')
.map(cookie => cookie.split('='))
.reduce((accumulator, [key,value]) =>
({ ...accumulator,[key.trim()]: decodeURIComponent(value)}),{})

// module.exports= cookies