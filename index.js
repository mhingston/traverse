const fs = require('fs');
const path = require('path');
const util = require('util');
const readDir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const flatten = (array) => array.reduce((accumulator, currentValue) => accumulator.concat(Array.isArray(currentValue) ? flatten(currentValue) : currentValue), []);

const traverse = (pathName) =>
{
    return new Promise(async (resolve, reject) =>
    {
        const stats = await stat(pathName);
    
        if(stats.isDirectory())
        {
            const fso = await readDir(pathName);
            const tasks = [];
            fso.forEach((value) => tasks.push(traverse(path.join(pathName, value))));
            let results = await Promise.all(tasks);
            results = flatten(results);
            return resolve(results);
        }
    
        else if(stats.isFile())
        {
            return resolve(pathName);
        }
    });
};

module.exports = traverse;