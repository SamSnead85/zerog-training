# Video Script: Module 2 - GitHub Copilot Mastery

## Video Overview
- **Title**: Mastering GitHub Copilot for 10x Productivity
- **Duration**: 12 minutes
- **Target Audience**: Developers looking to maximize AI-assisted coding
- **Learning Objectives**: Configure Copilot, use power shortcuts, leverage chat effectively

---

## Scene 1: Introduction (0:00 - 0:45)

### Visuals
- Screen showing VS Code with Copilot icon visible
- Animated text overlays

### Narration
"GitHub Copilot has fundamentally changed how developers write code. But here's the thing—most developers only use about 20% of what Copilot can do. In the next 12 minutes, I'm going to show you how to unlock its full potential and truly become a 10x developer."

### On-screen Text
- "GitHub Copilot Mastery"
- "From 1x to 10x Developer"

---

## Scene 2: The Mental Model (0:45 - 2:00)

### Visuals
- Split screen: developer typing vs Copilot suggestions
- Thought bubble animation showing "context awareness"

### Narration
"First, let's understand how Copilot thinks. Copilot isn't just autocomplete—it's a pair programmer reading over your shoulder. It looks at:
- Your current file
- Open tabs
- File names and structure
- Comments and function signatures
- Patterns in your codebase

Understanding this is key. The more context you give Copilot, the better its suggestions."

### On-screen Code Example
```python
# File: user_service.py
# Class that handles user authentication and profile management

class UserService:
    def __init__(self, database: Database):
        # Copilot now understands: this is about users, auth, and databases
```

---

## Scene 3: Power Shortcuts (2:00 - 4:30)

### Visuals
- VS Code with keyboard shortcut overlays
- Live coding demonstration

### Narration
"Let's talk shortcuts. These will become muscle memory."

### Keyboard Shortcuts with Demonstrations

**Essential Shortcuts:**
1. `Tab` - Accept suggestion
2. `Esc` - Dismiss suggestion
3. `Alt + ]` / `Alt + [` - Cycle through alternatives
4. `Ctrl + Enter` - Open Copilot Completions Panel

**Power Moves:**
5. `Ctrl + I` (New) - Inline Chat (ask questions in your code)
6. Start typing, then pause - Let Copilot complete your thought

### On-screen Demo
- Show cycling through 5 different implementations
- Demonstrate inline chat fixing a bug

---

## Scene 4: Comment-Driven Development (4:30 - 6:30)

### Visuals
- Real-time coding with comments

### Narration
"Here's a technique I call Comment-Driven Development. Instead of writing code first, write your intent as comments. Watch what happens."

### Live Coding Demo
```python
# Function to validate email addresses
# Returns True if valid, False otherwise
# Should handle edge cases like:
# - Missing @ symbol
# - Multiple @ symbols
# - Invalid TLD
# - Empty strings

def validate_email(email: str) -> bool:
    # Copilot generates complete implementation...
```

### Key Points
- Specific comments = better code
- Including edge cases guides Copilot
- Works for complex algorithms too

---

## Scene 5: Copilot Chat Deep Dive (6:30 - 9:00)

### Visuals
- Copilot Chat panel demonstrations
- Split screen showing chat and code changes

### Narration
"Copilot Chat is where the magic really happens. Let me show you the prompts that work best."

### Chat Demonstrations

**Prompt 1: Explain Code**
```
/explain What does this regular expression do and how can I improve it?
```

**Prompt 2: Generate Tests**
```
/tests Generate comprehensive unit tests for the validate_email function covering all edge cases
```

**Prompt 3: Fix Bugs**
```
/fix This function throws a NoneType error when the user list is empty
```

**Prompt 4: Refactor**
```
Refactor this class to use dependency injection and make it testable
```

### Pro Tips On-screen
1. Be specific about what you want
2. Include context about your constraints
3. Ask for explanations to learn

---

## Scene 6: Advanced Patterns (9:00 - 11:00)

### Visuals
- Complex code examples
- Before/after comparisons

### Narration
"Now for some advanced patterns that separate pros from beginners."

### Pattern 1: Workspace Context
"Use @workspace to give Copilot access to your entire project."
```
@workspace How is authentication implemented in this project?
```

### Pattern 2: Reference Files
"Use @file to reference specific files."
```
@file:models.py Generate a new endpoint following the same pattern
```

### Pattern 3: Documentation Generation
"Generate comprehensive docs automatically."
```
Generate docstrings for all public methods in this file following NumPy style
```

---

## Scene 7: Common Pitfalls (11:00 - 11:45)

### Visuals
- Red X marks on bad practices
- Green checkmarks on good practices

### Narration
"Before we wrap up, let's talk about what NOT to do."

### Pitfalls List
1. ❌ Accepting without reading - Always verify
2. ❌ Copying sensitive data in prompts - Security risk
3. ❌ Ignoring alternatives - Often the 3rd suggestion is best
4. ❌ Fighting Copilot's style - Adapt your workflow
5. ❌ Not updating - New features monthly

---

## Scene 8: Conclusion (11:45 - 12:00)

### Visuals
- Summary slide
- Call to action

### Narration
"That's GitHub Copilot mastery in 12 minutes. Remember: context is king, comments are your superpower, and Copilot Chat is for more than just chatting. Start using these techniques today and watch your productivity soar."

### Final On-screen
- "Practice these techniques"
- "Next: ChatGPT and Claude for Coding"
- ScaledNative logo and URL

---

## Production Notes

### B-Roll Needed
- Developer typing at computer
- IDE close-ups
- Code appearing on screen animations
- Success/error message animations

### Graphics
- Keyboard shortcut overlays
- Before/after code comparisons
- Animated thought bubbles

### Music
- Upbeat, tech-focused background music
- Transitions between sections
- Emphasis sounds for key points

### Accessibility
- Clear narration with consistent pacing
- All code shown on screen with syntax highlighting
- Closed captions provided
