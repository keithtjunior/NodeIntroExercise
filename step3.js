const fs = require('fs');
const axios = require('axios');

let shouldWriteCat = false;
let outputArg;

writeCat = (input, output, data) => {
    fs.writeFile(output, data, (err) => {
        if(err){
            console.log(`${err}`);
            process.exit(1);
        }
        else {
          console.log(`no output, but ${output} contains contents of ${input}`);
        }
    });
}

cat = (path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(`${err}`);
            process.exit(1);
        }
        if(shouldWriteCat) writeCat(path, outputArg, data);
        else console.log(data);
    });
}

async function webCat(url) {
    try {
        let res = await axios.get(`${url}`);
        if(res) {
            if(shouldWriteCat) writeCat(url, outputArg, res.data);
            else console.log(res.data);
        }
      } catch(err) { console.log(`${err}`) }
}

// check if string is valid url
// https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
isUrl = (str) => {
    let urlPattern = new RegExp('^(https?:\\/\\/)'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(str) && !str.endsWith('txt');
}

const main = () => {
    for(let arg of process.argv)
        if(arg === '--out'){ 
            shouldWriteCat = true;
            outputArg = process.argv[process.argv.length - 2]
            break; 
        }
    let inputArg = process.argv.slice(-1)[0];
    if(isUrl(inputArg)) webCat(inputArg);
    else cat(inputArg);
}

main();




