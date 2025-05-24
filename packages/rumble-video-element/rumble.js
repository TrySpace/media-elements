!function (r, u, m, b, l, e) { r._Rumble = b, r[b] || (r[b] = function () { (r[b]._ = r[b]._ || []).push(arguments); if (r[b]._.length == 1) { l = u.createElement(m), e = u.getElementsByTagName(m)[0], l.async = 1, l.src = "https://rumble.com/embedJS/ut38jj" + (arguments[1].video ? '.' + arguments[1].video : '') + "/?url=" + encodeURIComponent(location.href) + "&args=" + encodeURIComponent(JSON.stringify([].slice.apply(arguments))), e.parentNode.insertBefore(l, e) } }) }(window, document, "script", "Rumble");


/**
 * Initializes the Rumble video player integration
 * @param {Window} window - The global window object
 * @param {Document} document - The document object
 * @param {string} scriptTag - The HTML tag name for script elements
 * @param {string} rumbleName - The name to use for the global Rumble function
 */
function initializeRumble(window, document, scriptTag, rumbleName) {
  // Store the Rumble name globally
  window._Rumble = rumbleName;

  // Only initialize if Rumble hasn't been initialized yet
  if (!window[rumbleName]) {
    window[rumbleName] = function () {
      // Store arguments for later use
      (window[rumbleName]._ = window[rumbleName]._ || []).push(arguments);

      // Only load the script once
      if (window[rumbleName]._.length === 1) {
        // Create and configure the script element
        const scriptElement = document.createElement(scriptTag);
        const firstScript = document.getElementsByTagName(scriptTag)[0];
        scriptElement.async = 1;

        // Build the script source URL with video parameters
        scriptElement.src = "https://rumble.com/embedJS/ut38jj" +
          (arguments[1].video ? '.' + arguments[1].video : '') +
          "/?url=" + encodeURIComponent(location.href) +
          "&args=" + encodeURIComponent(JSON.stringify([].slice.apply(arguments)));

        // Insert the script into the document
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
      }
    };
  }
}

// Initialize Rumble with required parameters
initializeRumble(window, document, "script", "Rumble");