# Tab Title Updater Utility Module

## Overview

The Tab Title Updater provides functions that run throughout the application lifecycle. It dynamically updates the browser tab title to replace generic Primo branding with library-specific branding. It also appends the current search term to the branding on the search results page (for example, "UMD Discover — search term").

## Features

- **Dynamic title updates**: Replaces the default "Ex Libris Discovery" title with your library branding (e.g., "UMD Discover").
- **Multiple detection methods**: Uses event listeners and observers to detect title changes.
- **History API integration**: Integrates with browser navigation events to update titles after navigation.
- **MutationObserver**: Monitors DOM changes that affect the document title.
- **Automatic execution**: Initializes automatically when the module loads.

## Configuration

### Primo branding name

Set the branding name (for example, "UMD Discover") in the module to match your Primo installation.
