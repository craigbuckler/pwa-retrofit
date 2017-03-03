# PWA retrofit

Progressive Web Apps are *progressive enhancements*. Supported browsers can offer installation and offline functionality but unsupported browsers still get the full online experience.

The technology is typically used for web apps but can be applied to any website as demonstrated here.


## Usage
Ensure [Node.js](https://nodejs.org/) is installed then start the web server with:

    node ./server.js [port]

`[port]` is optional and defaults to 8888.

Load the demonstration home page at [http://localhost:8888/](http://localhost:8888/) (or which ever port you specified). Recommendations:

1. Use Chrome or another Blink-based browser.
1. Open a new incognito tab/window. This will ensure nothing remains cached while you are testing.
1. Open the Developer Tools and View the **Application** tab.
1. Check **Offline** in the Service Workers section and browse to another page.
1. Connect an Android smartphone via USB and attempt remote debugging.
