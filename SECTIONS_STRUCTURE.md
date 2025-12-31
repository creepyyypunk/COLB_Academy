# Sections Structure

## Overview

COLB Academy now has a **3-tier navigation structure**:

```
Homepage
  ├─ Section 1: COLB Whitepaper
  │   ├─ Block 1: Basics
  │   ├─ Block 2: Market Analysis
  │   ├─ Block 3: Colb Application
  │   ├─ Block 4: Colb USD ($USC)
  │   ├─ Block 5: TKSP
  │   ├─ Block 6: Secondary Market Liquidity
  │   └─ Block 7: Tokenomics
  │
  ├─ Section 2: Appendices to the COLB Whitepaper
  │   └─ (Empty - add blocks here)
  │
  └─ Section 3: $USC Whitepaper
      └─ (Empty - add blocks here)
```

## Navigation Flow

1. **Homepage** (`/en` or `/ru`)
   - Shows 3 main sections as large rectangular cards
   - Each section card displays:
     - Title
     - Description
     - Number of blocks
     - Arrow to navigate

2. **Section Page** (`/en/sections/colb-whitepaper`)
   - Shows all blocks within that section
   - Blocks displayed as horizontal rectangular cards
   - Each block card shows:
     - Block number (circular badge)
     - Title and description
     - Status badge (Locked/Unlocked/Completed)
     - Number of sections
     - Best score (if attempted)
     - Action button (Start/Review/Locked)

3. **Block Content** (`/en/blocks/block-1/abstract`)
   - Same as before - shows markdown content
   - Navigate between sections within block
   - Take quiz at the end

## Adding Blocks to Sections

### To add blocks to "Appendices" section:

1. Create block folders:
```bash
mkdir -p content/en/blocks/block-8
mkdir -p content/ru/blocks/block-8
```

2. Create content (metadata.json + .md files)

3. Update `config/sections.config.ts`:
```typescript
{
  id: 'appendices',
  // ...
  blockIds: ['block-8', 'block-9'], // Add your new blocks here
}
```

### To add blocks to "$USC Whitepaper" section:

Follow same steps but add to the `usc-whitepaper` section:
```typescript
{
  id: 'usc-whitepaper',
  // ...
  blockIds: ['block-10', 'block-11'], // Add USC blocks here
}
```

## Section Configuration

Edit `config/sections.config.ts` to manage sections:

```typescript
export const sections: Section[] = [
  {
    id: 'colb-whitepaper',
    title: {
      en: 'COLB Whitepaper',
      ru: 'COLB Whitepaper',
    },
    description: {
      en: 'Core documentation...',
      ru: 'Основная документация...',
    },
    blockIds: ['block-1', 'block-2', ...],
    order: 1,
  },
  // ... more sections
];
```

## UI Changes

### Homepage Sections
- **Large rectangular cards** with gradient left border
- **FileText icon** for each section
- **Hover effects**: shadow, border color change, arrow movement
- **Block count badge** at bottom

### Block Cards (inside sections)
- **Horizontal layout** (rectangular)
- **Colored left border**:
  - Green = Completed
  - Blue (accent) = Unlocked
  - Gray = Locked
- **Circular badge** with block number
- **Flexible layout** adapts to content
- **Responsive**: stacks on mobile

## URLs

- Homepage: `/en` or `/ru`
- Section: `/en/sections/colb-whitepaper`
- Block: `/en/blocks/block-1/abstract` (unchanged)
- Quiz: `/en/quiz/block-1` (unchanged)
- Progress: `/en/progress` (unchanged)

## Benefits

✅ **Better Organization**: Content grouped logically by whitepaper
✅ **Scalability**: Easy to add new sections and blocks
✅ **Clear Navigation**: Users know which whitepaper they're reading
✅ **Flexible**: Can have different number of blocks per section
✅ **Professional**: Matches documentation structure

## Files Modified

- ✅ `config/sections.config.ts` - Section definitions
- ✅ `components/sections/SectionCard.tsx` - Section card component
- ✅ `components/blocks/BlockCard.tsx` - Redesigned horizontal layout
- ✅ `app/[locale]/page.tsx` - Shows sections instead of blocks
- ✅ `app/[locale]/sections/[sectionId]/page.tsx` - New section page
