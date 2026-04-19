document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            if(icon) icon.classList.replace('ph-x', 'ph-list');
        });
    });

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // 5. Load and Render Projects
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let allProjects = [];

    const renderProjects = (projects) => {
        projectsGrid.innerHTML = '';
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = '<div class="loading-state">No projects found for this category.</div>';
            return;
        }

        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = `${index * 0.1}s`; // Staggered entrance
            
            // Generate tags
            const tagsHtml = project.techStack.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');

            // Featured Badge
            const featuredBadge = project.featured 
                ? `<div class="featured-badge"><i class="ph-fill ph-star"></i> Featured</div>`
                : '';

            // Links
            const githubLink = project.githubUrl && project.githubUrl !== '#'
                ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-link"><i class="ph ph-github-logo"></i> Code</a>`
                : '';
                
            const liveLink = project.liveUrl && project.liveUrl !== '#'
                ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-link"><i class="ph ph-arrow-square-out"></i> App Link</a>`
                : '';

            card.innerHTML = `
                ${featuredBadge}
                <div class="card-content">
                    <span class="card-category">${project.category}</span>
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-description">${project.description}</p>
                    <div class="tech-stack">
                        ${tagsHtml}
                    </div>
                    <div class="card-links">
                        ${githubLink}
                        ${liveLink}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });
    };

    // Fetch projects data
    fetch('projects.json?v=' + new Date().getTime())
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allProjects = data;
            // Sort to put featured first by default
            allProjects.sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1);
            renderProjects(allProjects);
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            projectsGrid.innerHTML = `
                <div class="loading-state">
                    <p>Failed to load projects.</p>
                    <p style="font-size: 0.8rem; margin-top: 1rem;">Make sure you are running via a local server (e.g., Live Server, python -m http.server), as fetching local JSON files directly from file:// might be blocked by CORS.</p>
                </div>`;
        });

    // 6. Filter Functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Filter logic
            const filterValue = e.target.getAttribute('data-filter');
            
            projectsGrid.style.opacity = '0'; // Quick fade out for smooth transition
            
            setTimeout(() => {
                let filtered = allProjects;
                if (filterValue !== 'All') {
                    filtered = allProjects.filter(project => project.category === filterValue);
                }
                renderProjects(filtered);
                projectsGrid.style.opacity = '1';
            }, 300);
        });
    });
});
