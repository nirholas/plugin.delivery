# plugin.delivery examples

AI Plugin Index - Function call plugins and tools for SperaxOS

## Example 1

```text
User: "What's the price of ETH?"
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  SperaxOS discovers plugin from plugin.delivery index   │
│  AI generates function call: getPrice(coin: "ethereum") │
│  Gateway routes request to CoinGecko API                │
│  Response rendered in chat (JSON, Markdown, or UI)      │
└─────────────────────────────────────────────────────────┘
         │
         ▼
AI: "ETH is currently trading at $3,450..."
```

## Example 2

```bash
# Clone template to new directory
cp -r templates/standalone my-plugin
cd my-plugin

# Install dependencies
bun install

# Start development
bun dev
```

## Example 3

```text
templates/standalone/
├── public/
│   └── manifest.json    # Plugin manifest
├── src/
│   ├── api/            # API endpoints
│   │   └── index.ts    # Main handler
│   └── ui/             # React UI (standalone only)
│       └── page.tsx    # UI component
├── package.json
└── README.md
```

## Example 4

```bash
git clone https://github.com/nirholas/plugin.delivery.git
cd plugin.delivery
pnpm install
```

## Example 5

```bash
# Deploy to Vercel
vercel --prod

# Add to plugin index (submit PR or use Plugin Store)
```

## Example 6

```bash
# Clone
git clone https://github.com/nirholas/plugin.delivery.git
cd plugins

# Install
bun install

# Dev server
bun dev
```

## Example 7

```bash
# Set OpenAI API key (required for i18n generation)
export OPENAI_API_KEY=sk-your-key-here

# Generate translations (creates all locale files from en-US)
bun run format
```

## Example 8

```bash
bun run build
```


Every snippet above is taken from the [repository documentation](https://github.com/nirholas/plugin.delivery#readme).
