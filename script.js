let colleges = []; // To hold the fetched data
let currentPage = 1;
const rowsPerPage = 10;
let sortDirection = 'asc';
let allColleges = []; // To keep original data

document.addEventListener("DOMContentLoaded", function() {
    fetch('college.json')
        .then(response => response.json())
        .then(data => {
            allColleges = data; // Store original data
            colleges = allColleges.slice(0, rowsPerPage * currentPage); // Load first set of rows
            displayColleges();
        });

    document.getElementById('search-input').addEventListener('input', filterColleges);
    window.addEventListener('scroll', handleScroll);
});

function displayColleges() {
    const tableBody = document.getElementById('college-body');
    tableBody.innerHTML = ""; // Clear the existing rows

    colleges.forEach(college => {
        const row = document.createElement('tr');
        if (college.featured) {
            row.classList.add('featured');
        }
        row.innerHTML = `
            <td>#${college.rank}</td>
            <td>
                <div class="clg-name">${college.name}</div> 
                <div class="location">${college.location}</div>
                ${college.featured ? '<span class="featured-flag">Featured</span>' : ''}
                <br>
                
                <div class="cutoff">
                <div class="line"></div>
                <div class="cutoff1">
                <span class="stream">B.Tech Computer Science Engineering</span><br>
                <span class="advance">JEE-Advanced 2023 Cutoff:<div>${college.cutoff}</div></span>

                </div>
                </div>

                <div class="common">
                  <div class="orange">Apply Now</div>
                  <div class="green">Download Brochure</div>
                  <div classs="gray">Add To Compare</div>
                </div>
                
            </td>

            <td class="bb">

            <div class="green">${college.fees}</div>
             <div class ="ss">
           <div class="gray">BE/Btech</div>
            <div class="gray">-1st Year Fees</div>
            <div class="orange">Compare Fees</div>
            </td>
            
            <td><div class="green">${college.placement}</div>
            
            <div class="gray">Average Package</div>
           <div class = "ll">
            <div class="green">${college.Highestplacement} </div>
            <div class="gray">Highest Package</div>
            <div class="orange">Compare Placement</div>
            
            </td>
           
            <td>${college.Reviews}/10
           
            <div class="gray">Based on 289 user</div> 
            <div class="gray">Reviews</div>
          
          <span class="kk">Best in social Life ></span><br>
            </td>

            <td>${college.ranking}
            <div>${college.year}<div>
            <div class="year"></div>
            <div class ="pp">
            <div><span class ="blue">${college.more}<div></span>
            
            
            
            
            </td>
            
            
        `;
        tableBody.appendChild(row);
    });

    currentPage++;
}

function sortTable(key) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    colleges.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];
        if (typeof valA === 'string') {
            valA = valA.replace(/[^\d.-]/g, '');
            valB = valB.replace(/[^\d.-]/g, '');
        }
        return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
    displayColleges();
}

function filterColleges() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    colleges = allColleges.filter(college => college.name.toLowerCase().includes(searchTerm));
    resetTable();
}

function resetTable() {
    currentPage = 1;
    document.getElementById('college-body').innerHTML = '';
    displayColleges();
}

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const nextColleges = allColleges.slice(rowsPerPage * (currentPage - 1), rowsPerPage * currentPage);
        if (nextColleges.length > 0) {
            colleges = colleges.concat(nextColleges);
            displayColleges();
        }
    }
}



