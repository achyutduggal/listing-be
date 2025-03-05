const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Choose any port you like
const PORT = 3001;

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * -----------
 * DESIGN #1
 * -----------
 * This matches the original design you already had.
 */
const getHtmlTemplateOne = (data) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Real Estate Listing - ${data.location || 'Indiranagar'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    * {
      margin: 0; padding: 0; box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    body {
      max-width: 800px;
      margin: 0 auto;
    }
    .listing-container {
      position: relative;
      width: 100%;
    }
    .room-image {
      width: 100%;
      height: auto;
      display: block;
    }
    .listing-details {
      background-color: #f9f1df;
      padding: 20px;
      color: #504B38;
    }
    .listing-title {
      color: #504B38;
      font-size: 72px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -2.88px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .golfcourse {
      color: #CE7DA5;
      font-size: 72px;
      font-weight: 500;
      text-transform: uppercase;
    }
    .listing-specs {
      display: flex;
      align-items: center;
      font-size: 24px;
      margin-bottom: 15px;
      color: #504B38;
    }
    .spec-divider {
      margin: 0 15px;
      color: #504B38;
    }
    .contact-info {
      text-align: right;
      font-size: 24px;
      color: #504B38;
      line-height: 1.5;
    }
    .phone {
      font-size: 24px;
      margin-bottom: 5px;
    }
  </style>
</head>
<body>
  <div class="listing-container">
    <img 
      src="${data.imageUrl || '/default-image.jpg'}"
      alt="Property view"
      class="room-image"
    />
    <div class="listing-details">
      <h1 class="listing-title">
        OVERLOOKING 
        <span class="golfcourse">${data.highlight || 'GOLFCOURSE'}</span><br />
        ${data.location || 'INDIRANAGAR'}, ${data.subLocation || 'AHEAD'}
      </h1>
      <div class="listing-specs">
        <span>${data.beds || '1'} Bed</span>
        <span class="spec-divider">|</span>
        <span>${data.baths || '3'} Bath</span>
        <span class="spec-divider">|</span>
        <span>${data.sqft || '1020'} sqft</span>
      </div>
      <div class="contact-info">
        <div class="phone">${data.phone || '+123 456 7890'}</div>
        <div class="email">${data.email || 'realtor@gmail.com'}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
};

/**
 * -----------
 * DESIGN #2
 * -----------
 * This version includes the red-blob SVG as a background “hero” shape.
 * You can customize positioning, text styling, etc.
 */
const getHtmlTemplateTwo = (data) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Real Estate Listing - ${data.location || 'Indiranagar'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    * {
      margin: 0; padding: 0; box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    body {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }
    .blob-svg {
      position: absolute;
      top: -200px;
      left: -300px;
      width: 1080px;
      height: 549px;
      z-index: -1; /* behind content */
    }
    .content-wrapper {
      position: relative;
      padding: 40px;
      color: white; /* Because the blob is behind, let's assume white text */
    }
    .listing-title {
      font-size: 48px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    .highlight {
      color: #FFE08A; /* a highlight color over the red gradient */
    }
    .property-info {
      font-size: 20px;
      margin-bottom: 2rem;
    }
    .contact-info {
      font-size: 20px;
      text-align: right;
    }
    .room-image {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <!-- Red Blob SVG as a background element -->
  <svg 
    class="blob-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1080 549"
    fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M690.118 76.0187C933.996 45.5679 1247.33 -100.65 1355.57 119.97C1462.51 337.947 1138.13 477.796 975.847 658.414C758.448 900.375 639.429 1362.94 330.617 1260.73C-37.346 1138.93 -213.861 672.744 -101.322 301.879C-13.2575 11.6696 389.146 113.598 690.118 76.0187Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient id="paint0_linear" x1="-110.429" y1="754.706" x2="1247.41" y2="533.722" gradientUnits="userSpaceOnUse">
          <stop stop-color="#EB3349"/>
          <stop offset="1" stop-color="#F45C43"/>
        </linearGradient>
      </defs>
  </svg>

  <div class="content-wrapper">
    <img
      src="${data.imageUrl || '/default-image.jpg'}"
      alt="Property View"
      class="room-image"
    />

    <h1 class="listing-title">
      OVERLOOKING <span class="highlight">${data.highlight || 'GOLFCOURSE'}</span><br>
      ${data.location || 'INDIRANAGAR'}, ${data.subLocation || 'AHEAD'}
    </h1>

    <div class="property-info">
      <strong>${data.beds || '1'} Bed</strong> | 
      <strong>${data.baths || '3'} Bath</strong> |
      <strong>${data.sqft || '1020'} sqft</strong>
    </div>

    <div class="contact-info">
      <div>${data.phone || '+123 456 7890'}</div>
      <div>${data.email || 'realtor@gmail.com'}</div>
    </div>
  </div>
</body>
</html>`;
};

// -------------------------------------
// Endpoint for DESIGN #1 => index1.html
// -------------------------------------
app.post('/update-listing/1', (req, res) => {
  try {
    const userData = req.body;

    // Generate the HTML using the first design
    const htmlContent = getHtmlTemplateOne(userData);

    // Save to public/index1.html
    fs.writeFileSync(path.join(__dirname, 'public', 'index1.html'), htmlContent);

    // Construct the correct file URL
    // e.g., http://your-host/index1.html
    const host = req.headers.host;
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/index1.html`;

    res.json({
      success: true,
      message: 'Property listing (Design 1) updated successfully',
      url: fileUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating property listing for design 1',
      error: error.message
    });
  }
});

// -------------------------------------
// Endpoint for DESIGN #2 => index2.html
// -------------------------------------
app.post('/update-listing/2', (req, res) => {
  try {
    const userData = req.body;

    // Generate the HTML using the second design
    const htmlContent = getHtmlTemplateTwo(userData);

    // Save to public/index2.html
    fs.writeFileSync(path.join(__dirname, 'public', 'index2.html'), htmlContent);

    // Construct the correct file URL
    const host = req.headers.host;
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/index2.html`;

    res.json({
      success: true,
      message: 'Property listing (Design 2) updated successfully',
      url: fileUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating property listing for design 2',
      error: error.message
    });
  }
});

// Default route to serve the form (or any landing page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
