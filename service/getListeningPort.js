import 'dotenv/config';

export const getListeningPort = (req) => {
    let portNumber = '';
    if (!(req.protocol === 'https' && process.env.PORT === 443)
        && !(req.protocol === 'http' && process.env.PORT === 80)) {
        portNumber = `:${process.env.PORT}`;
    }
    return portNumber;
}
