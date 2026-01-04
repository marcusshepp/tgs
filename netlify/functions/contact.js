const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

function generateEmailTemplate(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333333;
                max-width: 600px;
                margin: 0 auto;
                background-color: #f5f5f5;
            }
            .email-container {
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin: 20px;
            }
            .email-header {
                background: linear-gradient(135deg, #8B0000 0%, #B22222 100%);
                padding: 30px 20px;
                text-align: center;
            }
            .email-header h1 {
                color: #ffffff;
                margin: 0;
                font-size: 24px;
                font-weight: 700;
            }
            .email-body {
                padding: 30px 20px;
            }
            .email-footer {
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                font-size: 14px;
                color: #666666;
                border-top: 1px solid #e0e0e0;
            }
            .info-row {
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid #f0f0f0;
            }
            .info-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            .info-label {
                font-weight: 600;
                color: #8B0000;
                margin-bottom: 5px;
                font-size: 16px;
            }
            .info-value {
                color: #333333;
                margin: 0;
                font-size: 15px;
            }
            .message-box {
                background-color: #fff8f8;
                border-left: 4px solid #B22222;
                padding: 20px;
                margin-top: 20px;
                border-radius: 0 8px 8px 0;
            }
            .highlight-bar {
                height: 3px;
                background: linear-gradient(90deg, #B22222 0%, #8B0000 100%);
                margin: 20px 0;
            }
            .contact-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
            }
            @media (max-width: 600px) {
                .contact-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>🍔 New Catering Inquiry</h1>
            </div>
            <div class="email-body">
                <div class="highlight-bar"></div>
                <div class="contact-grid">
                    <div class="info-row">
                        <p class="info-label">Customer Name:</p>
                        <p class="info-value">${data.fullName}</p>
                    </div>
                    <div class="info-row">
                        <p class="info-label">Event Date:</p>
                        <p class="info-value">${data.eventDate || "Not specified"}</p>
                    </div>
                </div>
                <div class="contact-grid">
                    <div class="info-row">
                        <p class="info-label">Email Address:</p>
                        <p class="info-value"><a href="mailto:${data.email}" style="color: #B22222; text-decoration: none;">${data.email}</a></p>
                    </div>
                    <div class="info-row">
                        <p class="info-label">Phone Number:</p>
                        <p class="info-value">${data.phoneNumber || "Not provided"}</p>
                    </div>
                </div>
                <div class="message-box">
                    <p class="info-label">Message:</p>
                    <p class="info-value">${data.message ? data.message.replace(/\n/g, "<br>") : "No message provided"}</p>
                </div>
            </div>
            <div class="email-footer">
                <p>This inquiry was sent from the Tim's Gourmet Sliders website.</p>
                <p>© ${new Date().getFullYear()} Tim's Gourmet Sliders - Grand Rapids, MI</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

exports.handler = async function (event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.fullName || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    const fromEmail = process.env.FROM_EMAIL || "info@syncgr.com";
    const toEmail = process.env.TO_EMAIL || "timsgourmetsliders@gmail.com";

    const msg = {
      to: toEmail,
      from: fromEmail,
      replyTo: data.email,
      subject: `New Catering Inquiry from: ${data.fullName}`,
      text: `You have a new catering inquiry from ${data.fullName}.\n\nPhone: ${data.phoneNumber || "N/A"}\nEmail: ${data.email}\nEvent Date: ${data.eventDate || "N/A"}\n\nMessage:\n${data.message}`,
      html: generateEmailTemplate(data),
    };

    await sendgrid.send(msg);

    // Also send to syncgr.com/api/leads for lead tracking
    try {
      await fetch("https://syncgr.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phoneNumber,
          message: data.message,
          metadata: {
            eventDate: data.eventDate,
            source: "tgs-catering-form",
          },
        }),
      });
    } catch (syncError) {
      // Don't fail if sync fails, email already sent
      console.warn("Sync API error:", syncError);
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Email sent successfully", success: true }),
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
