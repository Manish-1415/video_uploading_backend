import ApiError from "../../utility/ApiError";
import { User } from "../auth/auth.model";
import { Subscription } from "./subscription.model";

const subscriptionService = {
    subscribeUserEntry : async (userId , toSubscribe) => {
        // find if the channel user try to subscribe is exist or not ?
        let findChannel = await User.findById(toSubscribe);

        if(!findChannel) throw new ApiError(404 , "User Not Exist To Subscribe");

        // find if user subscribe it or not 
        let findIfUserAlreadySubscribed = await Subscription.findOne({subscriber : userId , subscribedTo : toSubscribe });

        // if user already subscribed then unsubscribe it 

        if(findIfUserAlreadySubscribed) {
            const findAndUnsubscribe = await Subscription.findByIdAndDelete(findIfUserAlreadySubscribed._id , {new:true});

            if(!findAndUnsubscribe) throw new ApiError(400 , "Error Occurred While Unsubscribing the User");

            return findAndUnsubscribe;
        }
        else {
            // if user not subscribed then subscribe the channel
            const subscribe = {
                subscriber : userId,
                subscribedTo : toSubscribe,
            }

            const subscribeToChannel = await Subscription.create(subscribe);

            if(!subscribeToChannel) throw new ApiError(500 , "Error Occurred While Subscribing the User");

            return subscribeToChannel;
        }
    },

    giveChannelsThatUserSubscribed : async (userId) => {
        const findUserSubscribedChannels = await Subscription.find({subscriber : userId});

        if(!findUserSubscribedChannels) return [];

        return findUserSubscribedChannels;
    },

    giveCountOfSubscribers : async (channelId) => {
        const findChannelsSubscription = await Subscription.find({subscribedTo : channelId});

        // if(!findChannelsSubscription) return 0;

        const countSubscribers = findChannelsSubscription.filter( (subscription) => subscription.subscriber ).length;
        
        return countSubscribers;
    }
}

export default subscriptionService;