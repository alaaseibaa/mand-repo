# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **مندلين (Mandelin)**, an Arabic RTL service platform with Apple-inspired minimalist design. It's a React TypeScript application built with Vite that provides a chat interface for connecting users with service agents across different categories.

## Development Commands

### Core Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### No Test Suite
This project currently has no test framework configured. When adding tests, consult with the user about preferred testing approach.

## Architecture

### Application Flow
The app follows a simple navigation state pattern:
1. **CategoryNavigation** - Main landing page showing service categories
2. **AgentList** - Shows agents for selected category  
3. **ChatInterface** - 1-on-1 chat with selected agent

Navigation is managed through `useNavigation` hook with a simple state machine.

### Key Components Structure
- **App.tsx** - Root component managing navigation state and chat mode
- **CategoryNavigation** - Service category selection grid
- **AgentList** - Agent listing with filters and selection
- **ChatInterface** - Full-screen chat with voice recording capabilities
- **useChat** - Core chat state management with simulated AI responses

### Data Layer
- Mock data in `src/data/` directory (agents, conversations, restaurant agents)
- Type definitions in `src/types/` with clear interfaces for Agent, Category, NavigationState
- No external API - uses simulated responses and mock data

### Tech Stack
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling with extensive design system
- **Lucide React** for icons
- **ESLint** with TypeScript and React plugins

## Design System

This project implements a comprehensive Arabic RTL design system documented in `docs/`:

### Core Principles
- **RTL Layout** - Proper Arabic text direction and layout
- **Apple-inspired minimalism** - Clean, simple aesthetics
- **Glassmorphism effects** - Subtle transparency and backdrop blur
- **Accessibility** - WCAG 2.1 AA compliance

### Key Design Elements
- **Primary Color**: #F97316 (Orange)
- **Typography**: Tajawal font family (Arabic-optimized)
- **Spacing**: 8px base grid system
- **Components**: Category cards, agent cards, chat bubbles with smooth animations

### Implementation Notes
- All text content is in Arabic
- Responsive design with mobile-first approach
- Voice recording capability with simulated speech-to-text
- Hover effects without scaling for subtle interactions

## File Organization

```
src/
├── components/     # React components
├── data/          # Mock data and test data
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
└── App.tsx        # Root component
```

## Arabic/RTL Considerations

When working with this codebase:
- All user-facing text should be in Arabic
- Use proper RTL CSS classes and layout patterns
- Test layouts in RTL mode
- Ensure proper text alignment and spacing
- Consider Arabic typography and reading patterns

## Development Notes

- Uses ESLint with TypeScript and React configurations
- No pre-commit hooks or automated testing currently configured
- Tailwind configured for RTL support
- Voice recording features use Web Audio API with permission handling