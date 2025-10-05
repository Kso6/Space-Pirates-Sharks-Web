#!/bin/bash

# Sharks from Space - Quick Deploy Script
# Team: Space Pirates | NASA Space Apps Challenge 2025

set -e

echo "🦈 Deploying Sharks from Space to your domain..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js 18+ recommended. You have Node.js $NODE_VERSION"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run tests/lints if they exist
if grep -q "\"test\"" package.json; then
    echo "🧪 Running tests..."
    npm test || true
fi

# Build the project
echo "🏗️  Building production bundle..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist directory not found."
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📊 Build size:"
du -sh dist/

# Ask for deployment method
echo ""
echo "Choose deployment method:"
echo "1) GitHub Pages (commit and push)"
echo "2) Netlify (deploy now)"
echo "3) Vercel (deploy now)"
echo "4) Just build (manual deployment)"
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo "📤 Preparing GitHub Pages deployment..."
        
        # Check if git repo
        if [ ! -d ".git" ]; then
            echo "Initializing git repository..."
            git init
            git branch -M main
        fi
        
        # Commit and push
        git add .
        TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
        git commit -m "Deploy: $TIMESTAMP" || echo "No changes to commit"
        
        # Check if remote exists
        if ! git remote get-url origin > /dev/null 2>&1; then
            echo "⚠️  No git remote found. Please add your repository:"
            echo "   git remote add origin https://github.com/YOUR_USERNAME/sharks-from-space.git"
            exit 1
        fi
        
        git push origin main
        echo ""
        echo "✅ Pushed to GitHub! GitHub Actions will deploy automatically."
        echo "🌐 Your site will be live at your custom domain in a few minutes"
        echo "📊 Check deployment status: https://github.com/YOUR_USERNAME/YOUR_REPO/actions"
        ;;
        
    2)
        echo "🚀 Deploying to Netlify..."
        
        # Check if netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        netlify deploy --prod --dir=dist
        echo ""
        echo "✅ Deployed to Netlify!"
        echo "🌐 Don't forget to configure your custom domain in Netlify dashboard"
        ;;
        
    3)
        echo "🚀 Deploying to Vercel..."
        
        # Check if vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        vercel --prod
        echo ""
        echo "✅ Deployed to Vercel!"
        echo "🌐 Don't forget to add your custom domain in Vercel dashboard"
        ;;
        
    4)
        echo "✅ Build complete! Files are in the dist/ directory"
        echo "📁 Upload the contents of dist/ to your hosting provider"
        ;;
        
    *)
        echo "Invalid choice. Build files are in dist/ directory."
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🦈 Sharks from Space - Space Pirates"
echo "🌐 Your custom domain"
echo "🛰️  NASA Space Apps Challenge 2025"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Configure DNS in your registrar (see DEPLOYMENT.md)"
echo "2. Wait for DNS propagation (usually 15 minutes)"
echo "3. Enable SSL/HTTPS in your hosting provider"
echo "4. Test your site at your custom domain"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"

