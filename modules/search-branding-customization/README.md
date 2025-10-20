# Search Branding Customizations Module

## Overview

The Search Branding Customizations Module enhances the Primo search interface, adding the branding logo to the side of the search bar.

## Features

- **Custom Logo Integration**: Adds branding logo to search interface
- **Responsive Layout**: Adjusts flex layouts for different screen sizes

## Configuration

### Logo Link Path

Update the two variables in the module to match your institution code and Primo view (if used), ensuring the correct paths are implemented.

- `LocalViewID` = "01USMAI_UMCP:UMCP"
- `LocalViewPath` = "/discovery/custom/01USMAI_UMCP"

### Logo Implementation

1. Prepare your logo in SVG format and open it using a plain text editor (such as TextEdit on MacOS). You'll see XML code similar to this example:
   `<?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.92 17.74"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><path class="cls-1" d="m7.65,12.59L18.51,0l.41,5.21-10.69,12.52-.24-.2-.12.14L0,11.25l4.8-.99,2.85,2.32Z"/></svg>`

2. Copy the SVG source from your SVG file, visit the URL Encoder site at [URL Encoder](https://yoksel.github.io/url-encoder/), and paste the SVG into the `Insert SVG:` field.

3. Copy the text from the "Ready for CSS:" field and replace "background-image" corresponding line in the CSS file.
