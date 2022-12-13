module.exports = ({ env }) => ({
  auth: {
    secret: env('API_TOKEN_SALT', 'd9b0df66ff97a666027e665707b4e3e7'),
  },
  apiToken: {
    salt: env('ADMIN_JWT_SECRET', '77b2c87dbab4e1697bec244226fbd1b3'),
  },
});
