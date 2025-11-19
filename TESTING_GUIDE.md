# Testing Guide

Comprehensive testing guide for Spokable PDF application.

## Manual Testing Checklist

### 1. Initial Load Testing

#### Home Page (index.html)

-   [ ] Page loads without errors
-   [ ] Navigation bar displays correctly
-   [ ] Logo and branding visible
-   [ ] Dark mode toggle present
-   [ ] Welcome walkthrough appears (first visit)
-   [ ] Drop zone is visible and styled
-   [ ] Feature cards display correctly
-   [ ] Footer links work

#### Settings Page (settings.html)

-   [ ] Page loads without errors
-   [ ] All form fields are present
-   [ ] Model dropdown shows all 5 models
-   [ ] Sliders work correctly
-   [ ] Checkboxes toggle properly
-   [ ] Save button is functional
-   [ ] Reset button works

#### Other Pages

-   [ ] About page loads and displays content
-   [ ] FAQ page loads with all questions
-   [ ] Pricing page shows pricing table
-   [ ] Contact page displays contact form
-   [ ] Privacy page shows policy
-   [ ] Terms page shows terms

### 2. Dark Mode Testing

-   [ ] Toggle switches between light and dark
-   [ ] Preference persists after page reload
-   [ ] All pages respect dark mode setting
-   [ ] Colors are readable in both modes
-   [ ] Icons change appropriately (sun/moon)
-   [ ] No visual glitches during transition

### 3. File Upload Testing

#### Drag & Drop

-   [ ] Drop zone highlights on drag over
-   [ ] PDF file can be dropped
-   [ ] Non-PDF files are rejected
-   [ ] File info displays after drop
-   [ ] File name shows correctly
-   [ ] File size displays correctly

#### Click to Browse

-   [ ] Click on drop zone opens file picker
-   [ ] Click on "Choose File" button works
-   [ ] File picker filters to PDF only
-   [ ] Selected file displays info

### 4. Settings Testing

#### API Configuration

-   [ ] API key input accepts text
-   [ ] API key is masked (password field)
-   [ ] Backup API key field works
-   [ ] Model selection dropdown works
-   [ ] Selected model is saved

#### Performance Settings

-   [ ] Batch size slider moves smoothly
-   [ ] Batch size value updates in real-time
-   [ ] Turbo mode checkbox toggles
-   [ ] Max retries accepts numbers only
-   [ ] Values are saved correctly

#### Prompt Customization

-   [ ] All 4 prompt textareas are editable
-   [ ] Default prompts load correctly
-   [ ] Custom prompts are saved
-   [ ] Prompts persist after reload

#### PDF Styling

-   [ ] Font size accepts valid numbers
-   [ ] Line height accepts decimals
-   [ ] Margin size accepts numbers
-   [ ] Values are saved and loaded

#### Save/Reset

-   [ ] Save button shows success notification
-   [ ] Settings persist after page reload
-   [ ] Reset button shows confirmation
-   [ ] Reset restores default values

### 5. PDF Processing Testing

#### Prerequisites

-   [ ] API key is configured
-   [ ] Valid PDF file is selected

#### Processing Flow

-   [ ] Click "Process PDF" starts processing
-   [ ] Drop zone hides
-   [ ] Progress section appears
-   [ ] Progress bar animates
-   [ ] Percentage updates (0-100%)
-   [ ] Stage text updates correctly
-   [ ] Details text shows batch info
-   [ ] Cancel button is visible

#### Progress Stages

-   [ ] "Initializing..." appears first
-   [ ] "Extracting text from PDF..." shows
-   [ ] "Creating processing batches..." displays
-   [ ] "Processing with Gemini AI..." appears
-   [ ] Batch progress shows (e.g., "Processing batch 3 of 10")
-   [ ] "Generating spokable PDF..." displays
-   [ ] "Conversion complete!" shows at end

#### Completion

-   [ ] Progress section hides
-   [ ] Resultears
-   [ ] Success icon displays
-   [ ] Success message shows batch count
-   [ ] Download button is enabled
-   [ ] "Process Another" button works

### 6. Error Handling Testing

#### No API Key

-   [ ] Error message appears
-   [ ] User is redirected to settings
-   [ ] Clear error message displayed

#### Invalid PDF

-   [ ] Error message for corrupted PDF
-   [ ] Error message for non-PDF file
-   [ ] Error message for empty file

#### API Errors

-   [ ] Rate limit error shows retry message
-   [ ] Network error shows appropriate message
-   [ ] Invalid API key shows error
-   [ ] Failover to backup key works

#### Cancellation

-   [ ] Cancel button stops processing
-   [ ] UI resets to initial state
-   [ ] No errors in console

### 7. Download Testing

-   [ ] Download button triggers download
-   [ ] File name has "\_spokable" suffix
-   [ ] Downloaded PDF opens correctly
-   [ ] Content is readable
-   [ ] Formatting is preserved

### 8. Responsive Design Testing

#### Desktop (1920x1080)

-   [ ] Layout is centered
-   [ ] Navigation is horizontal
-   [ ] Cards are in grid layout
-   [ ] All content is visible

#### Tablet (768x1024)

-   [ ] Layout adapts correctly
-   [ ] Navigation remains functional
-   [ ] Cards stack appropriately
-   [ ] Touch interactions work

#### Mobile (375x667)

-   [ ] Layout is single column
-   [ ] Navigation is accessible
-   [ ] Buttons are touch-friendly
-   [ ] Text is readable
-   [ ] No horizontal scrolling

