# Springshare Libchat Chat Widget Module

## Overview

The Chat Widget Module provides an improved chat widget embed for Primo, integrating the LibChat service to deliver library support. It includes real-time status monitoring and automatically reloads the iframe to ensure users connect to an available chat session.

## Features

- **Live Status Monitoring**: Checks chat service status every 30 seconds
- **Toggle Interface**: Expandable/collapsible chat widget
- **Status Indicators**: Visual indicators for live/offline status
- **Dynamic Styling**: Updates CSS custom properties based on service status
- **Iframe Integration**: Embeds LibChat chat widget

## Configuration

### Constants

- `serviceURL`: LibChat widget status API endpoint
- `checkInterval`: 30000ms (30 seconds)
- `src`: iframe src for the coresponding chat service from the LibChat

#### Service URL

Replace the Service URL with your institution's LibChat status api endpoint. It can be found using developers' tool.

#### Chat Widget URL

Replace the src in the iframe with your institution's LibChat widget URL.

## Status States

- **live**: Chat service is available
- **offline**: Chat service is unavailable
