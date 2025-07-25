import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useSubscriptionStatus() {
  const { user } = useUser();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check subscription status from user metadata
  const checkSubscriptionStatus = () => {
    if (!user) {
      setHasAccess(false);
      setIsLoading(false);
      return;
    }

    const hasDeanOfZenSubscription = user.publicMetadata?.hasDeanOfZenSubscription === true;
    const isPaidSubscriber = user.publicMetadata?.isPaidSubscriber === true;
    const newHasAccess = hasDeanOfZenSubscription || isPaidSubscriber;
    
    setHasAccess(newHasAccess);
    setIsLoading(false);
  };

  // Initial check
  useEffect(() => {
    checkSubscriptionStatus();
  }, [user]);

  // Poll for changes every 2 seconds when user is signed in
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      checkSubscriptionStatus();
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [user]);

  return {
    hasAccess,
    isLoading,
    hasDeanOfZenSubscription: user?.publicMetadata?.hasDeanOfZenSubscription === true,
    isPaidSubscriber: user?.publicMetadata?.isPaidSubscriber === true,
  };
} 