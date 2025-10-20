# Primo UI Customization Modules

This directory contains individual modules that customize various aspects of the UMD Libraries Primo interface. Each module is developed independently and can be integrated into the main customization files.

## Overview

The modules are organized into separate directories, each containing:

- Module-specific code (JavaScript/CSS)
- Documentation (README.md)
- Any additional resources

All modules are integrated into the main `/umd-libraries/js/custom.js` and `/umd-libraries/css/custom1.css` files for deployment.

## Available Modules

### 1. UMD Universal Header

**Directory**: `umd-universal-header/`

Implements the university-wide UMD header for Primo using shadow DOM technology.

**Key Features**:

- University branding and logo
- Campus-wide alert system integration
- Mobile-responsive navigation
- "Make a Gift" link
- Shadow DOM encapsulation for style isolation

**Configuration**: Simplified to show only "Make a Gift" option to match UMD Libraries main website

[View Documentation](umd-universal-header/README.md)

---

### 2. Springshare LibChat Chat Widget

**Directory**: `libchat-chat-widget/`

Provides an improved chat widget integration for LibChat service with real-time status monitoring.

**Key Features**:

- Live/offline status monitoring (checks every 30 seconds)
- Expandable/collapsible interface
- Visual status indicators
- Automatic iframe reload for optimal connectivity
- Referer parameter tracking

**Configuration**:

- Set `serviceURL` to your LibChat status API endpoint
- Set iframe `src` to your LibChat widget URL

[View Documentation](libchat-chat-widget/README.md)

---

### 3. Search Branding Customization

**Directory**: `search-branding-customization/`

Adds custom UMD Discover branding to the search interface.

**Key Features**:

- Custom logo integration beside search bar
- Responsive flex layout adjustments
- View-specific branding
- Scope filtering customizations (removes specific scopes)

**Configuration**:

- Update `LocalViewID` and `LocalViewPath` variables
- Replace logo SVG in CSS file
- Use URL encoder for SVG optimization

[View Documentation](search-branding-customization/README.md)

---

### 4. External Search Integration

**Directory**: `external-search/`

Adds external search options (like WorldCat) to the facet sidebar.

**Key Features**:

- Custom "Can't find what you need?" facet
- WorldCat UMD integration
- Dynamic query mapping
- Positioned at top of facet list

**Configuration**:

- Define search targets in `searchTargets` array
- Customize URL mapping functions
- Add/remove external search providers

**Implementation**:

- Uses custom facet injection
- Monitors facet service results
- Applies custom CSS positioning

[View Documentation](external-search/README.md)

---

### 5. No Results Page Customization

**Directory**: `no-results-page/`

Enhances the experience when searches return no results with helpful guidance.

**Key Features**:

- Clear, structured search tips
- Spelling and keyword suggestions
- Search technique guidance (quotes, synonyms, etc.)
- Links to additional resources
- WorldCat search alternative
- Subject specialist directory link

**Implementation**:

- Branded template with helpful content
- Accessibility-focused design

[View Documentation](no-results-page/README.md)

---

### 6. Item Page Report Issue

**Directory**: `item-page-report-issue/`

Allows users to report problems with catalog items through an integrated survey.

**Key Features**:

- Qualtrics survey integration
- Auto-populated item metadata (MMS ID, title, URL)
- Clean URL generation (removes unnecessary parameters)
- Retry logic for dynamic content
- Accessible button interface

**Configuration**:

- Set survey base URL
- Map field IDs (QID13, QID16, QID17)
- Customize survey questions as needed

**Implementation**:

- Component: `prmFullViewServiceContainerAfter`
- Extracts metadata from DOM and URL
- Uses `$timeout` for asynchronous title retrieval

[View Documentation](item-page-report-issue/README.md)

---

### 7. Loan Overview

**Directory**: `loan-overview/`

Provides a comprehensive view of all library loans across multiple institutions.

**Key Features**:

- Modal dialog interface
- Multi-institution support
- Loan statistics (total, overdue, due today)
- API monitoring and data aggregation
- Status indicators (overdue, due today, due soon)
- Loading states with user feedback
- ARIA accessibility features

**Technical Implementation**:

- API interception (fetch and XMLHttpRequest)
- Automatic institution clicking/navigation
- Date parsing and status calculation
- Real-time data aggregation

**User Flow**:

1. Click "View All Loans" button
2. System automatically collects loan data from all institutions
3. Display summary statistics
4. Show detailed loan list by institution
5. Color-coded due dates

[View Documentation](loan-overview/README.md)

---

### 8. Page Title Updater

**Directory**: `page-title-updater/`

Automatically updates browser tab titles for better branding.

**Key Features**:

- Replaces "Ex Libris Discovery" with "UMD Discover"
- Handles dynamic navigation
- Monitors history API (pushState, replaceState)
- Watches for DOM mutations
- Works with hashchange and popstate events

**Implementation**:

- App-level `run` block
- Multiple event listeners
- History API interception
- MutationObserver for DOM changes

