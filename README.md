# Personal Portfolio over GitHub Pages

A clean, modern, and static personal portfolio built with HTML, CSS, and vanilla JavaScript. 
Designed to be instantly deployable to GitHub Pages without any build steps or heavy frameworks.

## Features
- **Modern UI**: Dark-themed aesthetic with glassmorphism, subtle animations, and gradients.
- **Dynamic Content rendering**: Edit a simple `projects.json` rather than wrangling HTML. Category filtering built-in.
- **Responsive**: Fully optimized for mobile, tablet, and desktop viewing.
- **Zero Build Step**: Just commit the code. It relies on standard browser APIs. 

## Structure
- `index.html` - The main layout, sections, navigation, and SEO tags.
- `styles.css` - Custom CSS properties, grid layout, animations, and typography.
- `script.js` - Minimal JS logic to fetch the JSON file, render cards, handle scroll-spy navbar, and intersection observer animations.
- `projects.json` - The data source for your portfolio content.

## How to Update Content

1. **Basic Information**:
   Open `index.html` and edit the static text (e.g., your Name, the Hero section descriptions, About section text, and Footer links). Search for "Your Name" and "yourusername" to quickly replace the placeholders.
2. **Adding/Editing Projects**:
   Open `projects.json`. Each entry requires the following structure:
   ```json
   {
    "id": "project-id",
    "title": "Project Name",
    "description": "Short description of what the project does.",
    "techStack": ["React", "Python"],
    "category": "AI",
    "featured": true,
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://...",
    "imageUrl": "assets/project.jpg"
   }
   ```
   *Note: If `imageUrl` is left empty, the site automatically generates a clean styled placeholder using the project's initials.*

3. **Categories**:
   If you change the `category` strings in the JSON file, remember to update the corresponding filter buttons in `index.html`: `<button class="filter-btn" data-filter="New Category">New Category</button>`.

## Deployment to GitHub Pages

Since this uses a `User Site` paradigm, follow these simple steps to deploy:

1. Create a new public repository named exactly `yourusername.github.io` (replacing `yourusername` with your exact GitHub username).
2. Upload these files to the root of the `main` or `master` branch.
3. In the repository settings, go to the **Pages** tab.
4. Under "Build and deployment", ensure the source is set to **Deploy from a branch**.
5. Select your main branch and `/ (root)` folder. Save.
6. Wait 1-2 minutes for the GitHub Actions runner to complete the build.
7. Visit `https://yourusername.github.io` to see your live portfolio!

## Local Development

If you want to view the site on your computer before pushing to GitHub:

Because the site fetches `projects.json` via a network request, opening `index.html` directly from your file system (`file://` protocol) will result in a CORS error. 

To view it locally, serve it over a simple HTTP server. 
If you have Python installed, open terminal in this folder and run:
`python -m http.server 8000`

Then open `http://localhost:8000` in your web browser.
