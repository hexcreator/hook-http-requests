# RequestScope

**Deep HTTP Request Analysis for Chrome DevTools**

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-v1.0-blue.svg)](https://chrome.google.com/webstore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> A powerful Chrome extension that intercepts and analyzes all HTTP requests (XHR and Fetch) with advanced debugging capabilities, stack traces, and performance monitoring directly in Chrome DevTools.

## 🚀 Features

### Core Capabilities
- **Complete Request Interception** - Captures all XMLHttpRequest and Fetch API calls
- **Stack Trace Analysis** - Shows exactly where each request originated in your code
- **Performance Monitoring** - Precise timing data with microsecond accuracy
- **Headers & Body Inspection** - Full request/response data including headers and payloads
- **Real-time Monitoring** - Live capture across all browser tabs
- **Developer-Friendly UI** - Custom DevTools panel with intuitive interface

### Advanced Analysis
- **API Discovery** - Identify hidden endpoints and service architecture
- **Authentication Flow Mapping** - Track OAuth, session management, and security headers
- **Performance Bottlenecks** - Identify slow requests and optimization opportunities
- **Third-Party Integration Analysis** - Understand external service dependencies
- **Security Research** - Monitor data transmission and identify potential vulnerabilities

## 📋 Use Cases

### Web Development
- **API Debugging** - Debug complex AJAX interactions and API integrations
- **Performance Analysis** - Identify slow requests and optimize application performance
- **Third-Party Services** - Monitor external API calls and service dependencies
- **Authentication Debugging** - Track token exchanges and session management

### Security Research
- **Endpoint Discovery** - Find hidden API endpoints not visible in source code
- **Data Flow Analysis** - Monitor sensitive data transmission patterns
- **Rate Limiting Testing** - Understand API limits and error handling
- **CSRF & Security Headers** - Analyze security implementations

### Integration Development
- **Reverse Engineering** - Understand how websites communicate with backends
- **API Documentation** - Generate comprehensive API usage examples
- **Microservices Mapping** - Visualize service-to-service communication
- **Quality Assurance** - Verify API contracts and integration points

## 🛠️ Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store page](https://chrome.google.com/webstore) (coming soon)
2. Click "Add to Chrome"
3. Confirm installation when prompted

### Developer Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/requestscope.git
   cd requestscope
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top right)

4. Click "Load unpacked" and select the project directory

5. The RequestScope extension will appear in your extensions list

## 📖 Usage

### Getting Started
1. **Open Chrome DevTools** (F12 or right-click → Inspect)
2. **Navigate to the "RequestScope" tab** in DevTools
3. **Browse any website** - requests will be captured automatically
4. **Click on any request** to view detailed information

### Interface Overview
```
┌─────────────────────────────────────────────────────────────┐
│ [Clear] [Filter] [Export]                                   │
├─────────────────────────────────────────────────────────────┤
│ ✅ XHR GET  /api/users/profile              234ms           │
│ ❌ Fetch POST /api/auth/login               Error           │
│ ✅ XHR GET   /api/notifications             45ms            │
│                                                             │
│ ▼ Request Details (expandable)                              │
│   URL: https://api.example.com/users/profile                │
│   Headers: { "Authorization": "Bearer ...", ... }          │
│   Response: { "user": { "id": 123, ... } }                 │
│   Stack Trace: at fetch (app.js:42:5) ...                  │
└─────────────────────────────────────────────────────────────┘
```

### Request Information
Each captured request includes:
- **Method & URL** - Complete request details
- **Status Code** - Color-coded for quick identification
- **Headers** - Both request and response headers
- **Body Content** - Request payload and response data
- **Timing Data** - Precise performance measurements
- **Stack Trace** - JavaScript call stack for debugging
- **Timestamp** - When the request was initiated

## 🏗️ Architecture

