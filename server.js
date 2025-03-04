const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3001; // Change this port if needed

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample HTML template (you could store this in a separate file)
const getHtmlTemplate = (data) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate Listing - ${data.location || 'Indiranagar'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
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
            font-family: 'Inter';
            font-size: 72px;
            font-style: normal;
            font-weight: 500;
            line-height: 120%;
            letter-spacing: -2.88px;
            text-transform: uppercase;
            text-edge: cap;
            leading-trim: both;
            margin-bottom: 20px;
        }
        
        .golfcourse {
            color: #CE7DA5;
            font-family: 'Inter';
            font-size: 72px;
            font-style: normal;
            font-weight: 500;
            line-height: 120%;
            letter-spacing: -2.88px;
            text-transform: uppercase;
            text-edge: cap;
            leading-trim: both;
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
        <img src="${data.imageUrl || '/default-image.jpg'}" alt="Property view" class="room-image">
        
        <div class="listing-details">
            <h1 class="listing-title">OVERLOOKING <span class="golfcourse">${data.highlight || 'GOLFCOURSE'}</span><br>${data.location || 'INDIRANAGAR'}, ${data.subLocation || 'AHEAD'}</h1>
            
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

// POST endpoint to receive data and update the HTML
app.post('/update-listing', (req, res) => {
    try {
        const userData = req.body;
        
        // Generate HTML with user data
        const htmlContent = getHtmlTemplate(userData);
        
        // Write the HTML to a file in the public directory
        fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), htmlContent);
        
        // Dynamically determine the host
        const host = req.headers.host; // Gets 'listing-be-ihy4.onrender.com'
        const protocol = req.protocol; // Gets 'https' on Render
        
        // Construct the correct file URL
        const fileUrl = `${protocol}://${host}/index.html`;

        res.json({ 
            success: true, 
            message: 'Property listing updated successfully',
            url: fileUrl
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error updating property listing', 
            error: error.message 
        });
    }
});


// Default route to serve the form for updating the listing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});