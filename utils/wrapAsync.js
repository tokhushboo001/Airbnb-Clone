// module.exports = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     };
// };
const wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export default wrapAsync;