const { RateLimiterMemory } = require('rate-limiter-flexible');
import { Request,Response, NextFunction } from "express";
import { RateLimiterRes } from "rate-limiter-flexible";
const shortTermLimiterFlex = new RateLimiterMemory({
    points: 3, // Number of requests
    duration: 5, // Per seconds seconds
});
const longTermLimiterFlex = new RateLimiterMemory({
    points: 1500, // Number of requests
    duration: 60*60, // Per seconds seconds
});

export async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        await shortTermLimiterFlex.consume(req.ip);
        await longTermLimiterFlex.consume(req.ip);

        next(); 
    } catch (rejRes) {
        const rateLimiterResponse = rejRes as RateLimiterRes;
        const timeToWait = rateLimiterResponse.msBeforeNext / 1000;
        const remainingTime = timeToWait > 60 ? `${Math.round(timeToWait / 60)} minutes` : `${timeToWait} seconds`;
        res.status(429).send({message: `Too many requests. Try again in ${remainingTime}. `});
    }
}

