# ElevenLabs Convai Widget Setup Guide

## Overview

The Dean of Zen page now includes an ElevenLabs Convai widget that provides voice-based AI interactions using the specific agent ID: `agent_01k0fw476pff1a9eavgvxka1qb`.

## Implementation Details

### Widget Code

The widget is implemented using the official ElevenLabs Convai embed code:

```html
<elevenlabs-convai
  agent-id="agent_01k0fw476pff1a9eavgvxka1qb"
></elevenlabs-convai>
<script
  src="https://unpkg.com/@elevenlabs/convai-widget-embed"
  async
  type="text/javascript"
></script>
```

### Current Configuration

- **Agent ID**: `agent_01k0fw476pff1a9eavgvxka1qb` (Dean of Zen agent)
- **Script Source**: `https://unpkg.com/@elevenlabs/convai-widget-embed`
- **Position**: Default ElevenLabs widget position (typically bottom-right)
- **Theme**: Default ElevenLabs styling

## Setup Steps

### 1. Verify Agent Configuration

The agent ID `agent_01k0fw476pff1a9eavgvxka1qb` should be configured in your ElevenLabs dashboard with:

- **Name**: "Dean of Zen"
- **Description**: "A wise AI coach specializing in mindfulness and personal development"
- **Voice**: Custom voice for the Dean of Zen character
- **Instructions**: Appropriate prompts for mindfulness coaching

### 2. Testing

1. Start your development server: `npm run dev`
2. Navigate to `/dean-of-zen`
3. Look for the ElevenLabs widget (typically in bottom-right corner)
4. Click to start a conversation with the Dean of Zen

### 3. Customization (Optional)

If you need to customize the widget appearance or behavior, you can modify the agent settings in your ElevenLabs dashboard.

## Widget Features

- **Voice Conversations**: Real-time voice interactions with the Dean of Zen
- **AI-Powered Responses**: Intelligent coaching based on the agent's configuration
- **Seamless Integration**: Embedded directly in the Dean of Zen page
- **Subscription Gated**: Only visible to users with Dean of Zen subscription

## Troubleshooting

### Widget Not Appearing

1. Check browser console for errors
2. Verify the agent ID is correct and active
3. Ensure the ElevenLabs script is loading properly
4. Check if you have an active ElevenLabs subscription

### Voice Issues

1. Verify the agent has a voice assigned in ElevenLabs dashboard
2. Test the agent directly in ElevenLabs dashboard first
3. Check your ElevenLabs account has sufficient credits

### Agent Not Responding

1. Verify the agent is properly configured with instructions
2. Check the agent's status in ElevenLabs dashboard
3. Ensure the agent has the correct knowledge base or prompts

## Resources

- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [Convai Widget Documentation](https://elevenlabs.io/docs/conversational-ai/overview)
- [ElevenLabs Dashboard](https://elevenlabs.io/dashboard)

## Notes

- The widget is automatically loaded when the Dean of Zen page is accessed
- The agent ID is hardcoded for security and simplicity
- No additional environment variables are required for this implementation
- The widget respects the user's subscription status (only visible to Dean of Zen subscribers)
