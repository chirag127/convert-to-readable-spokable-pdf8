# Changelog

All notable changes to Spokable PDF will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-19

### Added

-   Initial release of Readable Spokable PDF Converter
-   Core PDF to Spokable PDF conversion functionality
-   Google Gemini API integration (3.0, 2.5, 2.0 series models)
-   Client-side PDF text extraction using PDF.js
-   Intelligent content detection (code, tables, math, general text)
-   Batch processing with configurable batch sizes
-   Turbo Mode for parallel API requests
-   Dark mode with persistent preference
-   Comprehensive settings page with:
    -   API key management (primary and backup)
    -   Model selection
    -   Performance tuning (batch size, turbo mode, retries)
    -   Customizable transformation prompts
    -   PDF output styling options
-   Rate limit handling with exponential backoff
-   Automatic failover to backup API key
-   Real-time progress tracking with detailed status
-   Drag and drop file upload
-   Interactive welcome walkthrough
-   Complete documentation:
    -   About page
    -   FAQ page
    -   Pricing page
    -   Contact page
    -   Privacy Policy
    -   Terms of Service
-   LocalStorage for settings persistence
-   IndexedDB for file storage during processing
-   Responsive design for mobile and desktop
-   Accessibility features (ARIA labels, keyboard navigation)
-   Error handling and user-friendly error messages
-   Download processed PDFs with "\_spokable" suffix

### Technical Features

-   100% client-side processing (no backend required)
-   Pure vanilla JavaScript (ES6+ modules)
-   Modern CSS with custom properties
-   Modular architecture for maintainability
-   CDN-based dependencies (PDF.js, jsPDF)
-   Static hosting compatible (GitHub Pages, Vercel, Netlify)

### Documentation

-   Comprehensive README.md
-   Deployment guide (DEPLOYMENT.md)
-   Contributing guidelines (CONTRIBUTING.md)
-   MIT License
-   PowerShell start script for Windows development

## [Unreleased]

### Planned Features

-   OCR support for scanned PDFs
-   Image description generation using Gemini Vision
-   Multiple output formats (EPUB, TXT, DOCX)
-   Batch file processing (multiple PDFs at once)
-   Progress persistence (resume interrupted processing)
-   Cloud storage integration (Google Drive, Dropbox)
-   Progressive Web App (PWA) support
-   Multi-language interface support
-   Advanced PDF styling (fonts, colors, layouts)
-   Custom CSS themes
-   Keyboard shortcuts
-   Export/import settings
-   Processing history
-   Cost estimation before processing
-   Partial download of processed content
-   Browser extension version

### Known Issues

-   Scanned PDFs (image-based) not supported without OCR
-   Very large PDFs (500+ pages) may cause memory issues
-   Some complex table layouts may not convert optimally
-   Mathematical equations in LaTeX format need improvement

---

## Version History

### Version Numbering

-   **Major version** (X.0.0): Breaking changes or major new features
-   **Minor version** (1.X.0): New features, backwards compatible
-   **Patch version** (1.0.X): Bug fixes and minor improvements

### Release Schedule

-   Major releases: As needed for significant features
-   Minor releases: Monthly or as features are completed
-   Patch releases: As needed for bug fixes

---

For detailed commit history, see [GitHub Commits](https://github.com/chirag127/spokable-pdf/commits/main)
