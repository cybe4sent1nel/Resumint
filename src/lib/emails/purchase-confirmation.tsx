interface PurchaseEmailData {
  userName: string
  userEmail: string
  purchaseType: 'subscription' | 'api' | 'credits'
  planName: string
  amount: number
  orderId: string
  credits?: number
  features?: string[]
  billingPeriod?: 'monthly' | 'yearly'
}

export function generatePurchaseConfirmationEmail(data: PurchaseEmailData): string {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || 'https://via.placeholder.com/150'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'ResumINT'

  const getPurchaseTitle = () => {
    switch (data.purchaseType) {
      case 'subscription':
        return `Welcome to ${data.planName}!`
      case 'api':
        return `API Access Activated - ${data.planName}`
      case 'credits':
        return `${data.credits} Credits Added to Your Account`
      default:
        return 'Purchase Successful'
    }
  }

  const getPurchaseDescription = () => {
    switch (data.purchaseType) {
      case 'subscription':
        return `Your ${data.planName} subscription is now active. Enjoy unlimited access to all premium features!`
      case 'api':
        return `Your ${data.planName} API access has been activated. Start integrating our powerful APIs into your applications!`
      case 'credits':
        return `${data.credits} credits have been successfully added to your account. Start creating amazing resumes and portfolios!`
      default:
        return 'Your purchase has been completed successfully.'
    }
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getPurchaseTitle()}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  
  <!-- Main Container -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        
        <!-- Email Content -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <!-- Logo -->
              <img src="${logoUrl}" alt="${appName}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 20px; border: 4px solid #ffffff;" />
              
              <!-- Success Icon -->
              <div style="background-color: #ffffff; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#10b981"/>
                </svg>
              </div>
              
              <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0;">🎉 ${getPurchaseTitle()}</h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Greeting -->
              <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 16px;">Hi ${data.userName}! 👋</h2>
              
              <!-- Main Message -->
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                ${getPurchaseDescription()}
              </p>

              <!-- Order Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px; font-weight: 600;">📋 Order Details</h3>
                    
                    <table width="100%" cellpadding="8" cellspacing="0" border="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Order ID:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right; font-family: monospace;">${data.orderId}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Plan:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right;">${data.planName}</td>
                      </tr>
                      ${data.billingPeriod ? `
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Billing Period:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right; text-transform: capitalize;">${data.billingPeriod}</td>
                      </tr>
                      ` : ''}
                      ${data.credits ? `
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Credits:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right;">${data.credits}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Amount Paid:</td>
                        <td style="color: #10b981; font-size: 18px; font-weight: bold; text-align: right;">₹${data.amount.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${data.features && data.features.length > 0 ? `
              <!-- Features List -->
              <div style="margin-bottom: 24px;">
                <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px; font-weight: 600;">✨ What's Included</h3>
                ${data.features.map(feature => `
                  <div style="display: flex; align-items: start; margin-bottom: 12px;">
                    <span style="color: #10b981; font-size: 20px; margin-right: 12px;">✓</span>
                    <span style="color: #4b5563; font-size: 15px; line-height: 1.5;">${feature}</span>
                  </div>
                `).join('')}
              </div>
              ` : ''}

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${appUrl}/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
                      🚀 Go to Dashboard
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <!-- Help Section -->
              <div style="text-align: center; margin-top: 24px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px;">Need help? We're here for you!</p>
                <p style="margin: 0;">
                  <a href="mailto:resumint.info@gmail.com" style="color: #667eea; text-decoration: none; font-size: 14px;">📧 resumint.info@gmail.com</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">
                Thank you for choosing <strong>${appName}</strong>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0;">
                <a href="${appUrl}" style="color: #667eea; text-decoration: none;">Visit Website</a> •
                <a href="${appUrl}/privacy" style="color: #667eea; text-decoration: none;">Privacy Policy</a> •
                <a href="${appUrl}/terms" style="color: #667eea; text-decoration: none;">Terms of Service</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `
}

export function generateSubscriptionEmail(data: Omit<PurchaseEmailData, 'purchaseType'> & { features: string[] }) {
  return generatePurchaseConfirmationEmail({ ...data, purchaseType: 'subscription' })
}

export function generateApiPurchaseEmail(data: Omit<PurchaseEmailData, 'purchaseType'> & { features: string[] }) {
  return generatePurchaseConfirmationEmail({ ...data, purchaseType: 'api' })
}

export function generateCreditsPurchaseEmail(data: Omit<PurchaseEmailData, 'purchaseType'> & { credits: number }) {
  return generatePurchaseConfirmationEmail({ ...data, purchaseType: 'credits' })
}
