const development = {
    name : "development",
    session_cookie_key: 'blahsomething',
    asset_path: './assets',
    db_name: 'KeepUp_development',
    db_password: 'abcd',
    email_id: process.env.EMAIL_ID,
    email_pass: process.env.EMAIL_PASS,
    facebook_clientID: process.env.FB_CLIENT_ID,
    facebook_clientSecret: process.env.FB_CLIENT_SECRET,
    google_clientID: process.env.GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}
const production = {
    name : "production",
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    asset_path: './public/assets',
    db_name: process.env.DB,
    db_password: process.env.DB_PASS,
    email_id: process.env.EMAIL_ID,
    email_pass: process.env.EMAIL_PASS,
    facebook_clientID: process.env.FB_CLIENT_ID,
    facebook_clientSecret: process.env.FB_CLIENT_SECRET,
    google_clientID: process.env.GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}

module.exports = eval(process.env.NODE_ENV || 'development');