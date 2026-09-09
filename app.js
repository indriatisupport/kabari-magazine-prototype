// --- ARCHIVE DATABASE LOGIC ---
let currentCategory = 'All';
let currentYear = 2026; 

document.addEventListener('DOMContentLoaded', () => {
    // Only run this if we are actually on the Archive page
    if (document.getElementById('archive-grid')) {
        generateYearNav();
        renderArchive();
        setupEventListeners();
    }
});

function generateYearNav() {
    const yearNav = document.getElementById('dynamic-year-nav');
    if (!yearNav) return;
    
    yearNav.innerHTML = '';
    
    for (let y = 2026; y >= 2012; y--) {
        const span = document.createElement('span');
        span.innerText = y;
        if (y === 2026) span.classList.add('active-year');
        
        span.addEventListener('click', (e) => {
            document.querySelectorAll('.year-nav span').forEach(s => s.classList.remove('active-year'));
            e.target.classList.add('active-year');
            currentYear = y;
            document.getElementById('searchInput').value = ''; 
            renderArchive();
        });
        
        yearNav.appendChild(span);
    }
}

function renderArchive() {
    const grid = document.getElementById('archive-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; 
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    let filtered = magazineDatabase.filter(issue => {
        const matchesCat = currentCategory === 'All' || issue.category === currentCategory;
        const matchesSearch = issue.title.toLowerCase().includes(searchTerm) || issue.year.toString().includes(searchTerm);
        
        if (searchTerm !== '') {
            return matchesSearch && matchesCat;
        } else {
            return issue.year === currentYear && matchesCat;
        }
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem;">No issues found matching your criteria.</p>';
        return;
    }

    filtered.forEach(issue => {
        const card = document.createElement('div');
        card.className = 'issue-card';
        card.innerHTML = `
            <div class="issue-cover" style="background-image: url('${issue.coverImage}'); background-size: cover; background-position: center;"></div>
            <span style="font-size: 0.8rem; color: #d4af37; font-weight: bold; text-transform: uppercase;">${issue.category}</span>
            <h4 style="margin-top: 0.5rem;">${issue.title}</h4>
            <div class="issue-links" style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; font-size: 0.85rem; font-weight: bold; color: #d4af37;">
                <a href="${issue.readLink}">Read Online</a>
                <a href="${issue.pdfLink}">Download PDF</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const catTabs = document.querySelectorAll('#category-tabs li');

    if (searchInput) {
        searchInput.addEventListener('input', () => renderArchive());
    }

    catTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            catTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.getAttribute('data-en');
            renderArchive();
        });
    });
}