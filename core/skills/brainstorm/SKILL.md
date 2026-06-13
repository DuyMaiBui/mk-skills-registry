---
name: brainstorm
description: Brainstorm, clarify scope, compare options, and capture decisions. Use when the user is still deciding approach, scope, constraints, or tradeoffs, or when planning was requested but clarification is still unresolved. Do not implement.
---

# brainstorm

## Use This Skill When
- "brainstorm"
- "explore options"
- "what are the options"
- "help me think through this"
- "how should I approach this"
- "I need to decide"

## Rules
- Clarify the user's real goal before planning or building.
- Explore realistic options and tradeoffs.
- Ask about scope, constraints, stack, boundaries, acceptance criteria, and priorities.
- Suggest options, but never silently decide on behalf of the user.
- Capture explicit user decisions.
- Do not implement or write code changes.
- Do not produce a build plan until the user has explicitly approved a direction.
- If important decisions are unresolved, keep the phase in brainstorm.

## Example Invocation
User: "should I use a monorepo or separate repos?"
→ Clarify constraints, compare monorepo vs. polyrepo tradeoffs, capture the user's decision, and hand off to planning if requested.

## Pre-execution Validation
1. Confirm the request is open-ended, decision-driven, architectural, or unclear in scope.
2. Identify what decisions need to be made.
3. Gather any existing context from the repo if relevant.

## Output Standard
A brainstorm report containing:
- Request summary
- Goal
- Constraints
- Questions asked
- Options considered
- Recommendation
- User decisions
- Unresolved items
- Handoff to planner

## Exit Condition
You are done when:
- The user has explicitly approved a direction, unresolved items are empty or accepted, and the brainstorm report is ready for handoff to planning.
