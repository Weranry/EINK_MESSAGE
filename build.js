const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting build process...');

// Ensure required directories exist
const requiredDirs = ['api', 'public', 'lib'];
requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating ${dir} directory...`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Check if canvas-prebuilt is installed, if not, install it
try {
  require.resolve('canvas-prebuilt');
  console.log('canvas-prebuilt is already installed.');
} catch (e) {
  console.log('Installing canvas-prebuilt...');
  execSync('npm install canvas-prebuilt', { stdio: 'inherit' });
}

// Copy necessary files to the public directory
const filesToCopy = ['index.html', 'styles.css'];
filesToCopy.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  const destPath = path.join(__dirname, 'public', file);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${file} to public directory.`);
  } else {
    console.warn(`Warning: ${file} not found in root directory.`);
  }
});

// Generate a build info file
const buildInfo = {
  buildDate: new Date().toISOString(),
  nodeVersion: process.version,
  dependencies: JSON.parse(fs.readFileSync('package.json')).dependencies
};

fs.writeFileSync('public/build-info.json', JSON.stringify(buildInfo, null, 2));
console.log('Generated build-info.json');

// Run any additional build steps (e.g., transpiling, bundling)
console.log('Running additional build steps...');
// Add your custom build commands here, for example:
// execSync('npm run transpile', { stdio: 'inherit' });
// execSync('npm run bundle', { stdio: 'inherit' });

console.log('Build process completed successfully.');