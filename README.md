# UMD Libraries Primo UI Customization

This repository contains customization code for the University of Maryland Libraries' Primo discovery interface (UMD Discover). The customizations enhance the user experience with additional features, branding, and integrations specific to UMD Libraries.

## Overview

This project provides a comprehensive set of modules that customize various aspects of the Primo interface, including:

- University branding and header integration
- Chat widget for library support
- Enhanced search functionality
- Custom no-results page
- Loan management features
- And more

## Repository Structure

```
repo/
  umd-libraries/            # Main customization files
    js/
      custom.js             # Main JavaScript file with all module integrations
    css/
      custom1.css.          # Main stylesheet for all customizations
  modules/                  # Individual feature modules (see modules/readme.md)
    umd-universal-header/
    libchat-chat-widget/
    search-branding-customization/
    external-search/
    no-results-page/
    item-page-report-issue/
    loan-overview/
    page-title-updater/
  readme.md                # This file
```

## Features

### 1. UMD Universal Header

Integrates the university-wide UMD header with shadow DOM implementation, including:

- University branding and logo
- Alert system for campus-wide announcements
- Mobile-responsive navigation
- "Make a Gift" link integration

### 2. LibChat Chat Widget

Real-time chat support integration with:

- Live status monitoring (online/offline)
- Expandable/collapsible interface
- Auto-reload functionality for optimal connectivity
- Status indicators

### 3. Search Branding Customization

Custom branding for the search interface:

- UMD Discover logo integration
- Custom layout adjustments for search components
- Responsive design for various screen sizes
- Scope filtering customizations

### 4. External Search Integration

Adds external search options to Primo:

- WorldCat UMD integration
- Custom facet for external searches
- Dynamic search query mapping

### 5. Enhanced No-Results Page

Improved user experience when searches return no results:

- Helpful search tips and strategies
- Links to additional resources
- Subject specialist contact information
- WorldCat search suggestions

### 6. Item Page Report Issue

Allows users to report problems with catalog items:

- Pre-populated survey integration
- Automatic capture of item metadata (MMS ID, title, URL)
- Easy submission workflow

### 7. Loan Overview

Comprehensive loan management interface:

- View all loans across multiple institutions
- Loan status indicators (due today, overdue, etc.)
- Interactive dialog with loan statistics
- Auto-fetch loan data from multiple sources

### 8. Page Title Updater

Automatically updates browser tab titles:

- Replaces "Ex Libris Discovery" with "UMD Discover"
- Handles dynamic page navigation
- Improves user experience and branding consistency

## Installation

### Prerequisites

- Access to ALMA, with ability to Configure View for Primo
- Ability to upload custom JavaScript and CSS files

### Steps

1. Choose the modules you want to install.

2. Integrate the selected modules into custom.js.

Structure of custom.js:

```
(function () {
    "use strict";

    // Use an empty dependency array (or list required modules).
    // An empty string will cause "Module '' is not available" errors.
    var app = angular.module("viewCustom", []);

    // ----- modules -----
    // Insert module registration and initialization here
    // ----- end modules -----
})();
```

3. Copy existing styles or create your own and save them as css/custom1.css.

4. Prepare the deployment package.

- Replace the colon in the view code with a hyphen. Example:

  - View code: `01USMAI_UMCP:ui_test`
  - Folder name: `01USMAI_UMCP-ui_test`

- Folder structure:

```
01USMAI_UMCP-ui_test/
    js/
        custom.js          # All modules combined
    css/
        custom1.css        # All styles combined
```

- From the terminal, navigate to the parent directory that contains `01USMAI_UMCP-ui_test` and run:

```bash
zip -r 01USMAI_UMCP-ui_test 01USMAI_UMCP-ui_test -x "*.DS_Store"
```

You will get a ZIP file after this command completes.

5. Upload to Alma

- In Alma: go to Configure Views, select the target view, open Manage Customization Package, upload the ZIP file, and click Save. The customization will be loaded.

## Development

### Module Structure

Each module is developed independently in the `modules/` directory with its own readme and documentation. The main `custom.js` file integrates all modules into a single deployment file.

For detailed information about individual modules, see [modules/readme.md](modules/readme.md).

### Making Changes

1. **Modify individual modules** in the `modules/` directory
2. **Update the main custom.js** file in `umd-libraries/js/` with your changes
3. **Update styles** in `umd-libraries/css/custom1.css`
4. **Test thoroughly** before deploying to production
5. **Document changes** in module-specific readme files

### Adding New Modules

1. Create a new directory in `modules/` with your module name
2. Add a readme.md explaining the module's purpose and functionality
3. Develop your module code
4. Integrate the module into `umd-libraries/js/custom.js`
5. Add corresponding styles to `umd-libraries/css/custom1.css`
6. Update this readme and `modules/readme.md` with the new module information

## Contributing

When contributing to this repository:

1. Create a feature branch for your changes
2. Document your changes thoroughly
3. Test in a development environment
4. Submit a pull request with a clear description
5. Update relevant readme files

## Support

For questions or issues:

- Contact UMD Libraries
- Check individual module readme files for specific documentation
- Review Primo customization documentation from Ex Libris

---

Last updated: October 2025