[View Documentation](page-title-updater/README.md)

---

## Module Development Guidelines

### Creating a New Module

1. **Create module directory**:

   ```bash
   mkdir modules/your-module-name
   cd modules/your-module-name
   ```

2. **Create README.md**:

   - Module name and purpose
   - Key features
   - Configuration options
   - Implementation details
   - Code examples (if applicable)

3. **Develop module code**:

   - Create separate JS and CSS files for development
   - Follow AngularJS component patterns
   - Use Primo hooks (e.g., `prmComponentNameAfter`)
   - Test independently if possible

4. **Integration**:
   - Add code to `/umd-libraries/js/custom.js`
   - Add styles to `/umd-libraries/css/custom1.css`
   - Update this README
   - Test in Primo environment

### Best Practices

**Code Organization**:

- Keep modules self-contained
- Use clear, descriptive names
- Comment complex logic
- Follow existing code style

**AngularJS Patterns**:

- Use component-based architecture
- Leverage Primo's customization hooks
- Use services for shared functionality
- Inject dependencies properly

**Accessibility**:

- Include ARIA labels
- Ensure keyboard navigation
- Use semantic HTML
- Test with screen readers

**Performance**:

- Minimize DOM manipulation
- Use Angular's digest cycle properly
- Debounce/throttle event handlers
- Load resources efficiently

**Testing**:

- Test in multiple browsers
- Check responsive behavior
- Verify with different user roles
- Test edge cases

## Integration Workflow

### Development to Production

1. **Develop** module in `modules/` directory
2. **Document** in module-specific README.md
3. **Integrate** into main custom.js and custom1.css
4. **Test** in development environment
5. **Deploy** to production via Primo Back Office
6. **Monitor** for issues and user feedback

### File Locations

**Module** (modular):

```
modules/
  module-name/
    README.md
    module.js
    module.css        # (only if needed)
```

Module CSS should be limited to layout and structural styles so modules remain vanilla and reusable by other institutions. Place all UMD Discover–specific styling (branding, colors, typography, and site-specific overrides) in /umd-libraries/css/custom1.css.

Guidelines:

- Module CSS: layout, spacing, positioning, flex/grid, and responsive rules only.
- custom1.css: branding, color palette, fonts, logos, and any institution-specific overrides.
- Avoid global selectors or unexpected overrides in module CSS; scope styles to the module to prevent conflicts.
- Keep modules independent of UMD-specific visual rules so they can be reused across deployments.

**Integration** (integrated):

```
umd-libraries/
  js/
    custom.js          # All modules combined
  css/
    custom1.css        # All styles combined
```

For deployment to Primo, see the "Installation" section in the repository README: [README.md](README.md)

## Common Patterns

Refer to module-specific README files for common patterns, such as component-based AngularJS architecture, scoped module CSS (brand-specific styles belong in custom1.css), use of Primo hooks (e.g., prmComponentNameAfter), and recommended async patterns ($timeout, promises).

### AngularJS Component Hook

```javascript
app.component("prmComponentNameAfter", {
  bindings: { parentCtrl: "<" },
  template: `<div>Your template</div>`,
  controller: "YourController",
});
```

### Service Definition

```javascript
app.factory("yourService", [
  "$interval",
  "$compile",
  "$rootScope",
  function ($interval, $compile, $rootScope) {
    return {
      // Service methods
    };
  },
]);
```

### Controller Pattern

```javascript
app.controller("YourController", [
  "$scope",
  "$timeout",
  function ($scope, $timeout) {
    var ctrl = this;
    ctrl.$onInit = function () {
      // Initialization code
    };
  },
]);
```

## Troubleshooting

### Common Issues

**Module not loading**:

- Check that module is included in custom.js
- Verify component hook name is correct
- Check browser console for errors
- Ensure AngularJS dependencies are available

**Styles not applying**:

- Verify CSS is in custom1.css
- Check CSS specificity
- Look for conflicting styles
- Clear browser cache

**API issues**:

- Check network tab in developer tools
- Verify API endpoints are accessible
- Check CORS settings
- Review API response format

**Timing issues**:

- Use `$timeout` for delayed operations
- Wait for DOM elements to load
- Use promises for async operations
- Consider using `$interval` for polling

## Resources

### Primo Customization

- [Ex Libris Developer Network](https://developers.exlibrisgroup.com/)
- [Primo Customization Package Documentation](https://knowledge.exlibrisgroup.com/)
- [Primo Community](https://el-una.alma.exlibrisgroup.com/)

### AngularJS

- [AngularJS Documentation](https://docs.angularjs.org/)
- [AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)

### Development Tools

- [URL Encoder for SVG](https://yoksel.github.io/url-encoder/)
- Browser DevTools (Chrome, Firefox, Safari)

## Support

For module-specific questions:

- Check individual module README files
- Review code comments in custom.js
- Contact UMD Libraries development team

For general Primo customization:

- Ex Libris support portal
- Primo community forums
- Ex Libris Developer Network

---

Last updated: October 2025
