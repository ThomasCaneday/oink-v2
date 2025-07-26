# 🧠 Copilot TODO for Oink V2 MVP

This project is a React app called **Oink**, a beginner-friendly crypto investing platform. The goal is to allow users to sign up via Magic (email login), buy real crypto using Ramp (when API key is ready), and earn points for actions like buying crypto, maintaining streaks, watching ads (mocked), and learning about crypto.

We are using Firebase to store user data like wallet address, points, purchases, streaks, and lesson progress.

✅ Magic Auth and Firebase keys are already configured.  
⏳ Ramp host API key is pending — use mock component for now.

---

## ✅ Tasks Copilot Should Complete

### 🔐 1. Magic Auth Integration
- [x] Implement Magic email login and wallet generation
- [x] On successful login, store wallet address in Firebase `users` collection

### 🔥 2. Firebase Setup
- [x] Store:
  - `walletAddress`
  - `totalPoints`
  - `streakCount`
  - `lastInvestmentDate`
  - `purchases` (array)
  - `rewardsRedeemed`
  - `lessonsCompleted`
  - `adsWatchedToday`
- [ ] Create functions to update points and streaks

### 💸 3. Crypto Buy Page
- [ ] Build a "Buy Crypto" page
- [ ] Let user choose coin (BTC/ETH) and dollar amount
- [ ] If Ramp is not available yet, show mocked success screen and fake transaction log (for testing)
- [ ] Once Ramp key is added, replace mock with real Ramp SDK/widget

### 🧮 4. Points & Streak Logic
- [ ] Award 100 points per $10 invested
- [ ] Track streak by comparing `lastInvestmentDate` to `now`
- [ ] Add bonus points for 3-, 5-, 7-day streaks
- [ ] Store updated `streakCount` and `lastInvestmentDate` in Firebase

### 🏆 5. Leaderboard Page
- [ ] Create a leaderboard page that:
  - Queries all users
  - Sorts by `totalPoints` or `streakCount`
  - Shows top 5 and the current user's rank

### 📺 6. Mocked Ads Page
- [ ] "Watch Ad" button shows static video or image
- [ ] After 10 seconds, unlock “Earn 25 pts” button
- [ ] Track how many ads watched today in Firebase (limit: 3)

### 🎁 7. Mocked Rewards Page
- [ ] List static rewards (name, description, cost)
- [ ] Redeem button deducts points, logs redemption in Firebase
- [ ] Show success toast or modal

### 📚 8. Learn Page (Education)
- [ ] Display 3–5 short lessons (Markdown or JSON content)
- [ ] Show multiple choice quiz at end of each
- [ ] Award 75 points for passing a quiz
- [ ] Store completed lessons and scores in Firebase

### 🧼 9. UI Polish
- [ ] Use Tailwind or CSS for modern, mobile-first UI
- [ ] Create NavBar with: Home, Buy, Rewards, Learn, Leaderboard, Profile
- [ ] Show toast messages when points are awarded

### 🚀 10. Deployment
- [ ] Build app using `npm run build`
- [ ] Push build to `gh-pages` branch
- [ ] Ensure GitHub Pages is enabled for this repo

---

## 🔑 Notes
- Once Ramp API key is received, update `BuyCrypto.tsx` or equivalent with `RampInstantSDK`
- Use `defaultFlow: 'ONRAMP'` and `userAddress` from Magic
- For now, simulate transactions to test the rest of the flow

---

Copilot: **Please implement these remaining features in `/src/pages` and `/src/components` folders using clean modular code. Use Firebase SDK for all reads/writes. Use Tailwind for styling.**