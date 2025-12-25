// Metro Projects Dashboard - Data Fetching from External Source
// Fetch metro data from external JSON file instead of hardcoding

let metroProjects = [];
let lastDataUpdate = null;

// Load metro data from metro-data.json
async function loadMetroProjects() {
  try {
    console.log('Fetching metro project data...');
    const response = await fetch('./metro-data.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    metroProjects = data.projects;
    lastDataUpdate = data.lastUpdated;
    
    console.log('✅ Metro projects loaded successfully');
    console.log(`📊 Loaded ${metroProjects.length} projects`);
    console.log(`⏰ Last updated: ${lastDataUpdate}`);
    
    // Initialize dashboard
    renderProjects(metroProjects);
    updateKPIs(metroProjects);
    updateTimestamp();
  } catch (error) {
    console.error('❌ Failed to load metro data:', error);
    // Show error to user
    const container = document.getElementById('projectsContainer');
    if (container) {
      container.innerHTML = '<div style="color: red; padding: 20px; text-align: center;"><strong>Error Loading Data</strong><br>Please refresh the page or try again later.</div>';
    }
  }
}

// Start auto-update mechanism
function startAutoDataUpdate() {
  loadMetroProjects(); // Initial load
  
  setInterval(async () => {
    try {
      const response = await fetch('./metro-data.json?t=' + Date.now());
      const newData = await response.json();
      
      // Check if data has changed
      if (JSON.stringify(newData.projects) !== JSON.stringify(metroProjects)) {
        console.log('🔄 New data detected, updating dashboard...');
        metroProjects = newData.projects;
        lastDataUpdate = newData.lastUpdated;
        
        // Re-render with updated data
        renderProjects(metroProjects);
        updateKPIs(metroProjects);
        updateTimestamp();
      } else {
        console.log('No data changes detected');
      }
    } catch (error) {
      console.error('Auto-update failed:', error);
    }
  }, 300000); // 5 minutes
}

// Update timestamp display
function updateTimestamp() {
  const updateEl = document.getElementById('update-time');
  if (updateEl) {
    const now = new Date();
    updateEl.textContent = now.toLocaleString();
  }
  
  const lastUpdateEl = document.getElementById('last-update');
  if (lastUpdateEl && lastDataUpdate) {
    const updateDate = new Date(lastDataUpdate);
    lastUpdateEl.innerHTML = `📊 Data last synchronized: ${updateDate.toLocaleString()}`;
  }
}

// Calculate and update KPIs
function updateKPIs(projects) {
  const totalProjects = projects.length;
  const operationalLines = projects.filter(p => p.status === 'operational').length;
  const totalLength = projects.reduce((sum, p) => sum + p.lengthKm, 0).toFixed(2);
  const totalStations = projects.reduce((sum, p) => sum + p.noOfStations, 0);
  const completedProjects = projects.filter(p => p.status === 'operational').length;
  const ongoingProjects = projects.filter(p => p.status === 'under_construction').length;
  
  document.getElementById('total-projects').textContent = totalProjects;
  document.getElementById('total-km').textContent = totalLength;
  document.getElementById('completed').textContent = completedProjects;
  document.getElementById('ongoing').textContent = ongoingProjects;
  
  console.log('KPIs Updated:', { totalProjects, totalLength, totalStations });
}

// Render projects in dashboard
function renderProjects(projects) {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  
  if (projects.length === 0) {
    container.innerHTML = '<div style="color: #666; padding: 20px; text-align: center;">No projects found. Data is loading...</div>';
    return;
  }
  
  let html = '';
  projects.forEach(project => {
    const statusColor = project.status === 'operational' ? '#00b050' : 
                       project.status === 'under_construction' ? '#fdb913' : '#ccc';
    
    html += `
      <div class="project-card" style="border-left: 5px solid ${project.lineColor || '#667eea'};">
        <div class="project-header" style="display: flex; justify-content: space-between; align-items: center;">
          <h3>${project.name}</h3>
          <span style="background: ${statusColor}; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px;">
            ${project.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <p><strong>📍 Location:</strong> ${project.city}, ${project.country}</p>
        <p><strong>📯 Length:</strong> ${project.lengthKm} km | <strong>🚵 Stations:</strong> ${project.noOfStations}</p>
        <p><strong>💵 Investment:</strong> ${project.investment}</p>
        <p><strong>📋 Description:</strong> ${project.description}</p>
        <p style="color: #999; font-size: 12px;"><strong>Route:</strong> ${project.fromStation} → ${project.toStation}</p>
      </div>
    `;
  });
  
  container.innerHTML = html;
  console.log(`Rendered ${projects.length} projects`);
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing Metro Dashboard...');
  startAutoDataUpdate();
});

// Also initialize if page is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startAutoDataUpdate);
} else {
  startAutoDataUpdate();
}
