import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headers = Object.fromEntries(req.headers.entries());

  // Verify webhook signature
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');
  let evt: Record<string, unknown>;
  try {
    evt = wh.verify(payload, headers) as Record<string, unknown>;
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Log the event for debugging
  console.log('=== CLERK WEBHOOK EVENT RECEIVED ===');
  console.log('Full event:', JSON.stringify(evt, null, 2));
  console.log('Event type:', evt.type);
  console.log('Event data keys:', Object.keys(evt.data as Record<string, unknown> || {}));

  // Handle subscription events
  try {
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
    
    // Check if user has an active "Dean of Zen" subscription by plan ID
    let hasDeanOfZenSubscription = false;
    const DEAN_OF_ZEN_PLAN_ID = 'cplan_3047ITeoyhYYLKXAwVEqUqQtp4l'; // Dean of Zen plan ID
    
    if (items && Array.isArray(items)) {
      for (const item of items) {
        const plan = item.plan as Record<string, unknown>;
        const itemStatus = item.status as string;
        const planId = plan?.id as string;
        const planSlug = plan?.slug as string;
        
        console.log('Checking item:', { planId, planSlug, itemStatus, plan });
        
        if (planId === DEAN_OF_ZEN_PLAN_ID && itemStatus === 'active') {
          hasDeanOfZenSubscription = true;
          break;
        }
      }
    }
    
    console.log('Has Dean of Zen subscription:', hasDeanOfZenSubscription);
    
    if (
      type === 'subscription.created' ||
      type === 'subscription.updated'
    ) {
      console.log('Setting subscription metadata for user:', userId);
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { 
          isPaidSubscriber: hasDeanOfZenSubscription,
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
  } catch (err) {
    console.error('Failed to update user metadata:', err);
    return NextResponse.json({ error: 'Failed to update user metadata' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
} 