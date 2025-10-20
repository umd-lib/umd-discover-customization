# External Search Module

## Overview

The External Search Module adds external search options to the top of the Primo facet sidebar, providing users with alternative search sources when they can't find what they need in the primary catalog.

## Features

- **Custom Facet Group**: Adds "Can't find what you need?" facet section
- **External Search Links**: Links to WorldCat UMD and other external catalogs
- **Query Mapping**: Automatically maps Primo queries to external search formats
- **Dynamic Injection**: Adds facet at runtime using interval polling
- **Navigation Persistence**: Maintains external search across page navigation

## Configuration

### Filter box name

Replace every instance of "Can't find what you need?" in the module with the intended filter box name.

### Filter option

The module currently offers an option that directs users to WorldCat. To update it:

1. Update the option name — replace the value of the "name" field.
2. Update the option link — replace the value of the "url" field.

Make sure to preserve the configuration structure and quoting when editing these values.
