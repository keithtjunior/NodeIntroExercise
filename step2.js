const fs = require('fs');
const axios = require('axios');

let arg = process.argv.slice(-1)[0];

cat = (path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(`${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(`${url}`);
        if(res) console.log(res.data);
      } catch(err) { console.log(`${err}`) }
}

// check if string is valid url
// https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
isUrl = (str) => {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(str) && !str.endsWith('txt');
}

if(isUrl(arg)) webCat(arg);
else cat(arg);