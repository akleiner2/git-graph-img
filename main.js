const page = require("webpage").create()
const system = require("system");

if (system.args.length < 3) {
  console.log("Proper usage: phantomjs `main.js` <username> <output_file>");
  phantom.exit();
}

const user = system.args[1];
const output = system.args[2];
const GH_URL = "http://github.com/" + user;

const selector = ".js-calendar-graph";

page.open(GH_URL, function(status) {
  const rect = page.evaluate(function(s) {
    return document.querySelector(s).getBoundingClientRect();
  }, selector);

  page.clipRect = rect;
  page.render(output);

  phantom.exit();
});
