export const render = (templateFile, data) => {
    return (req, res, next) => {
        return res.render(templateFile, { ...res.locals, ...data });
    }
}