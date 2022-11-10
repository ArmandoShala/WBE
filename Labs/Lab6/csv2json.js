function csv2json() {
    const fs = require('fs');
    const filename = process.argv[2];
    const statSync = fs.statSync(filename);
    const start = new Date();
    const lines = fs.readFileSync(filename, 'utf8').split('\n');
    const end = new Date();
    const stats = {
        size: statSync.size,
        birthtime: statSync.birthtime,
        lastModified: statSync.mtime,
        atime: statSync.atime,
        fileSizeInMegabytes : statSync.size / 1000000.0,
        numberOfLines: lines.length,
        timeToReadInMs: end - start
    };

    console.table(stats);

    const headers = lines[0].split(',');
    const result = lines.slice(1).map(line => {
        const obj = {};
        const currline = line.split(',');
        headers.forEach((header, i) => obj[header] = currline[i]);
        return obj;
    })
    require('fs').writeFile(process.argv[3], JSON.stringify(result), 'utf8', function (err) {
        if (err) console.error(err);
        console.log('File successfully saved');
    });
}

csv2json(); 
