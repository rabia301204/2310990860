# Stage 1

## Approach: Priority Inbox for Campus Notifications

### Problem
Students receive too many notifications and lose track of important ones.

### Solution
I implemented a Priority Inbox that always shows the top 'n' most important unread notifications first.

### Priority Logic
Each notification is given a score based on:
- **Weight** (based on type):
  - Placement = 300 (highest priority)
  - Result = 200 (medium priority)
  - Event = 100 (lowest priority)
- **Recency** (timestamp converted to milliseconds)

### Score Formula
score = (weight × 1,000,000,000,000) + timestamp_in_milliseconds

### Why this works
- Placement notifications always appear above Results
- Results always appear above Events
- Within same type, newer notifications appear first

### Efficiency
- Notifications are fetched from API (not stored in DB)
- Sorting is done in memory using JavaScript's built-in sort
- New notifications coming in will automatically get scored and sorted correctly
- Time complexity: O(n log n)