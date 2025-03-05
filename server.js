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
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
      }
      
      body {
        font-family: 'Inter', sans-serif;
      }
      
      .container {
        position: relative;
        width: 100%;
        max-width: 1080px;
        margin: 0 auto;
        overflow: hidden;
      }
      
      .property-image {
        width: 100%;
        display: block;
      }
      
      .overlay-curve {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 35%;
        overflow: hidden;
      }
      
      .curve-shape {
        position: absolute;
        bottom: -80px;
        left: -20px;
        width: 110%;
        height: 150%;
        background: linear-gradient(90deg, #EB3349 0%, #F45C43 88.28%);
        border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        transform: rotate(-5deg);
      }
      
      .property-info {
        position: absolute;
        bottom: 20px;
        left: 50px;
        color: white;
        z-index: 10;
        width: 90%;
      }
      
      .property-title {
        font-size: 48px;
        font-weight: bold;
        line-height: 1.1;
        margin-bottom: 30px;
        text-transform: uppercase;
      }
      
      .property-title .highlight {
        color: #FFE587;
      }
      
      .property-details {
        display: flex;
        align-items: center;
        font-size: 24px;
        margin-bottom: 20px;
      }
      
      .property-details .separator {
        margin: 0 15px;
        font-size: 28px;
        color: rgba(255, 255, 255, 0.7);
      }
      
      .contact-info {
        position: absolute;
        bottom: 20px;
        right: 50px;
        text-align: right;
        color: white;
        font-size: 24px;
        z-index: 10;
      }
      
      .contact-info .phone {
        margin-bottom: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img 
        src="${data.imageUrl || '/api/placeholder/1080/720'}" 
        alt="Property View" 
        class="property-image"
      >
      
      <div class="overlay-curve">
        <div class="curve-shape"></div>
      </div>
      
      <div class="property-info">
        <h1 class="property-title">
          OVERLOOKING <span class="highlight">${data.highlight || 'GOLFCOURSE'}</span><br>
          ${data.location || 'INDIRANAGAR'}, ${data.subLocation || 'AHEAD'}
        </h1>
        
        <div class="property-details">
          <span>${data.beds || '1'} Bed</span>
          <span class="separator">|</span>
          <span>${data.baths || '3'} Bath</span>
          <span class="separator">|</span>
          <span>${data.sqft || '1020'} sqft</span>
        </div>
      </div>
      
      <div class="contact-info">
        <div class="phone">${data.phone || '+123 456 7890'}</div>
        <div class="email">${data.email || 'realtor@gmail.com'}</div>
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
