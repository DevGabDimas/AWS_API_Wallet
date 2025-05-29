import ratelimit from "../config/upstash";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit")

        if (!success) {
            return res.status(429).json({
                message:"Muitas Requisições enviadas em um curto periodo de tempon tente novamente mais tarde",
            })
        }

        next();
    } catch (error) {
        console.log("Rate Limit error", error)
        next(error)
    }

}

export default rateLimiter;