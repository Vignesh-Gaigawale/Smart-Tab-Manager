# 🗂️ Smart Tab Manager

A Chrome extension to manage browser tabs smartly — search, detect duplicates, enable focus mode, and view productivity analytics.

## ✨ Features
- 🔍 Search tabs by title in real time
- ⚠️ Detect and remove duplicate tabs
- 🎯 Focus Mode — closes 25+ distraction sites instantly
- 📊 Productivity report (Coding / Work / Entertainment / Other)
- ⏱️ Auto-closes tabs inactive for 30+ minutes

## 🚀 Installation
1. Clone this repo: `git clone https://github.com/YOUR_USERNAME/smart-tab-manager.git`
2. Open Chrome → go to `chrome://extensions`
3. Enable **Developer Mode** (top right toggle)
4. Click **Load unpacked** → select the project folder

## 🛠️ Tech Stack
- Manifest V3
- Vanilla JS
- Chrome Extensions API (`tabs`, `storage`)

## 📁 File Structure
| File | Purpose |
|------|---------|
| `manifest.json` | Extension config & permissions |
| `popup.html` | UI layout |
| `popup.js` | Core tab logic |
| `background.js` | Tab tracking service worker |
| `style.css` | Styling |

## 📄 License
MIT
