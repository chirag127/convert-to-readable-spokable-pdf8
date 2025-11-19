# Quick Start Guide

Get started with Spokable PDF in 5 minutes!

## Step 1: Get Your API Key (2 minutes)

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIza...`)

**Free Tier Includes:**

-   15 requests per minute
-   1,500 requests per day
-   Perfect for personal use!

## Step 2: Configure Settings (1 minute)

1. Open the application
2. Click **Settings** in the navigation
3. Paste your API key in the "Gemini API Key" field
4. Click **Save Settings**

**Optional:** Configure a backup API key for automatic failover.

## Step 3: Convert Your First PDF (2 minutes)

1. Return to the **Home** page
2. Drag & drop your PDF file (or click to browse)
3. Click **Process PDF**
4. Wait for conversion (progress bar shows status)
5. Click **Download Spokable PDF**

That's it! 🎉

## Tips for Best Results

### Choose the Right Model

-   **Gemini 2.5 Flash** (default): Best for most users
-   **Gemini 3 Pro Preview**: Maximum quality for complex documents
-   **Gemini 2.5 Flash Lite**: Faster for simple documents

### Optimize Performance

-   Enable **Turbo Mode** for faster processing
-   Increase **Batch Size** to reduce API calls
-   Use **Backup API Key** to avoid rate limits

### Customize Prompts

Go to Settings → Prompt Customization to tailor how content is transformed:

-   **Code Blocks**: How should code be explained?
-   **Tables**: How should data be narrated?
-   **Math**: How should equations be spoken?
-   **General Text**: Overall transformation style

## Common Use Cases

### 1. Technical Documentation

```
Input: API documentation with code examples
Output: Conversational explanations of APIs and code logic
```

### 2. Research Papers

```
Input: Academic paper with equations and tables
Output: Narrative format with spoken equations and data insights
```

### 3. Programming Books

```
Input: Programming textbook with code listings
Output: Conceptual explanations of code without line-by-line reading
```

### 4. Technical Manuals

```
Input: Product manual with diagrams and specifications
Output: Flowing narrative of features and specifications
```

## Troubleshooting

### "Please configure your API key"

→ Go to Settings and enter your Gemini API key

### "Rate limit exceeded"

→ Wait a few minutes or add a backup API key in Settings

### "Extraction failed"

→ Ensure your PDF is text-based (not a scanned image)

### Processing is slow

→ Enable Turbo Mode in Settings for parallel processing

### Output quality is poor

→ Try Gemini 3 Pro Preview model for better results

## Keyboard Shortcuts

-   **Ctrl/Cmd + D**: Toggle dark mode (when implemented)
-   **Drag & Drop**: Upload PDF file
-   **Esc**: Cancel processing (when implemented)

## Best Practices

### ✅ Do

-   Use text-based PDFs (not scanned)
-   Start with smaller PDFs to test
-   Review critical documents for accuracy
-   Customize prompts for your specific needs
-   Keep your API key secure

### ❌ Don't

-   Process copyrighted material without permission
-   Share your API key publicly
-   Expect perfect accuracy on complex content
-   Process extremely large files (500+ pages) without patience

## Cost Estimation

Based on Gemini 2.5 Flash pricing:

| PDF Size  | Estimated Cost |
| --------- | -------------- |
| 10 pages  | ~$0.002        |
| 50 pages  | ~$0.01         |
| 100 pages | ~$0.02         |
| 200 pages | ~$0.04         |

**Free tier is usually sufficient for personal use!**

## Next Steps

1. **Explore Settings**: Customize prompts and performance
2. **Try Different Models**: Compare quality and speed
3. **Enable Dark Mode**: Click the sun/moon icon
4. **Read FAQ**: Learn about advanced features
5. **Join Community**: Report bugs or suggest features on GitHub

## Getting Help

-   **FAQ**: [faq.html](faq.html)
-   **Documentation**: [README.md](README.md)
-   **Issues**: [GitHub Issues](https://github.com/chirag127/spokable-pdf/issues)
-   **Email**: chiragsinghal127@gmail.com

## Example Workflow

```
1. Upload: technical-guide.pdf (50 pages)
   ↓
2. Settings: Gemini 2.5 Flash, Turbo Mode ON
   ↓
3. Process: ~2 minutes (10 batches)
   ↓
4. Download: technical-guide_spokable.pdf
   ↓
5. Listen: Open in Moon+ Reader Pro with TTS
```

## Pro Tips

1. **Batch Processing**: Process multiple PDFs by repeating the workflow
2. **Backup Keys**: Use multiple API keys to avoid rate limits
3. **Custom Prompts**: Tailor prompts for specific document types
4. **Quality Check**: Always review critical documents
5. **Cost Control**: Use Flash Lite for simple documents to save costs

## Support the Project

-   ⭐ Star on [GitHub](https://github.com/chirag127/spokable-pdf)
-   🐛 Report bugs
-   💡 Suggest features
-   🤝 Contribute code
-   📢 Share with others

---

**Ready to convert your first PDF?** [Get Started Now](index.html)

Last Updated: November 19, 2025
