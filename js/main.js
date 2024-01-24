var currentScript;
var startBttn;
var loader = 'js/loader.js';
var lesson1 = 'js/lesson1.js';
var lesson2 = 'js/lesson2.js';

loadScript(loader, function () {
  currentScript =  loadScript(lesson1, function () {
  });
});

function loadScript(src, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
  return script;
}