RequestScope uses a sophisticated multi-layer architecture to overcome Chrome's security restrictions:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   Web Page      │    │  Content Script  │    │ Background      │    │  DevTools Panel │
│                 │    │                  │    │ Service Worker  │    │                  │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │    │ ┌──────────────┐ │
│ │ Injected    │◄┼────┼►│ Message      │◄┼────┼►│ Message     │◄┼────┼►│ UI Display   │ │
│ │ Script      │ │    │ │ Forwarder    │ │    │ │ Router      │ │    │ │ & Controls   │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │    │ └──────────────┘ │
└─────────────────┘    └──────────────────┘    └─────────────────┘    └──────────────────┘
```

### Components
- **Injected Script** - Intercepts HTTP calls in page context
- **Content Script** - Bridges page and extension contexts
- **Background Worker** - Routes messages and manages connections
- **DevTools Panel** - Displays captured data with rich UI

## 🔧 Development

### Project Structure
```
requestscope/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for message routing
├── content_script.js      # Bridge between page and extension
├── injected.js           # Core HTTP interception logic
├── devtools.html         # DevTools panel registration
├── devtools.js           # DevTools panel entry point
├── panel.html            # Main UI layout
├── panel.css             # UI styling
├── panel.js              # UI logic and data handling
├── icons/                # Extension icons
└── README.md             # This file
```

### Key Technologies
- **Manifest V3** - Latest Chrome extension format
- **Chrome DevTools API** - Custom panel integration
- **JavaScript Proxy/Monkey Patching** - HTTP interception
- **Chrome Runtime Messaging** - Cross-context communication
- **Performance API** - High-precision timing measurements

### Development Setup
1. Make changes to source files
2. Reload extension in `chrome://extensions/`
3. Refresh DevTools panel to see changes
4. Test on various websites to ensure compatibility

### Testing
```bash
# Load extension in Chrome
# Navigate to test website (e.g., GitHub, Twitter, etc.)
# Open DevTools → RequestScope tab
# Perform actions that trigger HTTP requests
# Verify all requests are captured with complete data
```

## 🚨 Troubleshooting

### Common Issues

**Issue: No requests appearing**
- ✅ Ensure DevTools is open and RequestScope tab is active
- ✅ Check that the extension is enabled in `chrome://extensions/`
- ✅ Refresh the page after opening RequestScope panel

**Issue: Missing request details**
- ✅ Large response bodies may take time to load
- ✅ Some requests may be blocked by CORS policies
- ✅ Check browser console for any error messages

**Issue: Extension not loading**
- ✅ Verify all files are present in extension directory
- ✅ Check manifest.json syntax with JSON validator
- ✅ Ensure Chrome is up to date (minimum version 88+)

### Debug Mode
Enable additional logging by opening browser console:
```javascript
// Check if injected script is active
console.log(window.__HybridInterceptorActive);

// View message passing
// (Check console in both page and extension contexts)
```

## 🔒 Privacy & Security

### Data Handling
- **Local Only** - All captured data stays in your browser
- **No External Transmission** - RequestScope never sends data to external servers
- **Session-Based** - Data is cleared when DevTools panel is closed
- **User Control** - Clear captured data anytime with the Clear button

### Permissions Explained
- **`<all_urls>`** - Required to inject monitoring script on any website
- **`storage`** - Used for extension settings (not request data)
- **`devtools`** - Enables custom DevTools panel integration

### Security Considerations
- Captured data may include sensitive information (API keys, tokens, personal data)
- Use Clear button regularly when analyzing sensitive applications
- Be cautious when sharing screenshots or recordings that include RequestScope data
- Extension runs with elevated privileges - only install from trusted sources

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Bug Reports
1. Check existing issues first
2. Provide detailed steps to reproduce
3. Include Chrome version and extension version
4. Add screenshots if applicable

### Feature Requests
1. Describe the use case and benefit
2. Provide examples of desired functionality
3. Consider implementation complexity
4. Check if similar features exist

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with clear commit messages
4. Test thoroughly on multiple websites
5. Submit pull request with detailed description

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test on both simple and complex websites
- Ensure no breaking changes to existing functionality
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Chrome DevTools team for excellent developer APIs
- Open source community for inspiration and feedback
- Beta testers who provided valuable bug reports and feature suggestions

## 📞 Support

### Getting Help
- **GitHub Issues** - For bugs and feature requests
- **Documentation** - Check this README and inline code comments
- **Stack Overflow** - Use tag `requestscope-extension`

### Roadmap
- ✅ Core HTTP interception
- ✅ DevTools panel integration
- ✅ Stack trace capture
- 🚧 Request filtering and search
- 🚧 Export to HAR format
- 🚧 Request replay functionality
- 📋 Custom scripting support
- 📋 Team collaboration features

---

**Made with ❤️ for developers, security researchers, and anyone who wants to understand how the web works.**

[![GitHub stars](https://img.shields.io/github/stars/your-username/requestscope.svg?style=social&label=Star)](https://github.com/your-username/requestscope)
[![GitHub forks](https://img.shields.io/github/forks/your-username/requestscope.svg?style=social&label=Fork)](https://github.com/your-username/requestscope/fork)