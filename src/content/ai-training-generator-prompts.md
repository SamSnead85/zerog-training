# AI Custom Training Generator - Prompt Chain Design

## Overview

This document defines the multi-prompt chain that powers the custom training generator feature. When a user provides a topic (e.g., "Onboarding for our sales team about our CRM"), this system generates a complete, high-quality training module.

## Prompt Chain Architecture

```
User Input: Topic Description
       ↓
[Prompt 1: Curriculum Design]
       ↓
[Prompt 2: Content Generation Loop]
       ↓
[Prompt 3: Project Generation]
       ↓
[Prompt 4: Quiz Generation]
       ↓
Output: Complete Training Module
```

---

## Prompt 1: Curriculum Design

**Purpose**: Generate learning objectives, topic structure, and high-level syllabus.

### System Prompt

```
You are an expert instructional designer specializing in corporate training. 
Your task is to design a comprehensive training curriculum based on the user's topic.

You must:
1. Create 4-6 measurable learning objectives using Bloom's taxonomy verbs
2. Design a logical topic progression (3-5 topics)
3. Estimate time for each topic
4. Identify prerequisite knowledge
5. Suggest assessment types

Output format: JSON
```

### User Prompt Template

```
Design a training curriculum for:

TOPIC: {user_topic}
TARGET AUDIENCE: {audience_description}
DESIRED DURATION: {target_duration}
SKILL LEVEL: {beginner|intermediate|advanced}

Generate a structured curriculum with learning objectives and topic breakdown.
```

### Expected Output Schema

```json
{
  "title": "string",
  "description": "string",
  "duration": "string",
  "skillLevel": "string",
  "prerequisites": ["string"],
  "learningObjectives": [
    {
      "id": "LO1",
      "objective": "string",
      "bloomLevel": "remember|understand|apply|analyze|evaluate|create",
      "assessmentMethod": "string"
    }
  ],
  "topics": [
    {
      "id": "T1",
      "title": "string",
      "duration": "string",
      "subtopics": ["string"],
      "objectivesAddressed": ["LO1", "LO2"]
    }
  ],
  "suggestedAssessments": [
    {
      "type": "quiz|project|discussion|presentation",
      "description": "string"
    }
  ]
}
```

---

## Prompt 2: Content Generation (Loop)

**Purpose**: Generate detailed lesson content for each topic.

### System Prompt

```
You are an expert content developer creating engaging training materials.
You write in a clear, conversational style with practical examples.

For each lesson, you must include:
1. Clear explanations with analogies for complex concepts
2. Real-world examples from the relevant industry
3. "Pro Tip" callouts for best practices
4. "Common Mistake" warnings for pitfalls
5. Key takeaways summary
6. Visual aid placeholders where helpful

Format: Markdown with proper headings
Length: 800-1500 words per lesson
```

### User Prompt Template

```
Generate a complete lesson for:

CURRICULUM CONTEXT:
{curriculum_json_from_prompt_1}

CURRENT TOPIC:
- Title: {topic_title}
- Subtopics: {subtopics}
- Learning Objectives: {related_objectives}
- Duration: {duration}

Create an engaging, comprehensive lesson that covers all subtopics.
Include practical examples, callouts, and end with key takeaways.
```

### Loop Logic

```python
def generate_all_content(curriculum):
    lessons = []
    for topic in curriculum['topics']:
        for subtopic in topic['subtopics']:
            lesson = generate_lesson(
                curriculum_context=curriculum,
                topic=topic,
                subtopic=subtopic
            )
            lessons.append(lesson)
    return lessons
```

---

## Prompt 3: Project Generation

**Purpose**: Create hands-on projects that apply learned concepts.

### System Prompt

```
You are an expert project-based learning designer.
You create practical, realistic projects that help learners apply new skills.

Each project must:
1. Have clear business relevance
2. Include step-by-step instructions
3. Be completable in the specified time
4. Have defined success criteria
5. Include a rubric for self-assessment
```

### User Prompt Template

```
Generate 2-3 hands-on projects for this training:

CURRICULUM:
{curriculum_json}

LEARNING OBJECTIVES:
{learning_objectives}

For each project, provide:
1. Title and description
2. Business scenario/context
3. Step-by-step instructions (5-7 steps)
4. Deliverables
5. Success criteria / rubric
6. Estimated completion time

Projects should range from guided (beginner) to independent (intermediate).
```

### Expected Output Schema

```json
{
  "projects": [
    {
      "id": "P1",
      "title": "string",
      "difficulty": "guided|scaffolded|independent",
      "duration": "string",
      "description": "string",
      "businessContext": "string",
      "objectivesAddressed": ["LO1", "LO2"],
      "prerequisites": ["string"],
      "steps": [
        {
          "step": 1,
          "title": "string",
          "instructions": "string",
          "deliverable": "string"
        }
      ],
      "rubric": [
        {
          "criterion": "string",
          "weight": 25,
          "excellent": "string",
          "satisfactory": "string",
          "needsImprovement": "string"
        }
      ]
    }
  ]
}
```

---

## Prompt 4: Quiz Generation

**Purpose**: Create assessment questions that test understanding.

### System Prompt

```
You are an expert assessment designer creating valid, reliable test questions.

Question design principles:
1. Each question tests a specific learning objective
2. Distractors (wrong answers) should be plausible, not obviously wrong
3. Avoid "none of the above" and "all of the above"
4. Include explanations for why answers are correct/incorrect
5. Mix question types: MCQ, True/False, scenario-based

Create questions at appropriate Bloom's taxonomy levels:
- Remember/Understand: ~40% of questions
- Apply/Analyze: ~40% of questions
- Evaluate/Create: ~20% of questions
```

