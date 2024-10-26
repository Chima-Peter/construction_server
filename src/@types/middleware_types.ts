// interface for middleware factory function for sending email
interface SendMailType {
    subject: string,
    content: string,
    responseMsg: string,
    errorMsg: string
}

export {
    SendMailType
}