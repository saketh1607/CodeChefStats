# Software Requirements Specification (SRS)
## CodeChef Stats Viewer

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a detailed description of the CodeChef Stats Viewer web application. This document outlines the functional and non-functional requirements, user interface specifications, and system architecture for the application.

### 1.2 Scope
CodeChef Stats Viewer is a web-based application that allows users to search for any CodeChef user and view their profile statistics, contest performance history, and activity data in a visually appealing format.

### 1.3 Definitions, Acronyms, and Abbreviations
- **CodeChef**: An online competitive programming platform
- **API**: Application Programming Interface
- **SRS**: Software Requirements Specification
- **UI**: User Interface
- **HTML**: HyperText Markup Language
- **CSS**: Cascading Style Sheets

---

## 2. Overall Description

### 2.1 Product Perspective
CodeChef Stats Viewer is a single-page web application that integrates with the CodeChef platform through a third-party API to fetch and display user statistics. The application provides a clean, intuitive interface for viewing competitive programming statistics.

### 2.2 Product Features

#### Core Features
1. **User Search**
   - Text input field for entering CodeChef username
   - Search button to initiate data fetch
   - Input validation (non-empty username required)

2. **Profile Display**
   - Profile picture
   - User full name
   - Current rating
   - Highest rating achieved
   - Global rank and country rank
   - Star rating
   - Direct link to CodeChef profile page

3. **Activity Heatmap**
   - Visual representation of user activity over time
   - Bar chart displaying activity levels
   - Date-based activity tracking

4. **Contest Performance**
   - Line chart showing rating progression over contests
   - Detailed contest table with:
     - Contest name
     - Contest date
     - Rating achieved
     - Rank obtained

5. **Footer Section**
   - Application branding
   - Contact information
   - Social media links (Facebook, Instagram, Twitter, LinkedIn)

### 2.3 User Characteristics
- Target users: Competitive programmers, CodeChef users, coding enthusiasts
- User skill level: Any level of technical proficiency
- User needs: Quick access to CodeChef profile statistics without visiting the CodeChef website

---

## 3. Functional Requirements

### 3.1 User Interface Requirements

#### 3.1.1 Layout Structure
- **Header**: Application title "Stats Viewer"
- **Main Content Area**:
  - Username input section
  - Profile card (hidden by default)
  - Activity heatmap section (hidden by default)
  - Contest performance section (hidden by default)
- **Footer**: Contact info and social links

