# 📘 Daily Learning Log – CSS Variables & JavaScript

## 🧠 What I Learned Today

Today’s focus was experimenting with **CSS variables** and how they can be dynamically updated using **JavaScript**.

I learned how to:

* Define variables inside the `:root` selector in CSS.
* Access those variables from JavaScript.
* Update their values dynamically based on user interaction.

### 🔧 Key Concept

CSS variables (custom properties) can be controlled in real time using JavaScript. This allows for flexible and interactive UI behavior without rewriting CSS manually.

Example:

```css
:root {
  --spacing: 10px;
}
```

Using JavaScript, I can target and update that variable:

```js
document.documentElement.style.setProperty('--spacing', '20px');
```

---

## ⚙️ Technique Explored

One powerful technique I practiced:

* Assigning a **data attribute** (e.g., `data-sizing="px"`) to HTML elements.
* Capturing user input (like sliders or controls).
* Appending the correct unit (`px`, etc.) dynamically.
* Updating the CSS variable using `setProperty`.

This creates a smooth bridge between HTML, CSS, and JavaScript.

---

## 📈 Learning Curve

At first, understanding how everything connects was a bit tricky:

* Figuring out how `:root` works globally.
* Learning how JavaScript can "snap onto" CSS variables.
* Managing units dynamically.

But once it clicked, it became clear how powerful and reusable this pattern is.

---

## 🖼️ Project Insight

A key improvement in today’s work:

* Instead of applying changes to multiple images at once,
* I focused on targeting **only the selected image**.

This makes the UI more controlled and scalable:


* More images can be added.
* Only the active/selected one gets updated.

---

## 🚀 Takeaways

* CSS variables are extremely powerful when combined with JavaScript.
* Data attributes make dynamic styling much cleaner.
* This approach improves flexibility and scalability in UI design.
