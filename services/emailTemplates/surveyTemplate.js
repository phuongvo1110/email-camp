const key = require("../../config/key");
module.exports = (survey) => {
    return `<html>
        <body style="margin:0; padding:0; background:#f7f7f7;">
            <div style="max-width: 600px; margin: 40px auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); font-family: Arial, sans-serif; overflow: hidden;">
                <div style="background: #4CAF50; color: #fff; padding: 30px 20px; text-align: center;">
                    <h2 style="margin: 0 0 10px 0; font-size: 2em;">${survey.title}</h2>
                    <p style="margin: 0; font-size: 1.1em;">Your opinion helps us improve our services</p>
                </div>
                <div style="padding: 30px 20px; font-size: 1.1em; color: #333;">
                    ${survey.body}
                </div>
                <div style="padding: 20px; text-align: center; background: #f0f0f0;">
                    <a href="${key.redirectDomain}/api/surveys/${survey.id}/yes" style="display: inline-block; text-decoration: none; color: #fff; background: #4CAF50; padding: 12px 32px; border-radius: 25px; font-weight: bold; margin: 0 10px; font-size: 1em;">Yes</a>
                    <a href="${key.redirectDomain}/api/surveys/${survey.id}/no" style="display: inline-block; text-decoration: none; color: #fff; background: #f44336; padding: 12px 32px; border-radius: 25px; font-weight: bold; margin: 0 10px; font-size: 1em;">No</a>
                </div>
            </div>
        </body>
    </html>`;
};
