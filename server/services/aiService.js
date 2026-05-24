const replyTemplates = {
  1: [
    "Dear {author}, we sincerely apologize for your experience at {businessName}. This is not the standard we hold ourselves to and we'd love the opportunity to make it right. Please reach out to us directly so we can resolve this for you.",
    "Hi {author}, thank you for your honest feedback. We're truly sorry to hear this and take full responsibility. We've shared this with our team at {businessName} and would love to invite you back for a better experience.",
    "Dear {author}, we are deeply sorry about your visit to {businessName}. A cold meal and long wait is completely unacceptable and we apologize sincerely. Please contact us directly and we will make this right.",
  ],
  2: [
    "Dear {author}, we're sorry your visit to {businessName} didn't meet expectations. Your feedback helps us improve and we'd love a chance to make it up to you. Please contact us directly.",
    "Hi {author}, thank you for taking the time to share this. We at {businessName} apologize for falling short and are working to improve. We hope to see you again soon.",
    "Dear {author}, we appreciate your feedback about {businessName}. We're sorry we didn't deliver the experience you deserved and we're taking your comments seriously with our team.",
  ],
  3: [
    "Dear {author}, thank you for your balanced feedback about {businessName}! We're glad you enjoyed parts of your visit and we're actively working on the areas you mentioned. Hope to serve you better next time!",
    "Hi {author}, we appreciate your honest review of {businessName}. Great to hear what you liked and we're taking your suggestions seriously. See you again soon!",
    "Dear {author}, thank you for visiting {businessName} and sharing your experience. We're happy you had some good moments and we're committed to improving the rest. Hope to see you back!",
  ],
  4: [
    "Dear {author}, thank you so much for the kind words about {businessName}! We're thrilled you had a great experience and look forward to welcoming you back soon.",
    "Hi {author}, this made our day at {businessName}! We're so happy you enjoyed your visit. See you next time!",
    "Dear {author}, thank you for this lovely review! The whole team at {businessName} appreciates your support. We look forward to serving you again very soon.",
  ],
  5: [
    "Dear {author}, thank you for this wonderful review of {businessName}! It means the world to our entire team. We look forward to serving you again very soon!",
    "Hi {author}, wow — thank you so much! Reviews like yours keep the whole team at {businessName} going. We can't wait to see you again!",
    "Dear {author}, your kind words about {businessName} truly made our day! We're so grateful for your support and can't wait to welcome you back again.",
  ],
}

export async function generateReply(
  reviewText,
  businessName = 'our restaurant',
  author = 'valued customer',
  rating = 3
) {
  await new Promise(resolve => setTimeout(resolve, 800))

  const clampedRating = Math.min(5, Math.max(1, Math.round(rating)))
  const templates = replyTemplates[clampedRating] || replyTemplates[3]
  const template = templates[Math.floor(Math.random() * templates.length)]

  return template
    .replace(/{author}/g, author)
    .replace(/{businessName}/g, businessName)
}