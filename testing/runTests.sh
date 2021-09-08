echo "Building..."
npx tsc -p ./src --verbose
cd testing

echo "Installing npm package"
npm install https://github.com/pieromqwerty/amtrak
echo "Running tests"
node dist/testDetching.js