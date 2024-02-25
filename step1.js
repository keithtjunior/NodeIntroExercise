const fs = require('fs');

cat = (path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(`${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}
cat(process.argv.slice(-1)[0]);