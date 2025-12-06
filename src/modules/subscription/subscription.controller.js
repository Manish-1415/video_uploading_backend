import ApiResponse from "../../utility/ApiResponse";
import asyncHandler from "../../utility/asyncHandler";
import subscriptionService from "./subscription.service";


export const subscribeUser = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const toSubscribe = req.params.id;

    const subscribeInfo = await subscriptionService.subscribeUserEntry(userId , toSubscribe);

    return res
    .status(200)
    .json(new ApiResponse(200 , "User Subscribe / Unsubscribe the Channel", subscribeInfo));
});


export const subscribedChannels = asyncHandler(async (req , res) => {
    const userId = req.user.id;

    const subscibedChannelsList = await subscriptionService.giveChannelsThatUserSubscribed(userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Channels that user subscribed fetched !", subscibedChannelsList));
})


export const subscriberCountsInNumbers = asyncHandler(async (req , res) => {
    const channelId = req.params.id;
    
    const subscribers = await subscriptionService.giveCountOfSubscribers(channelId);

    return res
    .status(200)
    .json(new ApiResponse(200, "Subscriber Counts Fetched" , subscribers));
});