#### 3.1.2 Visual Design
- **Color Scheme**:
  - Primary: Green (#4CAF50)
  - Dark Green (Hover): #388E3C
  - Background: Image from Unsplash
  - Text: #333 (dark gray)
  - Footer: #333 (dark background)
- **Typography**:
  - Font Family: Poppins (Google Fonts)
  - Heading sizes: 2rem (h1), 1.5rem (h3)
  - Body text: 1rem
- **Spacing**:
  - Container max-width: 800px
  - Padding: 20px
  - Margins: 20px between sections

#### 3.1.3 Components
- **Input Field**: Text input with placeholder "Enter username here"
- **Search Button**: Green background, white text, hover effect
- **Profile Card**: White background, rounded corners (10px), shadow
- **Charts**: Canvas elements with responsive sizing
- **Table**: Striped rows, green header, shadow effect

### 3.2 Functional Requirements

#### FR-1: User Search
- The system shall accept a CodeChef username as input
- The system shall validate that the username is not empty
- The system shall display an error message if the username is empty
- The system shall fetch user data from the API on button click

#### FR-2: Data Fetching
- The system shall call the API endpoint: `https://codechef-api.vercel.app/handle/{username}`
- The system shall handle API errors gracefully
- The system shall display an alert if the user is not found or API fails

#### FR-3: Profile Display
- The system shall display the user's profile picture
- The system shall display the user's full name
- The system shall display the current rating
- The system shall display the highest rating achieved
- The system shall display global rank and country rank
- The system shall display star rating

#### FR-4: Activity Heatmap
- The system shall extract heatmap data from the API response
- The system shall render a bar chart using Chart.js
- The system shall display dates on the X-axis
- The system shall display activity values on the Y-axis

#### FR-5: Contest Performance
- The system shall extract rating data from the API response
- The system shall render a line chart showing rating progression
- The system shall populate a table with contest details
- The table shall include: Contest name, Date, Rating, Rank

#### FR-6: Profile Link
- The system shall provide a button to navigate to the user's CodeChef profile
- The link shall direct to: `https://www.codechef.com/users/{username}`

### 3.3 Data Flow & Processing

#### API Response Structure (Expected)
```json
{
  "name": "string",
  "profile": "url",
  "currentRating": "number",
  "highestRating": "number",
  "globalRank": "number",
  "countryRank": "number",
  "stars": "string",
  "heatMap": [
    { "date": "string", "value": "number" }
  ],
  "ratingData": [
    {
      "name": "string",
      "rating": "number",
      "rank": "number",
      "getday": "string",
      "getmonth": "string",
      "getyear": "string"
    }
  ]
}
```

#### Key Modules/Classes/Functions

| Module | Responsibility |
|--------|----------------|
| `fetch-stats` Event Handler | Initiates API call when search button is clicked |
| `populateProfile()` | Updates DOM with user profile information |
| `populateHeatmap()` | Renders activity heatmap chart |
| `populateContestPerformance()` | Renders rating chart and contest table |
| `profilelink()` | Opens CodeChef profile in new tab |

### 3.4 Edge Cases

1. **Empty Username**: Display alert "Please enter a valid username!"
2. **User Not Found**: Display alert "User not found or API error!"
3. **API Failure**: Display alert "Failed to fetch data. Please try again later."
4. **No Contest Data**: Handle gracefully without crashing
5. **Network Issues**: Display appropriate error message

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- Page should load within 3 seconds
- API response should be processed within 2 seconds
- Charts should render within 1 second

### 4.2 Usability Requirements
- Intuitive user interface
- Responsive design for various screen sizes
- Clear error messages
- Loading states should be user-friendly

### 4.3 Compatibility Requirements
- Compatible with modern browsers (Chrome, Firefox, Edge, Safari)
- Responsive design for mobile and desktop devices

### 4.4 Maintainability Requirements
- Clean, well-organized code structure
- Separation of concerns (HTML, CSS, JavaScript)
- Use of external libraries (Chart.js) for complex visualizations

---

## 5. Technical Architecture

### 5.1 Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: Chart.js (v4.x)
- **External Resources**:
  - Google Fonts (Poppins)
  - Font Awesome (v6.0.0)
  - CodeChef API (Vercel)

### 5.2 File Structure
```
CodeChefStats/
├── index.html      # Main HTML file
├── script.js       # JavaScript logic
├── style.css       # Styling
```

### 5.3 External Dependencies
| Library | Version | Purpose |
|---------|---------|---------|
| Chart.js | 4.x | Data visualization |
| Font Awesome | 6.0.0 | Icons |
| Google Fonts | - | Typography |

---

## 6. Acceptance Criteria

### 6.1 Success Conditions

| ID | Criterion | Test Method |
|----|-----------|-------------|
| AC-1 | User can enter a CodeChef username | Input test |
| AC-2 | Valid username displays profile information | Enter known username |
| AC-3 | Invalid username shows error message | Enter random string |
| AC-4 | Empty username shows validation error | Click search without input |
| AC-5 | Activity heatmap renders correctly | Verify chart displays |
| AC-6 | Contest performance chart renders correctly | Verify line chart displays |
| AC-7 | Contest table populates with data | Verify table content |
| AC-8 | Profile link navigates to CodeChef | Click button |
| AC-9 | UI is responsive | Test on different screen sizes |

### 6.2 Visual Checkpoints
- [ ] Header displays "Stats Viewer" in green
- [ ] Profile card has white background with shadow
- [ ] Buttons have green background with hover effect
- [ ] Charts render within container bounds
- [ ] Table has green header row
- [ ] Footer displays social links

---

## 7. Future Enhancements

Possible improvements for future versions:
- Dark mode toggle
- Compare multiple users
- Export data to CSV/PDF
- Filter contests by type
- Add rating prediction
- Save favorite users

---

## 8. Appendix

### A. API Reference
- **Base URL**: `https://codechef-api.vercel.app/handle/{username}`
- **Method**: GET
- **Response Format**: JSON

### B. Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

**Document Version**: 1.0  
**Created**: 2025  
**Project Name**: CodeChef Stats Viewer

