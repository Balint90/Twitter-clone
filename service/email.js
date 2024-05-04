export const mailService = {
    /**
     * Mail mock service
     * @param {string} to 
     * @param {string} subject 
     * @param {string} content 
     * @returns {boolean}
     */
    sendMail: (to, subject, content) => {
        console.log({ to, subject, content });
        return true;
    }
}