### 9. Browser Compatibility Testing

#### Chrome

-   [ ] All features work
-   [ ] No console errors
-   [ ] Performance is good

#### Firefox

-   [ ] All features work
-   [ ] No console errors
-   [ ] Performance is good

#### Safari

-   [ ] All features work
-   [ ] No console errors
-   [ ] Performance is good

#### Edge

-   [ ] All features work
-   [ ] No console errors
-   [ ] Performance is good

### 10. Performance Testing

#### Small PDF (10 pages)

-   [ ] Extraction completes quickly (<5s)
-   [ ] Processing completes in reasonable time
-   [ ] No memory issues
-   [ ] Download works smoothly

#### Medium PDF (50 pages)

-   [ ] Extraction completes (<15s)
-   [ ] Processing shows progress
-   [ ] Memory usage is acceptable
-   [ ] Download works

#### Large PDF (200 pages)

-   [ ] Extraction completes (<60s)
-   [ ] Processing shows detailed progress
-   [ ] No browser crashes
-   [ ] Download works

### 11. Accessibility Testing

#### Keyboard Navigation

-   [ ] Tab key navigates through elements
-   [ ] Enter key activates buttons
-   [ ] Escape key closes modals (if any)
-   [ ] Focus indicators are visible

#### Screen Reader

-   [ ] ARIA labels are read correctly
-   [ ] Form labels are descriptive
-   [ ] Error messages are announced
-   [ ] Success messages are announced

#### Color Contrast

-   [ ] Text is readable in light mode
-   [ ] Text is readable in dark mode
-   [ ] Links are distinguishable
-   [ ] Buttons have sufficient contrast

### 12. Storage Testing

#### LocalStorage

-   [ ] Settings are saved
-   [ ] Dark mode preference persists
-   [ ] Walkthrough seen flag works
-   [ ] Data survives page reload

#### IndexedDB

-   [ ] Database is created
-   [ ] Files are stored during processing
-   [ ] Files are cleaned up after completion
-   [ ] No orphaned data remains

### 13. Security Testing

-   [ ] API keys are not visible in network tab
-   [ ] API keys are not logged to console
-   [ ] No sensitive data in localStorage (keys are masked)
-   [ ] HTTPS is enforced (on production)
-   [ ] No XSS vulnerabilities
-   [ ] No CSRF vulnerabilities

### 14. Integration Testing

#### PDF.js Integration

-   [ ] Library loads from CDN
-   [ ] Worker loads correctly
-   [ ] Text extraction works
-   [ ] No CORS errors

#### jsPDF Integration

-   [ ] Library loads from CDN
-   [ ] PDF generation works
-   [ ] Fonts render correctly
-   [ ] Download triggers properly

#### Gemini API Integration

-   [ ] API requests are formatted correctly
-   [ ] Responses are parsed correctly
-   [ ] Rate limiting is handled
-   [ ] Retries work as expected

## Automated Testing (Future)

### Unit Tests

```javascript
// Example test structure
describe("PDFExtractor", () => {
    it("should extract text from valid PDF", async () => {
        // Test implementation
    });

    it("should throw error for invalid PDF", async () => {
        // Test implementation
    });
});
```

### Integration Tests

```javascript
describe("PDF Processing Pipeline", () => {
    it("should process PDF end-to-end", async () => {
        // Test implementation
    });
});
```

## Test Data

### Sample PDFs for Testing

1. **Small PDF** (10 pages)

    - Simple text document
    - No code or tables
    - Test basic functionality

2. **Medium PDF** (50 pages)

    - Mix of text and code
    - Some tables
    - Test batch processing

3. **Large PDF** (200 pages)

    - Technical documentation
    - Code blocks, tables, equations
    - Test performance and memory

4. **Complex PDF**
    - Heavy code content
    - Complex tables
    - Mathematical equations
    - Test transformation quality

### Test API Keys

-   Use your own test API key
-   Configure backup key for failover testing
-   Monitor usage in Google AI Studio

## Bug Reporting Template

When a bug is found, report it with:

```markdown
**Bug Description**: Brief description

**Steps to Reproduce**:

1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**: What should happen

**Actual Behavior**: What actually happens

**Environment**:

-   Browser: Chrome 120
-   OS: Windows 11
-   File: sample.pdf (10 pages)

**Console Errors**:
```

Error message here

```

**Screenshots**: [Attach if applicable]
```

## Performance Benchmarks

Track these metrics:

| Metric                | Target | Actual |
| --------------------- | ------ | ------ |
| Page Load Time        | <2s    |        |
| Small PDF Processing  | <30s   |        |
| Medium PDF Processing | <2min  |        |
| Large PDF Processing  | <10min |        |
| Memory Usage (Small)  | <100MB |        |
| Memory Usage (Large)  | <500MB |        |

## Testing Tools

### Browser DevTools

-   Console: Check for errors
-   Network: Monitor API calls
-   Performance: Profile execution
-   Application: Inspect storage

### Online Tools

-   [PageSpeed Insights](https://pagespeed.web.dev/)
-   [WAVE Accessibility](https://wave.webaim.org/)
-   [HTML Validator](https://validator.w3.org/)
-   [CSS Validator](https://jigsaw.w3.org/css-validator/)

## Continuous Testing

After deployment, regularly test:

-   [ ] Weekly: Basic functionality
-   [ ] Monthly: Full regression testing
-   [ ] After updates: Complete test suite
-   [ ] After dependency updates: Integration tests

---

**Last Updated**: November 19, 2025
**Version**: 1.0.0
