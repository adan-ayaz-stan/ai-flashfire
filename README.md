# AI Flashfire 🔥

**Master any subject with intelligent flashcards powered by AI - featuring spaced repetition, automated content generation, and adaptive testing.**

## 🎯 Project Overview

**Because** traditional learning methods are time-consuming and ineffective at knowledge retention, **we built** an AI-powered flashcard application that automatically generates study materials from uploaded content, **resulting in** a personalized learning experience that adapts to individual progress and maximizes knowledge retention through scientifically-proven spaced repetition techniques.

## 🚀 Key Features

- **🤖 AI-Powered Content Generation**: Automatically creates flashcards from uploaded PDFs or text using Mistral AI
- **📚 Hierarchical Organization**: Organize content with Tables → Books → Chapters → Flashcards structure
- **🧠 Intelligent Testing**: Auto-generates multiple-choice tests from flashcard content
- **🔄 Spaced Repetition**: Built-in algorithms for optimal learning retention
- **💳 Subscription Management**: Freemium model with Stripe integration
- **🔐 Secure Authentication**: User management via Clerk
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices

## 🏗️ Technical Architecture

### Core Tech Stack

| Technology             | Purpose                          | Why Chosen                                                         |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------ |
| **Next.js 14**         | Full-stack React framework       | App Router for modern routing, built-in API routes, excellent SEO  |
| **TypeScript**         | Type safety                      | Prevents runtime errors, better developer experience               |
| **Firebase Firestore** | NoSQL Database                   | Real-time synchronization, scalable, perfect for hierarchical data |
| **Clerk**              | Authentication & User Management | Comprehensive auth solution with social logins                     |
| **Mistral AI**         | Content Generation               | Advanced LLM for flashcard and test question generation            |
| **Stripe**             | Payment Processing               | Industry-standard subscription management                          |
| **TailwindCSS**        | Styling Framework                | Utility-first CSS for rapid UI development                         |
| **shadcn/ui**          | Component Library                | High-quality, accessible React components                          |

### State Management & Data Flow

```
User Input → Clerk Auth → API Routes → Firebase → AI Processing → Updated UI
```

- **React Query (TanStack Query)**: Server state management with caching
- **React Hook Form + Zod**: Form handling with runtime validation
- **Framer Motion**: Smooth animations and transitions

### AI Integration Architecture

**Because** users need quick content transformation from various sources, **we implemented** a chunked processing system using Mistral AI, **resulting in** efficient flashcard generation that handles large documents while maintaining context accuracy.

```typescript
// AI Processing Flow
Text/PDF Upload → Content Chunking → Mistral AI Processing → Structured Output → Database Storage
```

## 📁 Project Structure

```
ai-flashfire/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (landing)/                # Marketing pages
│   ├── api/                      # API endpoints
│   │   ├── flashcards/ai/create/ # AI flashcard generation
│   │   ├── test/chapter/         # Test generation
│   │   └── webhooks/             # Stripe & Clerk webhooks
│   └── p/                        # Protected app routes
│       ├── (sidebar)/            # Dashboard layout
│       │   ├── dashboard/        # Main dashboard
│       │   └── [table]/          # Dynamic table/book/chapter routes
│       └── test/                 # Testing interface
├── components/                   # Reusable UI components
│   └── ui/                      # shadcn/ui components
├── lib/                         # Utility functions
│   ├── db/                      # Firebase configuration
│   └── payment/                 # Stripe configuration
├── server/                      # Server actions
│   └── actions/                 # Database operations
├── types/                       # TypeScript definitions
└── middleware.ts               # Route protection
```

## 🔧 Implementation Highlights

### 1. Hierarchical Data Organization

**Because** learners need structured content organization, **we designed** a four-tier hierarchy (Tables → Books → Chapters → Flashcards), **resulting in** intuitive content management that mirrors real-world study organization.

```typescript
// Type Definitions
type TTable = { id: string; title: string; userId: string; ... }
type TBook = { id: string; title: string; table_id: string; ... }
type TChapter = { id: string; title: string; book_id: string; ... }
type TFlashcard = { id: string; question: string; answer: string; chapter_id: string; ... }
```

### 2. AI-Powered Content Generation

**Because** manual flashcard creation is time-intensive, **we integrated** Mistral AI with structured output generation, **resulting in** automated flashcard creation that maintains high quality and relevance.

```typescript
// AI Generation System
const response = await generateObject({
  model: mistral("mistral-large-latest"),
  schema: flashcardSchema,
  system: "You are a flashcard generator...",
  prompt: "Generate flashcards from: " + text_chunk,
});
```

### 3. Adaptive Testing System

**Because** effective learning requires assessment, **we built** an AI-powered test generation system that creates multiple-choice questions from flashcards, **resulting in** personalized quizzes that reinforce learning objectives.

### 4. Subscription & Monetization

**Because** sustainable development requires revenue, **we implemented** a freemium model with Stripe integration, **resulting in** controlled access to premium features while maintaining free tier value.

| Feature        | Free Tier | Premium   |
| -------------- | --------- | --------- |
| Tables         | 3         | Unlimited |
| Books          | 3         | Unlimited |
| Chapters       | 5         | Unlimited |
| AI Generations | 5         | Unlimited |
| Tests          | 3         | Unlimited |

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Firebase project
- Clerk account
- Mistral AI API key
- Stripe account

### Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/p/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/p/dashboard

# Firebase
FIREBASE_API_KEY=

# AI Integration
MISTRAL_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Application
BASE_URL=http://localhost:3000
```

### Installation & Running

```bash
# Clone the repository
git clone <repository-url>
cd ai-flashfire

# Install dependencies
npm install

# Set up environment variables
cp .env.template .env.local
# Fill in your environment variables

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Set up the following collections:
   - `tables`
   - `books`
   - `chapters`
   - `flashcards`
   - `tests`
   - `subscriptions`

## 🔐 Security & Performance

### Authentication Flow

- **Clerk Middleware**: Protects all `/p/*` routes
- **Firebase Rules**: User-scoped data access
- **API Validation**: Zod schemas for all inputs

### Performance Optimizations

- **React Query**: Intelligent caching and background updates
- **Chunked AI Processing**: Handles large documents efficiently
- **Optimistic Updates**: Immediate UI feedback
- **Image Optimization**: Next.js automatic optimization

## 🚀 Deployment

### Vercel Deployment (Recommended)

```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
# Configure custom domain if needed
```

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy static files to your hosting provider
# Set up environment variables
# Configure database connections
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://flashfire.vercel.app](https://flashfire.vercel.app)
- **Documentation**: [API Documentation](docs/api.md)
- **Support**: [Issues](https://github.com/your-username/ai-flashfire/issues)

---

**Built with ❤️ by [Spitfire Kasnoviz](https://adanayaz.com)**

_Revolutionizing learning through intelligent automation and adaptive technology._
