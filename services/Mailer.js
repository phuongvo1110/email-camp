const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const key = require("../config/key");

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();
        
        // Validate required parameters
        if (!subject || !recipients || !content) {
            throw new Error("Subject, recipients, and content are required");
        }
        
        if (!key.sendGridKey) {
            throw new Error("SendGrid API key is not configured");
        }
        
        this.sgApi = sendgrid(key.sendGridKey);
        this.from_email = new helper.Email("vophamthanhphuong@gmail.com");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }
    /**
     * Format email addresses into SendGrid Email objects
     * @param {Array} recipients - Array of recipient objects with email property
     * @returns {Array} Array of SendGrid Email objects
     */
    formatAddresses(recipients) {
        if (!Array.isArray(recipients)) {
            throw new Error("Recipients must be an array");
        }
        
        return recipients.map(({ email }) => {
            if (!email || typeof email !== 'string') {
                throw new Error("Each recipient must have a valid email address");
            }
            return new helper.Email(email);
        });
    }
    /**
     * Add click tracking to the email
     */
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    
    /**
     * Add recipients to the email personalization
     */
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
    /**
     * Send the email via SendGrid API
     * @returns {Promise} SendGrid API response
     */
    async send() {
        try {
            const request = this.sgApi.emptyRequest({
                method: "POST",
                path: "/v3/mail/send",
                body: this.toJSON(),
            });

            const response = await this.sgApi.API(request);
            
            if (response.statusCode >= 200 && response.statusCode < 300) {
                console.log("Email sent successfully");
                return response;
            } else {
                console.error("SendGrid API error:", response.body);
                throw new Error(`SendGrid API error: ${response.statusCode}`);
            }
        } catch (error) {
            console.error("Failed to send email:", error);
            throw error;
        }
    }
}
module.exports = Mailer;
