const fs = require('fs');
const axios = require('axios');

writeCat = (input, output, data) => {
    fs.writeFile(output, data, (err) => {
        if(err){ console.log(`${err}`); process.exit(1); }
        else console.log(`no output, but ${output} contains contents of ${input}`);
    });
}

cat = (path, output=null) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){ console.log(`${err}`); process.exit(1); }
        if(output) writeCat(path, output, data);
        else console.log(data);
    });
}

async function webCat(url, output=null) {
    try {
        let res = await axios.get(`${url}`);
        if(res) {
            if(output) writeCat(url, output, res.data);
            else console.log(res.data);
        }
      } catch(err) { console.log(`${err}`); process.exit(1); }
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
    let output;
    for(let arg of process.argv)
        if(arg === '--out'){ 
            output = process.argv[process.argv.length - 2]
            break; 
        }
    let input = process.argv.slice(-1)[0];
    if(isUrl(input)) webCat(input, output);
    else cat(input, output);
}

main();




