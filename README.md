# 🏥 MediStore - Online Medicine Store

A modern, full-featured online medicine store built with Next.js 15, featuring role-based access control, advanced search functionality, and a responsive design.

## 🌟 Features

### 🔐 Authentication & Authorization
- **Multi-role system**: Admin, Seller, Customer roles
- **Secure authentication** with Better Auth
- **Google OAuth integration**
- **Role-based UI components** and route protection
- **Session management** with automatic redirects

### 🛒 E-commerce Functionality
- **Product catalog** with advanced filtering
- **Shopping cart** with local storage persistence
- **Wishlist functionality**
- **Order management system**
- **Inventory tracking**
- **Review and rating system**

### 🔍 Advanced Search & Filtering
- **Real-time search** by name, brand, description
- **Category filtering**
- **Price range filtering**
- **Sorting options** (name, price, date)
- **Mobile-optimized filter sheet**
- **Quick filter suggestions**

### 📱 Modern UI/UX
- **Responsive design** for all devices
- **Clean, modern interface** with Tailwind CSS
- **Interactive components** with Radix UI
- **Loading states** and skeleton screens
- **Toast notifications** with Sonner
- **Dark mode support**

### 👥 Role-Based Features

#### 🔧 Admin Dashboard
- User management and role assignment
- Category management
- Order oversight and status updates
- System analytics and reporting

#### 🏪 Seller Dashboard
- Medicine inventory management
- Order processing and fulfillment
- Sales analytics
- Product creation and editing

#### 🛍️ Customer Features
- Browse and search medicines
- Shopping cart and wishlist
- Order tracking
- Review and rating system

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

### Authentication & State
- **Better Auth** - Modern authentication solution
- **Zod** - Schema validation
- **TanStack Form** - Powerful form handling
- **SWR** - Data fetching and caching

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Tailwind CSS v4** - Latest CSS framework

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-medistore
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   
   Copy the environment variables and configure for your setup:
   ```bash
   cp .env.example .env
   ```

   **Development Environment:**
   ```env
   AUTH_URL=http://localhost:8080/api/auth
   BASE_URL=http://localhost:8080
   BACKEND_URL=http://localhost:8080
   FRONTEND_URL=http://localhost:3000
   API_URL=http://localhost:8080
   NEXT_PUBLIC_AUTH_URL=http://localhost:8080
   ```

   **Production Environment:**
   ```env
   AUTH_URL=https://your-domain.vercel.app/api/auth
   BASE_URL=https://your-domain.vercel.app
   BACKEND_URL=https://your-domain.vercel.app
   FRONTEND_URL=https://your-domain.vercel.app
   API_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_AUTH_URL=https://your-domain.vercel.app
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
frontend-medistore/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (mainlayout)/      # Main layout group
│   │   │   ├── shop/          # Shop pages
│   │   │   ├── login/         # Authentication
│   │   │   └── register/      # User registration
│   │   ├── (desboardLayout)/  # Dashboard layout
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI components
│   │   ├── auth/              # Authentication components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── module/            # Feature modules
│   │   └── layout/            # Layout components
│   ├── lib/                   # Utility libraries
│   ├── service/               # API services
│   ├── action/                # Server actions
│   ├── constants/             # App constants
│   └── hooks/                 # Custom React hooks
├── types/                     # TypeScript type definitions
├── public/                    # Static assets
└── scripts/                   # Build and deployment scripts
```

## 🎯 Key Components

### Authentication System
- **Login/Register forms** with validation
- **Role-based redirects** after authentication
- **Session persistence** and management
- **Google OAuth integration**

### Shop Interface
- **Advanced search filters** with real-time updates
- **Product cards** with wishlist and cart functionality
- **Responsive grid layout** (1-5 columns based on screen size)
- **Pagination** with smart page number display

### Dashboard System
- **Role-specific dashboards** for Admin, Seller, Customer
- **Sidebar navigation** with role-based menu items
- **Data management interfaces**
- **Analytics and reporting**

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Run TypeScript compiler
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm run start
```

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `AUTH_URL` | Authentication service URL | `https://api.example.com/auth` |
| `BASE_URL` | Base application URL | `https://example.com` |
| `BACKEND_URL` | Backend API URL | `https://api.example.com` |
| `FRONTEND_URL` | Frontend application URL | `https://example.com` |
| `API_URL` | API endpoint URL | `https://api.example.com` |
| `NEXT_PUBLIC_AUTH_URL` | Public auth URL for client | `https://api.example.com` |

## 👥 User Roles & Permissions

### 🔧 Admin
- Full system access
- User management
- Category management
- Order oversight
- System configuration

### 🏪 Seller
- Medicine inventory management
- Order processing
- Sales analytics
- Product management

### 🛍️ Customer
- Browse products
- Shopping cart
- Order placement
- Review system

## 🎨 UI Components

### Base Components (Radix UI)
- Alert Dialog, Avatar, Dialog
- Dropdown Menu, Label, Select
- Separator, Slot, Tooltip

### Custom Components
- **SearchFilters** - Advanced filtering interface
- **MobileFilterSheet** - Mobile-optimized filters
- **Shop** - Product card component
- **RoleGuard** - Role-based access control

## 🚀 Performance Features

- **Server-side rendering** with Next.js App Router
- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **Caching strategies** with SWR
- **Optimized bundle size**

## 🔍 Search & Filter Features

- **Text search** across name, brand, description
- **Category filtering** with autocomplete
- **Price range** with min/max inputs
- **Sorting options** (name, price, date)
- **Active filter display** with remove buttons
- **Quick filter suggestions**
- **Mobile-optimized** filter sheet

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoint system**: sm, md, lg, xl, 2xl
- **Grid layouts**: 1-5 columns based on screen size
- **Touch-friendly** interfaces
- **Optimized navigation** for mobile

## 🛠️ Development Guidelines

### Code Style
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Component-based** architecture

### Best Practices
- **Server components** by default
- **Client components** only when needed
- **Proper error handling**
- **Accessibility compliance**
- **SEO optimization**

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using Next.js 15 and modern web technologies**
