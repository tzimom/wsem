export default {
    privateKey: process.env.JWT_SECRET,
    saltLength: +process.env.PW_SALT_LENGTH,
    autoPasswordLength: +process.env.PW_AUTO_LENGTH,
};