### User Prompt Template

```
Generate a 20-question quiz for this training:

CURRICULUM:
{curriculum_json}

LEARNING OBJECTIVES:
{learning_objectives_with_bloom_levels}

KEY CONCEPTS COVERED:
{list_of_key_concepts_from_content}

Generate a balanced quiz with:
- 8 questions at Remember/Understand level
- 8 questions at Apply/Analyze level
- 4 questions at Evaluate/Create level

Include correct answers and explanations.
```

### Expected Output Schema

```json
{
  "quiz": {
    "title": "string",
    "passingScore": 70,
    "timeLimit": "30 minutes",
    "questions": [
      {
        "id": "Q1",
        "type": "mcq|tf|scenario",
        "bloomLevel": "remember|understand|apply|analyze|evaluate|create",
        "objectiveId": "LO1",
        "question": "string",
        "options": ["string"],
        "correctAnswer": 0,
        "explanation": "string"
      }
    ]
  }
}
```

---

## Implementation Code

```python
from openai import OpenAI
import json
from typing import Dict, List

client = OpenAI()

class TrainingGenerator:
    def __init__(self, model: str = "gpt-4-turbo"):
        self.model = model
        
    def generate_curriculum(self, topic: str, audience: str, 
                           duration: str, level: str) -> Dict:
        """Step 1: Generate curriculum structure"""
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": CURRICULUM_SYSTEM_PROMPT},
                {"role": "user", "content": CURRICULUM_USER_PROMPT.format(
                    user_topic=topic,
                    audience_description=audience,
                    target_duration=duration,
                    level=level
                )}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    
    def generate_lessons(self, curriculum: Dict) -> List[str]:
        """Step 2: Generate all lesson content"""
        lessons = []
        for topic in curriculum['topics']:
            lesson = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": CONTENT_SYSTEM_PROMPT},
                    {"role": "user", "content": CONTENT_USER_PROMPT.format(
                        curriculum_json=json.dumps(curriculum),
                        topic_title=topic['title'],
                        subtopics=topic['subtopics'],
                        related_objectives=topic['objectivesAddressed'],
                        duration=topic['duration']
                    )}
                ]
            )
            lessons.append(lesson.choices[0].message.content)
        return lessons
    
    def generate_projects(self, curriculum: Dict) -> Dict:
        """Step 3: Generate hands-on projects"""
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": PROJECT_SYSTEM_PROMPT},
                {"role": "user", "content": PROJECT_USER_PROMPT.format(
                    curriculum_json=json.dumps(curriculum),
                    learning_objectives=curriculum['learningObjectives']
                )}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    
    def generate_quiz(self, curriculum: Dict, concepts: List[str]) -> Dict:
        """Step 4: Generate assessment quiz"""
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": QUIZ_SYSTEM_PROMPT},
                {"role": "user", "content": QUIZ_USER_PROMPT.format(
                    curriculum_json=json.dumps(curriculum),
                    learning_objectives=curriculum['learningObjectives'],
                    list_of_key_concepts=concepts
                )}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    
    def generate_complete_training(self, topic: str, audience: str,
                                   duration: str, level: str) -> Dict:
        """Generate a complete training module"""
        # Step 1
        curriculum = self.generate_curriculum(topic, audience, duration, level)
        
        # Step 2
        lessons = self.generate_lessons(curriculum)
        
        # Step 3
        projects = self.generate_projects(curriculum)
        
        # Extract key concepts from lessons for quiz
        concepts = self._extract_concepts(lessons)
        
        # Step 4
        quiz = self.generate_quiz(curriculum, concepts)
        
        return {
            "curriculum": curriculum,
            "lessons": lessons,
            "projects": projects,
            "quiz": quiz
        }
```

---

## Quality Assurance Checks

After generation, run these validation checks:

```python
def validate_training(training: Dict) -> List[str]:
    issues = []
    
    # Check curriculum completeness
    if len(training['curriculum']['learningObjectives']) < 3:
        issues.append("Insufficient learning objectives (minimum 3)")
    
    # Check lesson coverage
    topics_count = len(training['curriculum']['topics'])
    lessons_count = len(training['lessons'])
    if lessons_count < topics_count:
        issues.append(f"Missing lessons: {topics_count - lessons_count} topics uncovered")
    
    # Check lesson length
    for i, lesson in enumerate(training['lessons']):
        word_count = len(lesson.split())
        if word_count < 500:
            issues.append(f"Lesson {i+1} too short: {word_count} words")
    
    # Check quiz coverage
    objectives = {lo['id'] for lo in training['curriculum']['learningObjectives']}
    tested = {q['objectiveId'] for q in training['quiz']['questions']}
    untested = objectives - tested
    if untested:
        issues.append(f"Untested objectives: {untested}")
    
    return issues
```

---

## Usage Example

```python
generator = TrainingGenerator()

result = generator.generate_complete_training(
    topic="Onboarding for sales team about our CRM system",
    audience="New sales representatives with basic computer skills",
    duration="4 hours",
    level="beginner"
)

# Returns complete training module ready for platform import
print(f"Generated {len(result['lessons'])} lessons")
print(f"Generated {len(result['projects']['projects'])} projects")
print(f"Generated {len(result['quiz']['questions'])} quiz questions")
```
