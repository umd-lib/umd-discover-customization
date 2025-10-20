# Item Page Report Issue Module

## Overview

The Report Issue module provides a convenient way for users to report problems with items in Primo by generating pre-populated survey links using item metadata.

It adds a "Report an Issue" section to the item page. The linked survey is pre-populated with data from that item.

## Features

- **Automatic data extraction**: Captures MMS ID, title, and URL from the item page
- **Survey pre-population**: Generates a Qualtrics survey link populated with item metadata
- **Retry logic**: Retries when necessary to retrieve the item title
- **Clean URL generation**: Strips unnecessary parameters for cleaner reporting
- **Error handling**: Provides graceful fallbacks if data extraction fails

## Configuration

### Survey link

We recommend using Qualtrics, which supports field pre-population via URL parameters. Replace the `baseUrl` value with your survey link.

### Populated fields

Locate the corresponding field names or IDs in your Qualtrics survey, and update the module's `responseData` mapping accordingly.
