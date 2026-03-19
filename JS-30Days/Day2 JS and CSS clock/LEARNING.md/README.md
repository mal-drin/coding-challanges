# 📚 Today I Learned

## 🕒 Building an Analog Clock with JavaScript

Today I learned how to create an analog clock using JavaScript by:

- Getting the current time (`hours`, `minutes`, `seconds`)
- Converting those values into rotation degrees
- Applying the rotation to clock hands (hour, minute, second)

## ⚙️ How It Works

- Use JavaScript to pull the current time in real-time
- Map:
  - `hours` → hour hand rotation
  - `minutes` → minute hand rotation
  - `seconds` → second hand rotation
- Sync everything with a digital time format (`00:00:00`) for accuracy

## 💡 Key Learning

It wasn’t too difficult overall — the main challenge was finding the *right* tutorial that explained things clearly.

## 🚧 Challenge Faced

The tricky part was:

> The second hand would "bounce" back to 0° after completing a full rotation (60 seconds), which broke the smooth motion.

## 🛠️ Solution

- Used an `if` statement to detect when the hand resets
- Temporarily disabled the CSS transition at the reset point
- Re-enabled it immediately after

This ensured:
- A smooth 360° rotation
- No visual "jump" or glitch when the hand loops

## ✅ Outcome

- Fully working analog clock
- Smooth hand movement
- Real-time synchronization

