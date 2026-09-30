const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else if (dirPath.endsWith('.tsx')) {
            callback(dirPath);
        }
    });
}

const replaceClasses = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace hardcoded values with base global tokens
    content = content.replace(/\brounded-(?:2xl|3xl)\b/g, 'rounded-base');
    content = content.replace(/\bshadow-2xl\b/g, 'shadow-premium-light');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
};

const appDir = path.join(process.cwd(), 'app');
const compDir = path.join(process.cwd(), 'components');

walkDir(appDir, replaceClasses);
walkDir(compDir, replaceClasses);
console.log('Refactoring complete.');
