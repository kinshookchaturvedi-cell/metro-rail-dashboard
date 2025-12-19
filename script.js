// Sample Metro Projects Data
const metroProjects = [
  // India Metro Projects
  {
    id: 1,
    name: 'Delhi Metro Expansion',
    city: 'Delhi',
    country: 'India',
    region: 'india',
    status: 'ongoing',
    completionYear: 2026,
    lengthKm: 45,
    investment: '$5.2B',
    description: 'Expansion of existing metro network with new lines'
  },
  {
    id: 2,
    name: 'Bangalore Metro Phase 2',
    city: 'Bangalore',
    country: 'India',
    region: 'india',
    status: 'ongoing',
    completionYear: 2025,
    lengthKm: 72,
    investment: '$3.8B',
    description: 'Extension of existing metro to outer areas'
  },
  {
    id: 3,
    name: 'Mumbai Metro Line 6',
    city: 'Mumbai',
    country: 'India',
    region: 'india',
    status: 'completed',
    completionYear: 2023,
    lengthKm: 14.5,
    investment: '$2.2B',
    description: 'New metro line connecting Central Mumbai'
  },
  {
    id: 4,
    name: 'Hyderabad Metro Phase 3',
    city: 'Hyderabad',
    country: 'India',
    region: 'india',
    status: 'planned',
    completionYear: 2027,
    lengthKm: 33,
    investment: '$2.5B',
    description: 'Third phase of metro expansion'
  },
  {
    id: 5,
    name: 'Kolkata East-West Metro',
    city: 'Kolkata',
    country: 'India',
    region: 'india',
    status: 'delayed',
    completionYear: 2026,
    lengthKm: 16.5,
    investment: '$1.8B',
    description: 'Underground metro connecting east and west'
  },
  // World Metro Projects
  {
    id: 6,
    name: 'Paris Metro Line 18',
    city: 'Paris',
    country: 'France',
    region: 'world',
    status: 'ongoing',
    completionYear: 2025,
    lengthKm: 37,
    investment: '€5.3B',
    description: 'New automated driverless metro line'
  },
  {
    id: 7,
    name: 'London Elizabeth Line',
    city: 'London',
    country: 'UK',
    region: 'world',
    status: 'completed',
    completionYear: 2022,
    lengthKm: 73,
    investment: '£14.8B',
    description: 'Cross-London rail link'
  },
  {
    id: 8,
    name: 'Tokyo Metro Shinjuku',
    city: 'Tokyo',
    country: 'Japan',
    region: 'world',
    status: 'ongoing',
    completionYear: 2026,
    lengthKm: 12.3,
    investment: '$2.1B',
    description: 'New line connecting Shinjuku areas'
  },
  {
    id: 9,
    name: 'Singapore MRT Thomson',
    city: 'Singapore',
    country: 'Singapore',
    region: 'world',
    status: 'ongoing',
    completionYear: 2027,
    lengthKm: 43,
    investment: 'SGD 5.7B',
    description: 'New metro line in northern region'
  },
  {
    id: 10,
    name: 'Sydney Metro Phase 2',
    city: 'Sydney',
    country: 'Australia',
    region: 'world',
    status: 'planned',
    completionYear: 2028,
    lengthKm: 28,
    investment: 'AUD 10B',
    description: 'Second phase of metro expansion'
  }
];

let currentRegion = 'all';
let filteredProjects = metroProjects;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateKPIs(metroProjects);
  displayProjects(metroProjects);
  updateLastUpdated();
  startAutoUpdate();
});

// Setup Event Listeners
function setupEventListeners() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRegion = btn.dataset.region;
      filterAndDisplayProjects();
    });
  });
  
  searchInput.addEventListener('input', filterAndDisplayProjects);
  statusFilter.addEventListener('change', filterAndDisplayProjects);
}

// Calculate and Display KPIs
function updateKPIs(projects) {
  const totalProjects = projects.length;
  const totalKm = projects.reduce((sum, p) => sum + p.lengthKm, 0).toFixed(1);
  const completedCount = projects.filter(p => p.status === 'completed').length;
  const ongoingCount = projects.filter(p => p.status === 'ongoing').length;
  
  document.getElementById('totalProjects').textContent = totalProjects;
  document.getElementById('totalKm').textContent = totalKm;
  document.getElementById('completedCount').textContent = completedCount;
  document.getElementById('ongoingCount').textContent = ongoingCount;
}

// Filter and Display Projects
function filterAndDisplayProjects() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const statusTerm = document.getElementById('statusFilter').value;
  
  filteredProjects = metroProjects.filter(project => {
    const matchRegion = currentRegion === 'all' || project.region === currentRegion;
    const matchSearch = project.name.toLowerCase().includes(searchTerm) ||
                        project.city.toLowerCase().includes(searchTerm);
    const matchStatus = !statusTerm || project.status === statusTerm;
    return matchRegion && matchSearch && matchStatus;
  });
  
  displayProjects(filteredProjects);
  updateResultCount();
}

// Display Projects
function displayProjects(projects) {
  const container = document.getElementById('projectsContainer');
  if (projects.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: white;">No projects found matching your criteria</div>';
    return;
  }
  
  container.innerHTML = projects.map(project => `
    <div class="project-card ${project.status}">
      <div class="project-header">
        <div>
          <h3 class="project-title">${project.name}</h3>
          <p class="project-city">📍 ${project.city}, ${project.country}</p>
        </div>
        <span class="status-badge status-${project.status}">${project.status}</span>
      </div>
      <div class="project-details">
        <div class="detail-row">
          <span class="detail-label">Length:</span>
          <span>${project.lengthKm} km</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Investment:</span>
          <span>${project.investment}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Completion:</span>
          <span>${project.completionYear}</span>
        </div>
        <p style="margin-top: 10px; font-size: 0.9em;">${project.description}</p>
      </div>
    </div>
  `).join('');
}

// Update Result Count
function updateResultCount() {
  const count = filteredProjects.length;
  const total = metroProjects.length;
  document.getElementById('resultCount').textContent = `Showing ${count} of ${total} projects`;
}

// Update Last Updated Time
function updateLastUpdated() {
  const now = new Date();
  const timeString = now.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('lastUpdated').textContent = timeString;
}

// Auto-update every 5 minutes
function startAutoUpdate() {
  setInterval(() => {
    updateLastUpdated();
    updateKPIs(metroProjects);
    filterAndDisplayProjects();
    console.log('Auto-update triggered - data refreshed');
  }, 5 * 60 * 1000); // 5 minutes
}
