// data.js
const monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const categories = ["News", "Culture", "Community", "Business", "Lifestyle"];

// This will hold all 170+ magazines
let magazineDatabase = [];

// Generate the archive from 2012 to 2026 (Stopping at September 2026)
for (let year = 2026; year >= 2012; year--) {
    let startMonth = (year === 2026) ? 8 : 11; // 8 is September (0-indexed)
    
    for (let month = startMonth; month >= 0; month--) {
        // Randomly assign a category for the prototype
        let randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        magazineDatabase.push({
            id: `${year}-${month + 1}`,
            year: year,
            monthName: monthsEN[month],
            title: `${monthsEN[month]} ${year} Edition`,
            category: randomCategory,
            coverImage: `https://via.placeholder.com/300x400/eeeeee/888888?text=${monthsEN[month]}+${year}`,
            pdfLink: "#",
            readLink: "#"
        });
    }
}

console.log(`Database loaded with ${magazineDatabase.length} issues.`);