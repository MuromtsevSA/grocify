import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";


const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple" | "oauth_github") => {

        if(loadingStrategy) return; // Prevent multiple simultaneous auth attempts
        setLoadingStrategy(strategy);
        try {
           const {createdSessionId, setActive }=  await startSSOFlow({ strategy });
           if (!createdSessionId || !setActive) {
            Alert.alert("Authentication Error", "Failed to complete social authentication. Please try again.");
            return;
           }

           await setActive({session: createdSessionId});
        } catch (error) {
            Alert.alert("Authentication Error", "An error occurred during social authentication. Please try again.");
            console.error("Social auth error:", error);
        } finally {
            setLoadingStrategy(null);
        }
    };

    return { handleSocialAuth, loadingStrategy };
}

export default useSocialAuth;