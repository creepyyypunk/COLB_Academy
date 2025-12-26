# Content Editing Guide

## Quick Start

Your COLB Academy application is ready! Now you need to add your actual Whitepaper content.

## Where to Edit Content

### English Content
Edit files in: `content/en/blocks/block-X/`

### Russian Content
Edit files in: `content/ru/blocks/block-X/`

## Currently Available

✅ Block 1 (Basics) - Sample content created
- Abstract
- Motivation

⚠️ Blocks 2-7 - You need to create these

## Adding Block 2 (Market Analysis)

### Step 1: Create Folders

```bash
mkdir -p content/en/blocks/block-2
mkdir -p content/ru/blocks/block-2
```

### Step 2: Create metadata.json

Create `content/en/blocks/block-2/metadata.json`:

```json
{
  "id": "block-2",
  "title": "Market Analysis",
  "description": "Market Size Evaluation and Benefits of Own Development",
  "order": 2,
  "sections": [
    {
      "id": "market-size",
      "title": "Market Size Evaluation",
      "filename": "market-size.md",
      "order": 1
    },
    {
      "id": "benefits",
      "title": "Benefits of Own Development",
      "filename": "benefits.md",
      "order": 2
    }
  ]
}
```

### Step 3: Create Markdown Files

Create `content/en/blocks/block-2/market-size.md`:

```markdown
# Market Size Evaluation

[Add your Whitepaper content here]

## Key Points

- Point 1
- Point 2
- Point 3

## Market Data

[Add market analysis content]
```

Create `content/en/blocks/block-2/benefits.md`:

```markdown
# Benefits of Own Development

[Add your Whitepaper content here]
```

### Step 4: Create Quiz

Create `content/en/quizzes/block-2-quiz.json`:

```json
{
  "blockId": "block-2",
  "title": "Market Analysis Quiz",
  "passingScore": 70,
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the estimated market size for tokenization?",
      "points": 10,
      "options": [
        "$10 billion",
        "$100 billion",
        "$1 trillion",
        "$10 trillion"
      ],
      "correctAnswer": 2,
      "explanation": "Explanation of the correct answer."
    }
  ]
}
```

### Step 5: Repeat for Russian

Copy the same structure to `content/ru/blocks/block-2/` with Russian translations.

## Complete Block Structure

For each block (1-7), you need:

1. ✅ Metadata file (`metadata.json`)
2. ✅ Markdown files for each section
3. ✅ Quiz file (`block-X-quiz.json`)
4. ✅ Russian translations of all above

## Block Content Map (From Requirements)

### Block 1: Basics ✅ (Sample created)
- Abstract
- Motivation

### Block 2: Market Analysis ⚠️ (Need to create)
- Market Size Evaluation
- Benefits of Own Development

### Block 3: Colb Application ⚠️ (Need to create)
- Overview
- Investors
- Asset & Capital Managers
- Pre-IPO Founders, Early Employees, or Business Angels

### Block 4: Colb USD ($USC) ⚠️ (Need to create)
- Abstracting Banks
- Swaps

### Block 5: TKSP ⚠️ (Need to create)
- Scalable RWAT Framework
- TKSP Categories (CFT, CMT, CTT)
- Legal Trust and Non-Custodial Ownership
- Settlement Currencies
- Mechanism and Fees
- Natural Liquidity
- Secondary Market Liquidity

### Block 6: Secondary Market Liquidity Infrastructure ⚠️ (Need to create)
- Overview
- TKSP Liquidity
- Intents
- Solvers

### Block 7: Tokenomics ⚠️ (Need to create)
- Overview
- $COLB
- Staking
- Rewards for Solvers

## Quiz Question Types

### 1. Multiple Choice
```json
{
  "id": "q1",
  "type": "multiple-choice",
  "question": "Question text?",
  "points": 10,
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Why this is correct."
}
```

### 2. True/False
```json
{
  "id": "q2",
  "type": "true-false",
  "question": "Statement is true?",
  "points": 10,
  "correctAnswer": true,
  "explanation": "Explanation."
}
```

### 3. Multiple Select
```json
{
  "id": "q3",
  "type": "multiple-select",
  "question": "Select all that apply:",
  "points": 15,
  "options": ["A", "B", "C", "D"],
  "correctAnswers": [0, 2],
  "explanation": "Explanation."
}
```

### 4. Matching
```json
{
  "id": "q4",
  "type": "matching",
  "question": "Match items:",
  "points": 20,
  "leftItems": ["Item 1", "Item 2"],
  "rightItems": ["Match A", "Match B"],
  "correctMatches": {
    "0": 1,
    "1": 0
  }
}
```

### 5. Sequence
```json
{
  "id": "q5",
  "type": "sequence",
  "question": "Arrange in order:",
  "points": 15,
  "items": ["First", "Second", "Third"],
  "correctOrder": [0, 1, 2]
}
```

### 6. Scheme Builder
```json
{
  "id": "q6",
  "type": "scheme-builder",
  "question": "Build the flow:",
  "points": 30,
  "components": [
    { "id": "a", "label": "Start", "type": "box" },
    { "id": "b", "label": "Process", "type": "diamond" },
    { "id": "c", "label": "End", "type": "circle" }
  ],
  "correctScheme": [
    { "from": "a", "to": "b" },
    { "from": "b", "to": "c" }
  ]
}
```

## Testing Your Content

1. Save your files
2. Refresh browser (http://localhost:3000)
3. Navigate to your block
4. Content should appear immediately!

## Tips

- Use Markdown formatting for better readability
- Add images with: `![Alt text](path/to/image.png)`
- Use headings, lists, and emphasis
- Test quizzes to ensure scoring works correctly
- Keep quiz questions clear and concise

## Need Help?

Check the example content in `block-1` for reference!
