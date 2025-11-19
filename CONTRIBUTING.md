# Contributing to Spokable PDF

Thank you for your interest in contributing to Spokable PDF! This document provides guidelines and instructions for contributing.

## Code of Conduct

-   Be respectful and inclusive
-   Provide constructive feedback
-   Focus on what is best for the community
-   Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

-   **Clear title and description**
-   **Steps to reproduce**
-   **Expected behavior**
-   **Actual behavior**
-   **Screenshots** (if applicable)
-   **Browser and OS version**
-   **Console errors** (if any)

Example:

```markdown
**Bug**: PDF processing fails on large files

**Steps to Reproduce**:

1. Go to home page
2. Upload a 200-page PDF
3. Click "Process PDF"
4. Observe error after 50% progress

**Expected**: PDF should process completely
**Actual**: Error "Processing failed" appears

**Environment**:

-   Browser: Chrome 120
-   OS: Windows 11
-   File size: 15MB
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

-   **Clear title and description**
-   **Use case** - why is this enhancement useful?
-   **Proposed solution**
-   **Alternative solutions** considered
-   **Mockups or examples** (if applicable)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**

    ```bash
    git checkout -b feature/amazing-feature
    ```

3. **Make your changes**

    - Follow the coding standards (see below)
    - Add comments for complex logic
    - Update documentation if needed

4. **Test your changes**

    - Test in multiple browsers (Chrome, Firefox, Safari, Edge)
    - Test dark mode
    - Test with various PDF files
    - Check console for errors

5. **Commit your changes**

    ```bash
    git commit -m "Add amazing feature"
    ```

    Use clear commit messages:

    - `feat: Add OCR support for scanned PDFs`
    - `fix: Resolve rate limit handling bug`
    - `docs: Update README with new examples`
    - `style: Format code with prettier`
    - `refactor: Simplify batch processing logic`

6. **Push to your fork**

    ```bash
    git push origin feature/amazing-feature
    ```

7. **Open a Pull Request**
    - Provide clear description of changes
    - Reference related issues
    - Include screenshots for UI changes

## Coding Standards

### JavaScript

-   Use ES6+ features (const, let, arrow functions, async/await)
-   Use modules (import/export)
-   Follow existing code style
-   Add JSDoc comments for functions

```javascript
/**
 * Processes a PDF file and converts it to spokable format
 * @param {File} file - The PDF file to process
 * @param {Object} settings - Processing settings
 * @returns {Promise<Object>} Processing result with doc and metadata
 */
async function processPDF(file, settings) {
    // Implementation
}
```

### CSS

-   Use CSS custom properties (variables)
-   Follow BEM naming convention where applicable
-   Keep selectors specific but not overly nested
-   Group related properties

```css
/* Good */
.feature-card {
    background-color: var(--surface-color);
    border-radius: var(--radius-lg);
    padding: 2rem;
}

/* Avoid */
.container .section .card .title {
    /* Too nested */
}
```

### HTML

-   Use semantic HTML5 elements
-   Include ARIA labels for accessibility
-   Keep structure clean and readable
-   Use meaningful IDs and classes

```html
<!-- Good -->
<button id="processBtn" class="btn btn-primary" aria-label="Process PDF">
    Process PDF
</button>

<!-- Avoid -->
<div onclick="process()">Process</div>
```

## Project Structure

```
spokable-pdf/
├── index.html              # Main page
├── settings.html           # Settings page
├── [other-pages].html      # Additional pages
├── css/
│   ├── main.css           # Core styles
│   ├── components.css     # Component styles
│   └── dark-mode.css      # Dark mode overrides
├── js/
│   ├── config.js          # Constants and configuration
│   ├── storage.js         # Storage management
│   ├── ui-manager.js      # UI utilities
│   ├── gemini-api.js      # API client
│   ├── pdf-engine.js      # PDF processing
│   ├── app.js             # Main app logic
│   └── settings.js        # Settings page logic
└── README.md
```

## Development Workflow

### Setting Up Development Environment

1. Clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/spokable-pdf.git
cd spokable-pdf
```

2. Start local server:

```bash
# Using Python
python -m http.server 8000

# Using PowerShell script
.\start-server.ps1
```

3. Open browser to `http://localhost:8000`

### Testing

Before submitting a PR, test:

-   [ ] All pages load without errors
-   [ ] Dark mode works on all pages
-   [ ] PDF upload and processing works
-   [ ] Settings save and load correctly
-   [ ] Error handling works properly
-   [ ] Works in Chrome, Firefox, Safari, Edge
-   [ ] Mobile responsive design works
-   [ ] No console errors

### Adding New Features

When adding a new feature:

1. **Plan the feature**

    - What problem does it solve?
    - How will it work?
    - What are the edge cases?

2. **Update documentation**

    - Add to README if user-facing
    - Add JSDoc comments
    - Update FAQ if needed

3. **Consider backwards compatibility**

    - Will existing settings still work?
    - Do we need migration logic?

4. **Test thoroughly**
    - Test with various inputs
    - Test error conditions
    - Test on different browsers

## Areas for Contribution

### High Priority

-   [ ] OCR support for scanned PDFs
-   [ ] Better error messages and recovery
-   [ ] Progress persistence (resume interrupted processing)
-   [ ] Batch file processing
-   [ ] Export to multiple formats (EPUB, TXT)

### Medium Priority

-   [ ] Improved content detection algorithms
-   [ ] Custom CSS themes
-   [ ] Keyboard shortcuts
-   [ ] Accessibility improvements
-   [ ] Performance optimizations

### Low Priority

-   [ ] Additional language support
-   [ ] Cloud storage integration
-   [ ] PWA support
-   [ ] Advanced PDF styling options

## Documentation

When updating documentation:

-   Use clear, concise language
-   Include code examples
-   Add screenshots for UI features
-   Keep README.md up to date
-   Update CHANGELOG.md

## Questions?

-   Open an issue for discussion
-   Email: chiragsinghal127@gmail.com
-   Check existing issues and discussions

## Recognition

Contributors will be recognized in:

-   README.md contributors section
-   Release notes
-   GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Spokable PDF! 🎉
