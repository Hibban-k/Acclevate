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
    
    // Remove font-heading and font-sans classes as they are now global
    content = content.replace(/\s+font-heading\b/g, '');
    content = content.replace(/\bfont-heading\s+/g, '');
    content = content.replace(/\s+font-sans\b/g, '');
    content = content.replace(/\bfont-sans\s+/g, '');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
};

const appDir = path.join(process.cwd(), 'app');
const compDir = path.join(process.cwd(), 'components');

walkDir(appDir, replaceClasses);
walkDir(compDir, replaceClasses);
console.log('Font cleanup complete.');
