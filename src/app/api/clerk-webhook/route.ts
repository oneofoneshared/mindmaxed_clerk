import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers.entries());

    // Check if webhook secret is configured
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('CLERK_WEBHOOK_SECRET is not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Verify webhook signature
    const wh = new Webhook(webhookSecret);
    let evt: Record<string, unknown>;
    try {
      evt = wh.verify(payload, headers) as Record<string, unknown>;
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Log the event for debugging
    console.log('=== CLERK WEBHOOK EVENT RECEIVED ===');
    console.log('Full event:', JSON.stringify(evt, null, 2));
    console.log('Event type:', evt.type);
    console.log('Event data keys:', Object.keys(evt.data as Record<string, unknown> || {}));

    // Handle subscription events
    const type = evt.type as string;
    const data = evt.data as Record<string, unknown>;
    
    console.log('=== SEARCHING FOR USER ID ===');
    console.log('data.payer:', data?.payer);
    console.log('data.payer?.user_id:', (data?.payer as Record<string, unknown>)?.user_id);
    
    // Extract user ID from the correct location: data.payer.user_id
    const payer = data?.payer as Record<string, unknown>;
    const userId = payer?.user_id as string;
    
    console.log('=== FINAL RESULT ===');
    console.log('Extracted userId:', userId);
    console.log('Event type:', type);
    
    if (!userId) {
      console.error('No user ID found in webhook event');
      console.log('Available data keys:', Object.keys(data));
      console.log('Full data structure:', JSON.stringify(data, null, 2));
      return NextResponse.json({ error: 'No user ID found in webhook event' }, { status: 400 });
    }
    
    const status = data?.status as string;
    const items = data?.items as Array<Record<string, unknown>>;
    
    console.log('Subscription status:', status);
    console.log('Subscription items:', items);
    
    // Check if user has an active subscription to any plan
    let hasDeanOfZenSubscription = false;
    let hasAnySubscription = false;
    
    // Plan IDs - updated with actual plan IDs from Clerk
    const DEAN_OF_ZEN_PLAN_ID = 'cplan_30Pv2Ew8WCAQFgxffMSbMDa2t1W'; // Dean of Zen plan ID
    const TRANSFORMATION_PLAN_ID = 'cplan_30UHQ72EwCQb05SA1DTtjPq4aaP'; // Transformation Program plan ID
    
    if (items && Array.isArray(items)) {
      for (const item of items) {
        const plan = item.plan as Record<string, unknown>;
        const itemStatus = item.status as string;
        const planId = plan?.id as string;
        const planSlug = plan?.slug as string;
        
        console.log('Checking item:', { planId, planSlug, itemStatus, plan });
        
        // Check if this is an active subscription
        if (itemStatus === 'active') {
          hasAnySubscription = true;
          
          // Check if it's specifically the Dean of Zen plan
          if (planId === DEAN_OF_ZEN_PLAN_ID) {
            hasDeanOfZenSubscription = true;
          }
          
          // Check if it's the Transformation Program plan (also gives access to Dean of Zen)
          if (planId === TRANSFORMATION_PLAN_ID) {
            hasDeanOfZenSubscription = true; // Transformation plan also gives access to Dean of Zen
          }
        }
      }
    }
    
    console.log('Has any subscription:', hasAnySubscription);
    console.log('Has Dean of Zen subscription:', hasDeanOfZenSubscription);
    
    if (
      type === 'subscription.created' ||
      type === 'subscription.updated'
    ) {
      console.log('Setting subscription metadata for user:', userId);
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { 
          isPaidSubscriber: hasAnySubscription,
          hasDeanOfZenSubscription: hasDeanOfZenSubscription
        },
      });
      console.log('Successfully updated user metadata');
    }

    if (type === 'subscription.canceled') {
      console.log('Setting isPaidSubscriber to false for user:', userId);
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { 
          isPaidSubscriber: false,
          hasDeanOfZenSubscription: false
        },
      });
      console.log('Successfully updated user metadata');
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook processing failed:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
} 