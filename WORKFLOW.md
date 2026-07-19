# WORKFLOW.md

## Introduction

This experiment compared two ways of building the same feature: an authentication page. The first branch came from a vague prompt, while the second branch was generated from a detailed prompt with constraints, file references, and a verification step. The goal was to see how prompt quality affects correctness, accessibility, edge case handling, and review effort.

## Round One: Vague Prompt

The vague prompt produced a basic authentication page, but it fell short in several areas:

- **Correctness:** It displayed a form and some error messages, but there were no backend calls and validation was minimal.
- **Accessibility:** Styles didn’t match the rest of the site, and disabled states or visual cues were missing.
- **Edge Cases:** Empty fields and invalid inputs weren’t handled consistently.
- **Review Effort:** The code required significant manual review and refactoring to meet project standards.

This branch showed how underspecified prompts lead to functional but incomplete code that increases downstream effort.

## Round Two: Precise Prompt

The precise prompt produced a much stronger result:

- **Correctness:** The form used `async/await` to prepare for backend integration, included robust error handling, and disabled the submit button until valid data was entered.
- **Accessibility:** Styles matched the existing design system, and disabled states were clearly communicated to users.
- **Edge Cases:** A test file was generated to cover empty inputs, invalid formats, and error scenarios. All tests ran successfully and passed.
- **Review Effort:** Because the output aligned with project conventions and included tests, review was faster and focused on refinement rather than fixing basics.

This branch highlighted how precise prompts reduce ambiguity and produce production‑ready code.

## Comparison

The diff between branches made the differences clear. The vague branch lacked integration points, consistent styling, and test coverage. The precise branch aligned with the design system, anticipated backend work, and validated edge cases. Prompt quality directly influenced correctness, maintainability, and review effort.

## Lessons Learned

This exercise highlighted several important takeaways for future development:

1. **Be specific in prompts.** Clear instructions with style references, constraints, and expected behaviors lead to code that matches project standards and reduces rework.
2. **Always include a verification step.** Generating tests or running lint checks ensures that new features are correct, handle edge cases, and can be trusted before review.
3. **Plan for integration.** Even if the backend isn’t ready, structuring calls with `async/await` prepares the feature for smooth future connections.
4. **Reduce review burden.** Precise prompts and automated checks shift effort from fixing basics to refining details, making collaboration more efficient.

Together, these lessons show that investing effort up front in prompt clarity and verification pays off in higher‑quality, more maintainable code.

## Conclusion

This exercise showed that vague prompts produce incomplete code requiring heavy review, while precise prompts generate correct, accessible, and testable features. For capstone work, structured prompts with verification steps will reduce review effort and improve overall quality.
