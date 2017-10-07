# traverse

Recursively traverse a directory returning the paths of all files within the directory.

## Installation

    npm install mhingston/traverse
    
## Usage

```javascript
const traverse = require('traverse');
traverse('/some/path/name')
.then((files) => console.log(files));
