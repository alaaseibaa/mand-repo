# مندلين (Mandaleen) - Arabic RTL Service Platform

A modern, professional Arabic RTL service platform built with React, TypeScript, and Vite featuring AI-powered restaurant assistance.

## ✨ Features

- 🌟 **Modern Arabic RTL Design** - Professional glassmorphism interface
- 🤖 **AI-Powered Chat** - Google Gemini 2.0 Flash integration for restaurant assistance
- ⚡ **Ultra-Fast Streaming** - Real-time message streaming with smooth animations
- 📱 **Responsive Layout** - Mobile-first design with smooth transitions
- 🎨 **Beautiful UI** - Glassmorphism effects with gradient backgrounds
- 🔄 **Auto-Scroll** - Intelligent scrolling during message streaming
- 📝 **Markdown Support** - Rich text formatting in chat responses
- 🎯 **Optimized Performance** - Minimal bundle size and fast loading

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Extract the application files to your desired directory

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Add your Google Gemini API key to `.env`:
```
VITE_GOOGLE_API_KEY=your_gemini_api_key_here
```

5. Start development server
```bash
npm run dev
```

6. Open your browser to `http://localhost:5173`

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **LangChain** - AI integration
- **Google Gemini 2.0** - AI language model
- **Lucide React** - Icons
- **React Markdown** - Markdown rendering

## 🎯 Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript types
├── data/               # Mock data
└── main.tsx           # App entry point
```

## 🌟 Key Components

- **ChatInterface** - Main chat interface with streaming
- **StreamingChatBubble** - Animated message bubbles
- **CategoryNavigation** - Service category selection
- **AgentList** - Available agents display
- **ConversationSidebar** - Chat history sidebar

## 🔧 Configuration

The app uses Vite environment variables:
- `VITE_GOOGLE_API_KEY` - Google Gemini API key for AI chat

## 📱 Responsive Design

The app is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🎨 Design System

- **Colors**: Orange/blue gradient scheme
- **Typography**: Tajawal font for Arabic text
- **Effects**: Glassmorphism with backdrop-blur
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Performance

- Bundle size: ~770KB (optimized)
- Ultra-fast streaming: 5 characters per 15ms
- Minimal memory usage with conversation history limits
- Optimized scroll performance with requestAnimationFrame

## 📄 License

Private project - All rights reserved

## 🤝 Contributing

This is a private project.

---

Built with ❤️ for the Arabic-speaking community
