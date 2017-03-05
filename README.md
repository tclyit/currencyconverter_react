# currencyconverter_react
`React` currency converter component (widget)

What inside this README:

1. Description
2. Terminal Commands
3. TO DO next 
4. Setup
5. Demo

Description:
This small project is about currency converter based on API rate source on `Fixer.io`.
- Uses `React` library - [Link](https://facebook.github.io/react/)
- Build system setup with Webpack
- This app converts currency from 'CAD, USD, EUR' to 'CAD, USD, EUR' rate
- This component `widget` can be plugged into any other page or component in the project

Terminal Commands:
- `npm install` -- Install all dependencies
- `npm start` -- Run app on localhost:8000 and watches for changes

TO DO next:
- Add more currency rate option
- Improve responsive widget
- Implement HTML template using AEM Sightly/HTL (use mock references to a Sling model and i18n labels)
- Improving performance and load
- Test for data, REST API and React components
- Improve state changes using `Flux` pattern
- Work with `Webpack` to have clean environment for `Production`

Setup:

1. Clone the project from `github`

2. Run `npm install` and make sure that all dependencies installed
   - To verify everything works you can test by running `npm start` commands and viewing on localhost:8000

3. To deploy to production for local testing:
   - The file in the `dist` folder is closed to production file which you can copy and test anywhere you want to.
   - To test with XAMPP, copy `dist` folder into `C:\xampp\htdocs` (or any path you use XAMPP) folder and rename `dist` folder to `currencyconverter_react` or any name you like and that is it.
   - It is time to test currency converter.
   - `When you input the currency number into the box then the rate will calculate and show in the converted rate box below.`

Demo:
 [Click here](https://tclyit.github.io/currencyconverter_react)
