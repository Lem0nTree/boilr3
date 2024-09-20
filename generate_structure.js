const fs = require('fs');
const path = require('path');

const excludedDirs = ['.git', 'node_modules','.next'];

function generateDirectoryStructure(startPath, output = '', depth = 0) {
    const files = fs.readdirSync(startPath)
        .filter(file => !excludedDirs.includes(file));

    files.forEach((file, index) => {
        const filePath = path.join(startPath, file);
        const stats = fs.statSync(filePath);
        const isLast = index === files.length - 1;

        if (stats.isDirectory()) {
            output += '│   '.repeat(depth);
            output += (isLast ? '└── ' : '├── ') + file + '/\n';
            output = generateDirectoryStructure(filePath, output, depth + 1);
        } else {
            output += '│   '.repeat(depth);
            output += (isLast ? '└── ' : '├── ') + file + '\n';
        }
    });

    return output;
}

function writeStructureToFile(structure, outputPath) {
    fs.writeFileSync(outputPath, structure);
    console.log(`Directory structure has been written to ${outputPath}`);
}

// Usage
const projectRoot = process.argv[2] || '.'; // Use provided path or current directory
const outputFile = 'directory_structure.txt';

const structure = generateDirectoryStructure(projectRoot);
writeStructureToFile(structure, outputFile);