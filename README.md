# 🚇 Metro Rail Projects Dashboard

A modern, auto-updating dashboard showcasing metro rail projects in India and around the world with real-time status tracking.

## 🌟 Features

- **Global Coverage**: Track metro projects in India and worldwide
- **Real-time Updates**: Auto-updates every 5 minutes
- **Advanced Filtering**: Search by project name, city, or filter by status
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Status Tracking**: Track projects by status (Completed, Ongoing, Planned, Delayed)
- **Modern UI**: Beautiful gradient design with smooth animations

## 🏗️ Live Demo

Visit: `https://kinshookchaturvedi-cell.github.io/metro-rail-dashboard/`

## 📊 Data Structure

Each metro project includes:
- Project name and location
- Current status (Completed, Ongoing, Planned, Delayed)
- Completion year
- Project length in kilometers
- Investment amount
- Description

## 🚀 Projects Included

### India
- Delhi Metro Expansion
- Bangalore Metro Phase 2
- Mumbai Metro Line 6
- Hyderabad Metro Phase 3
- Kolkata East-West Metro

### World
- Paris Metro Line 18 (France)
- London Elizabeth Line (UK)
- Tokyo Metro Shinjuku (Japan)
- Singapore MRT Thomson (Singapore)
- Sydney Metro Phase 2 (Australia)

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Hosting**: GitHub Pages
- **Data**: JSON format (in-app data structure)
- **Automation**: GitHub Actions (future enhancement)

## 📦 File Structure

```
.
├── index.html      # Main HTML template
├── styles.css      # Modern styling with gradients
├── script.js       # Application logic and auto-updates
├── README.md       # Documentation
└── .gitignore      # Git ignore rules
```

## ✨ How It Works

1. The dashboard loads with all metro projects from the embedded data
2. Users can filter by region, search projects, and sort by status
3. The page updates timestamps every 5 minutes
4. In production, data would be fetched from a remote API/JSON file

## 🔄 Auto-Update Features

- Automatic timestamp updates every 5 minutes
- Console logging for update events
- Ready to integrate with external data sources
- Built-in support for CSV to JSON conversion via GitHub Actions

## 🎯 Future Enhancements

- [ ] Integration with real project databases
- [ ] GitHub Actions workflow for automated data updates
- [ ] Email notifications for major project updates
- [ ] Interactive map visualization
- [ ] Project timeline view
- [ ] Comparison tools between projects
- [ ] Dark mode support
- [ ] Multi-language support

## 📝 License

Open source project

## 👨‍💻 Author

Created as a demonstration of modern web development practices with auto-update capabilities.
