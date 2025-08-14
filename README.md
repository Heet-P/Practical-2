# Personal WDF Lab Dashboard Website

A personal portfolio and WDF (Web Development and Framework) practical dashboard website built using only HTML, CSS, and vanilla JavaScript. This project features an interactive animated timeline showing practicals and a professor view for reviewing them.

## Features

- **Responsive Design**: Mobile, tablet, and desktop friendly layouts
- **Dark/Light Mode**: Toggle between color themes with persistent preference
- **Interactive Timeline**: Animated timeline with parallax scrolling effects
- **Dashboard View**: Grid layout of practical cards with preview images
- **Professor Access**: Secure login for professors to view and provide feedback
- **Accessibility**: Keyboard navigation, ARIA labels, and high contrast design

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox, grid, transitions, and animations
- **JavaScript**: ES6+ vanilla JS with no frameworks or libraries
- **Design**: Glassmorphism aesthetic with smooth blur effects and rounded corners

## Project Structure

```
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main stylesheet
│   └── dark-mode.css      # Dark mode specific styles
├── js/
│   ├── main.js            # General functionality
│   ├── timeline.js        # Timeline functionality
│   ├── dashboard.js       # Dashboard functionality
│   └── dark-mode.js       # Theme toggle functionality
└── assets/
    └── images/            # Project images
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser

## Usage

- Navigate through sections using the navbar
- Toggle between light and dark mode using the sun/moon icon
- Scroll through the timeline to see practicals in chronological order
- View the dashboard grid for a complete overview of all practicals
- Professors can log in using the button in the footer

## Professor Login (Demo)

- Email: professor@example.com
- Password: password123

## Customization

To personalize this dashboard:

1. Update your profile information in `index.html`
2. Replace placeholder images in the `assets/images` folder
3. Modify the sample data in `timeline.js` and `dashboard.js` with your own practical information

## Future Enhancements

- Integration with Supabase for data storage
- PDF upload and download functionality
- Enhanced professor feedback system
- Additional animation effects

## License

This project is available for personal and educational use.

## Author

[Your Name]