#!/bin/bash

# Deploy to GitHub Pages (gh-pages branch)
set -e

echo "🦈 Building for GitHub Pages..."

# Build the project
npm run build

echo "✅ Build complete!"

# Navigate into the build output directory
cd dist

# Initialize git if not already
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

# Add all files
git add -A

# Commit
git commit -m "Deploy to GitHub Pages: $(date)" || echo "No changes to commit"

# Push to gh-pages branch
echo "📤 Pushing to gh-pages branch..."
git push -f https://github.com/Kso6/Space-Pirates-Sharks-Web.git gh-pages:gh-pages

cd ..

echo "✅ Deployed to GitHub Pages!"
echo "🌐 Site will be live at https://globalsharks.wiki in a few minutes"
