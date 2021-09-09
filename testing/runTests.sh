echo "Building..."
cd testing
npm start

echo "Installing npm package"
npm install https://github.com/pieromqwerty/amtrak
echo "Running tests"
node dist/testAll.js