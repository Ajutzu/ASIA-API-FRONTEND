# Client Application

## Overview
This is the frontend application built with Next.js 15, React 19, and TypeScript. The application features a modern UI with animations, charts, and responsive design using Tailwind CSS.

## Project Structure
```
client/
├── app/              # Next.js app directory (pages and layouts)
├── components/       # Reusable React components
├── lib/             # Utility functions and shared logic
├── public/          # Static assets
└── styles/          # Global styles and Tailwind configuration
```

## Technologies Used
- Next.js 15.3.2
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Radix UI (Accessible Components)
- Next Themes (Dark/Light Mode)

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development
Run the development server:
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:3000`

### Building for Production
```bash
npm run build
# or
yarn build
```

### Starting Production Server
```bash
npm run start
# or
yarn start
```

## Features
- Modern, responsive UI design
- Dark/Light mode support
- Interactive data visualizations
- Smooth animations
- Type-safe development with TypeScript
- Component-based architecture
- Optimized performance with Next.js

## Key Dependencies
- `next`: ^15.3.2
- `react`: ^19.0.0
- `typescript`: ^5
- `tailwindcss`: ^4
- `framer-motion`: ^12.10.5
- `recharts`: ^2.15.3
- `@radix-ui/*`: Various UI components
- `next-themes`: ^0.4.6

## Scripts
- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
