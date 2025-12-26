# COLB Academy

Educational web application for learning about COLB tokenization, blockchain technology, and structured products.

## Features

- **7 Educational Blocks** with comprehensive content from the COLB Whitepaper
- **6 Quiz Question Types**: Multiple Choice, True/False, Multiple Select, Matching, Sequence, and Scheme Builder
- **Progress Tracking** with localStorage (no backend required)
- **Bilingual Support**: English and Russian (easily extendable)
- **Modern UI** inspired by colb.finance design
- **Responsive Design** for all devices
- **Block Unlock System**: Pass quizzes (70%+) to unlock next blocks

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Markdown** for content rendering
- **Lucide React** for icons
- **Framer Motion** for animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Content Management

### Editing Block Content

1. Navigate to `content/{locale}/blocks/block-X/`
2. Edit the `.md` files using Markdown syntax
3. Changes appear immediately in development mode

**Example structure:**
```
content/
├── en/
│   ├── blocks/
│   │   ├── block-1/
│   │   │   ├── metadata.json
│   │   │   ├── abstract.md
│   │   │   └── motivation.md
│   └── quizzes/
│       └── block-1-quiz.json
└── ru/ (same structure)
```

### Adding New Sections

1. Create a new `.md` file in the block folder
2. Update `metadata.json` to register the section:
```json
{
  "sections": [
    {
      "id": "new-section",
      "title": "New Section Title",
      "filename": "new-section.md",
      "order": 3
    }
  ]
}
```

### Editing Quizzes

Edit `content/{locale}/quizzes/block-X-quiz.json` following the quiz schema.

**Supported question types:**
1. **Multiple Choice** - Single correct answer
2. **True/False** - Boolean question
3. **Multiple Select** - Multiple correct answers
4. **Matching** - Connect items from two lists
5. **Sequence** - Arrange items in correct order
6. **Scheme Builder** - Build connections between components

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/          # Localized routes
│   │   ├── blocks/        # Block viewing pages
│   │   ├── quiz/          # Quiz pages
│   │   └── progress/      # Progress dashboard
├── components/            # React components
│   ├── layout/           # Header, Footer, LanguageSwitcher
│   ├── blocks/           # BlockCard, MarkdownRenderer
│   ├── quiz/             # Quiz system components
│   └── ui/               # Base UI components
├── content/              # Educational content (EDIT THESE)
│   ├── en/              # English content
│   └── ru/              # Russian content
├── lib/                  # Utility libraries
│   ├── content/         # Content loading logic
│   ├── quiz/            # Quiz engine and scoring
│   ├── progress/        # Progress management
│   └── i18n/            # Internationalization
├── types/                # TypeScript definitions
├── contexts/             # React contexts
└── locales/              # UI translations
```

## Adding Content

### Create New Block

1. Create folder structure:
```bash
mkdir -p content/en/blocks/block-2
mkdir -p content/ru/blocks/block-2
```

2. Add `metadata.json`:
```json
{
  "id": "block-2",
  "title": "Market Analysis",
  "description": "Understanding the market opportunity",
  "order": 2,
  "sections": [...]
}
```

3. Add Markdown files for each section

4. Create quiz: `content/en/quizzes/block-2-quiz.json`

## Deployment

### Render

1. Push code to GitHub
2. Connect repository to Render
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Deploy!

### Vercel (Alternative)

```bash
npm install -g vercel
vercel
```

## Progress Tracking

User progress is stored in browser localStorage with the key `colb-academy-progress`. Data includes:
- Completed blocks
- Quiz attempts and scores
- Unlocked blocks
- Section read status

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

This project is for educational purposes.

## Support

For issues or questions, please contact the development team.

---

Built with ❤️ for COLB Academy
