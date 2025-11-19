# Readable Spokable PDF Converter

Convert technical PDFs into TTS-optimized "Spokable PDFs" using Google Gemini AI.

## 🎯 Problem

Standard PDFs contain code blocks, tables, math equations, and figures that sound like gibberish when read by Text-to-Speech (TTS) engines like Moon+ Reader Pro.

## ✨ Solution

This application uses Google's Gemini API to intelligently transform technical content into natural, conversational language optimized for TTS systems.

## 🚀 Features

-   **AI-Powered Transformation**: Uses Gemini 3.0/2.5/2.0 models to convert technical content
-   **100% Client-Side**: All processing happens in your browser - your files never leave your device
-   **Smart Content Detection**: Automatically identifies code, tables, math notation, and general text
-   **Batch Processing**: Handles large PDFs efficiently with intelligent chunking
-   **Turbo Mode**: Parallel API requests for faster processing
-   **Dark Mode**: Beautiful dark theme with persistent preference
-   **Customizable Prompts**: Tailor AI transformations to your needs
-   **Rate Limit Handling**: Automatic retry with exponential backoff
-   **Failover Support**: Backup API key for seamless rate limit handling

## 🛠️ Tech Stack

-   **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (ES6+ Modules)
-   **AI**: Google Gemini REST API (3.0, 2.5, 2.0 series)
-   **PDF Processing**: PDF.js (extraction), jsPDF (generation)
-   **Storage**: IndexedDB (files), LocalStorage (settings)
-   **Deployment**: Static hosting (GitHub Pages, Vercel, Netlify)

## 📦 Installation

### Option 1: Use Hosted Version

Visit the live application at: [Your deployment URL]

### Option 2: Run Locally

1. Clone the repository:

```bash
git clone https://github.com/chirag127/spokable-pdf.git
cd spokable-pdf
```

2. Serve the files using any static server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open `http://localhost:8000` in your browser

## 🔑 Getting Started

1. **Get API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and create a free API key

2. **Configure Settings**:

    - Go to Settings page
    - Enter your API key
    - Choose your preferred model (Gemini 2.5 Flash recommended)
    - Customize prompts if needed

3. **Convert PDF**:
    - Return to home page
    - Drag & drop your PDF or click to browse
    - Click "Process PDF"
    - Wait for conversion
    - Download your Spokable PDF

## 📖 Usage

### Basic Workflow

````
Input PDF → Extract Text → Batch Process → Transform with Gemini → Generate PDF → Download
```l Selection

- **Gemini 3 Pro Preview**: Maximum quality for complex documents
- **Gemini 2.5 Flash**: Best balance (recommended default)
- **Gemini 2.5 Pro**: High quality for technical content
- **Gemini 2.5 Flash Lite**: Faster processing for simple documents
- **Gemini 2.0 Flash**: Legacy model support

### Performance Tips

- Use **Turbo Mode** for faster processing (parallel requests)
- Increase **batch size** to reduce API calls
- Use **Flash Lite** for simple documents
- Configure **backup API key** for rate limit failover

## 💰 Pricing

The application is **100% free**. You only pay for Google Gemini API usage:

### Free Tier (Recommended)
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per day
- Perfect for personal use

### Example Costs (Pay-as-you-go)
- Small PDF (10 pages): ~$0.002
- Medium PDF (50 pages): ~$0.01
- Large PDF (200 pages): ~$0.04

*Based on Gemini 2.5 Flash pricing*

## 🔒 Privacy & Security

- **No Server**: 100% client-side processing
- **No Tracking**: No analytics or cookies
- **No Storage**: Files processed locally, not uploaded
- **Open Source**: Fully auditable code

Only extracted text is sent to Google's Gemini API for transformation.

## 🏗️ Project Structure

````

spokable-pdf/
├── index.html # Main application page
├── settings.html # Settings configuration
├── about.html # About page
├── faq.html # FAQ page
├── pricing.html # Pricing information
├── contact.html # Contact page
├── privacy.html # Privacy policy
├── terms.html # Terms of service
├── css/
│ ├── main.css # Core styles
│ ├── components.css # Component styles
│ └── dark-mode.css # Dark mode styles
├── js/
│ ├── config.js # Configuration constants
│ ├── storage.js # LocalStorage & IndexedDB
│ ├── ui-manager.js # UI management & dark mode
│ ├── gemini-api.js # Gemini API client
│ ├── pdf-engine.js # PDF processing
│ ├── app.js # Main application logic
│ └── settings.js # Settings page logic
└── README.md

```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Chirag Singhal**
- GitHub: [@chirag127](https://github.com/chirag127)
- Email: chiragsinghal127@gmail.com
- Location: Bhubaneswar, Odisha, India

## 🙏 Acknowledgments

- Google Gemini AI for powerful language models
- PDF.js for PDF extraction
- jsPDF for PDF generation
- The open-source community

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/chirag127/spokable-pdf/issues)
- **Email**: chiragsinghal127@gmail.com
- **Documentation**: See [FAQ](faq.html) page

## 🗺️ Roadmap

- [ ] OCR support for scanned PDFs
- [ ] Image description generation
- [ ] Multiple output formats (EPUB, TXT)
- [ ] Batch file processing
- [ ] Cloud storage integration
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support

## ⚠️ Known Limitations

- Scanned PDFs require OCR preprocessing
- Very large PDFs (500+ pages) may take significant time
- AI transformations may occasionally be inaccurate
- Rate limits apply based on your API tier

## 🔧 Troubleshooting

### "No API key" error
- Go to Settings and enter your Gemini API key
- Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Rate limit errors
- Wait a few minutes and try again
- Configure a backup API key in Settings
- Disable Turbo Mode for sequential processing

### Extraction failed
- Ensure PDF is text-based (not scanned)
- Try a different PDF file
- Check browser console for detailed errors

### Processing takes too long
- Enable Turbo Mode for parallel processing
- Increase batch size in Settings
- Use Gemini 2.5 Flash Lite for faster results

---

Made with ❤️ by Chirag Singhal | November 2025
```
