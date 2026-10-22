# Product Requirements Document

## Fake News Detection and Media Literacy Programme

**Version:** 1.0  
**Status:** Draft  
**Project type:** TY academic and community-awareness web application  
**Source:** `Sanjay-Report_Fake_News_Media_Literacy_Project_Report.md`

## 1. Product Summary

The product is a beginner-friendly, responsive website that teaches practical media-literacy skills and helps users identify potentially suspicious news content. It combines educational content, a transparent rule-based checker, an interactive quiz, and pre-test/post-test evaluation support.

The checker must not claim to determine whether a story is factually true. It identifies warning signs and recommends verification before sharing.

## 2. Problem Statement

Users frequently encounter sensational headlines, fabricated claims, manipulated media, clickbait, outdated information, and messages that encourage immediate forwarding. Many users share content without checking its source, date, or accuracy.

The product provides simple guidance and an explainable first-level screening process so users can pause, assess, and verify information responsibly.

## 3. Goals and Objectives

### Goals

- Improve users’ awareness of misinformation and disinformation.
- Encourage source, date, and cross-checking habits.
- Provide an understandable warning-sign checker.
- Measure learning through interactive assessment.

### Objectives

- Explain fake news, misinformation, disinformation, clickbait, and manipulated content.
- Let users submit a headline or message for rule-based analysis.
- Return a risk/verification result with the warning signs detected.
- Provide a Real / Fake / Needs Verification quiz.
- Support pre-test and post-test assessment of programme participants.
- Deliver a responsive static website using HTML, CSS, JavaScript, and JSON.

## 4. Target Users

| User | Need |
|---|---|
| Students and young internet users | Learn how to recognize suspicious content. |
| General social-media and messaging-app users | Decide whether to pause and verify before sharing. |
| Awareness-programme facilitators | Conduct assessments and explain verification practices. |
| Project evaluators | Demonstrate a working, transparent technical solution. |

## 5. Product Scope

### In scope

- Responsive educational website.
- Learn section with media-literacy content.
- Check section for headline/message analysis.
- Explainable rule-based risk scoring.
- Quiz section with score and recommendation.
- Pre-test and post-test question sets or forms.
- Static JSON data for questions, examples, and educational content.
- Functional testing and user feedback collection.

### Out of scope for version 1

- Definitive fact-checking or truth classification.
- Machine-learning or NLP model training.
- Automatic article crawling or URL verification.
- Image reverse search.
- Browser extension or native mobile application.
- Direct integration with third-party fact-checking services.
- User accounts, authentication, or server-side data storage.

## 6. User Journeys

### 6.1 Learn

1. User opens the website.
2. User selects the Learn section.
3. User reads explanations of misinformation, disinformation, clickbait, manipulated content, and verification steps.
4. User reviews the responsible-sharing checklist.

### 6.2 Check a message

1. User enters a headline or message.
2. User optionally enters source and date information.
3. User submits the content.
4. The system checks predefined warning signs.
5. The system displays a risk level, score, detected warning signs, and verification advice.
6. User is reminded that the result is not proof that the content is fake.

### 6.3 Take the quiz

1. User starts the quiz.
2. User answers questions classified as Real, Fake, or Needs Verification.
3. The system calculates the score.
4. The system displays feedback and a learning recommendation.

### 6.4 Participate in the awareness programme

1. Participant completes a 10-question pre-test.
2. Facilitator delivers the awareness and verification session.
3. Participant completes practical classification activities.
4. Participant completes the post-test.
5. Facilitator compares pre-test and post-test scores.

## 7. Functional Requirements

### FR-01: Website navigation

- The website shall provide navigation to Learn, Check, Quiz, and assessment content.
- Navigation shall work on desktop and mobile screen sizes.
- The interface shall use clear labels and accessible controls.

### FR-02: Educational content

- The Learn section shall explain fake news, misinformation, disinformation, clickbait, manipulated content, and outdated information.
- The Learn section shall provide practical verification steps:
  - Check the source or publisher.
  - Check the publication date.
  - Compare with reliable sources.
  - Inspect the wording and evidence.
  - Avoid impulsive forwarding.
- Content shall state that the checker provides guidance, not factual proof.

### FR-03: Checker input

- The Check section shall accept a headline or message.
- The interface should accept optional source and date fields.
- Empty submissions shall be rejected with a clear validation message.
- Input shall be processed locally in the browser.

### FR-04: Rule-based analysis

The system shall identify applicable warning signs, including:

| Rule | Example indicator | Result |
|---|---|---|
| Sensational language | “SHOCKING”, “100% GUARANTEED” | Increase risk |
| Urgent sharing request | “Share immediately” | Increase risk |
| Excessive punctuation | Repeated `!` or `?` | Increase risk |
| Missing source | No publisher/source supplied | Increase risk |
| Unclear date | Missing or potentially outdated date | Increase risk |

- Each matched warning sign shall contribute to a transparent score.
- The system shall show which rules were triggered.
- The implementation shall use JavaScript and shall not require machine learning.

### FR-05: Checker result

- The system shall display a risk or verification score.
- The result shall use non-definitive wording such as `Needs Verification` or `High Risk — Verify Before Sharing`.
- The result shall include practical next steps.
- The system shall explicitly state that a high-risk result does not prove the story is fake.

### FR-06: Quiz

- Quiz questions shall be stored in JSON or an equivalent maintainable data structure.
- Each question shall provide Real, Fake, or Needs Verification choices.
- The system shall prevent or clearly handle incomplete quiz submissions.
- The system shall calculate and display the score after submission.
- The result shall include a basic recommendation based on performance.

### FR-07: Pre-test and post-test

- The programme shall support 10-question pre-test and post-test assessments.
- The assessment questions shall measure recognition of warning signs and verification habits.
- Scores shall be recorded or exportable by the facilitator using the selected implementation method.
- The project documentation shall explain how pre-test and post-test scores are compared.

### FR-08: Feedback and error handling

- Invalid or incomplete input shall receive understandable feedback.
- Results shall remain readable on small screens.
- The system shall avoid technical jargon in user-facing messages.

## 8. Scoring Requirements

The initial implementation may use a simple additive model. Each warning sign contributes points, and the total maps to a user-facing category. The exact weights shall be documented in the implementation and remain easy to modify.

Recommended categories:

| Score range | Category | User guidance |
|---|---|---|
| Low | Check Before Sharing | Few warning signs detected; verify the source anyway. |
| Medium | Needs Verification | Multiple warning signs detected; cross-check before sharing. |
| High | High Risk — Verify Before Sharing | Strong warning signs detected; do not forward without reliable confirmation. |

The checker shall never label content as definitively real or fake based only on the score.

## 9. Non-Functional Requirements

- **Usability:** A first-time user should understand the primary actions without training.
- **Accessibility:** Use readable contrast, labels, keyboard-friendly controls, and meaningful feedback.
- **Responsiveness:** Support common desktop, tablet, and mobile viewport sizes.
- **Performance:** Static pages and local checks should load and respond quickly on typical student devices.
- **Maintainability:** Keep quiz questions, examples, and educational content separate from logic where practical.
- **Transparency:** Display the reason for each checker result.
- **Privacy:** Do not send submitted messages or assessment answers to an external service in version 1.
- **Compatibility:** Work in current mainstream browsers without a backend.

## 10. Technical Requirements

| Layer | Technology | Requirement |
|---|---|---|
| Structure | HTML5 | Semantic page structure and forms. |
| Styling | CSS3 | Responsive layout, typography, and states. |
| Logic | JavaScript | Checker rules, scoring, validation, and quiz behavior. |
| Data | JSON | Quiz questions, examples, and educational content. |
| Development | VS Code | Local development and testing. |
| Hosting | GitHub Pages, optional | Static deployment for demonstration. |

## 11. Success Metrics

- All Learn, Check, Quiz, and assessment flows work in functional testing.
- Users can identify the warning signs detected by the checker.
- Quiz scores are calculated correctly for all answer combinations.
- Participants demonstrate improved average post-test scores compared with pre-test scores.
- Users report that the guidance is understandable and useful.
- The website works on desktop and mobile layouts.

## 12. Acceptance Criteria

- A user can navigate to every primary section from the website.
- A valid headline/message produces a score, category, detected warning signs, and verification advice.
- Missing input produces a clear validation message and does not calculate a misleading result.
- Sensational wording, urgent sharing language, excessive punctuation, missing source, and unclear date can be detected according to documented rules.
- Checker results use cautious wording and include the product limitation.
- A user can complete the quiz and receive a correct score and recommendation.
- Pre-test and post-test contain 10 questions each and support score comparison.
- The interface remains usable at mobile and desktop widths.
- Educational content covers source checking, date checking, cross-checking, and responsible sharing.

## 13. Testing Plan

- Test each checker rule with positive and negative examples.
- Test empty, short, and unusually long inputs.
- Verify score calculations manually against expected results.
- Test all quiz answer combinations and incomplete submissions.
- Test navigation, responsive layouts, and keyboard interaction.
- Collect user feedback on clarity and ease of use.
- Compare pre-test and post-test results using average score and percentage improvement.

## 14. Risks and Limitations

- Rule-based analysis can produce false positives and false negatives.
- The system cannot establish factual truth or replace professional fact-checking.
- Users may interpret a score as a definitive verdict unless the limitation is clearly displayed.
- Static content can become outdated and requires periodic review.
- Pre-test and post-test results may be affected by participant size, question familiarity, or self-reporting bias.

## 15. Future Enhancements

- URL-based article checking.
- Links to trusted fact-checking resources.
- Hindi, Marathi, and other Indian-language support.
- Image reverse-search guidance.
- Browser extension or mobile application.
- NLP or machine-learning analysis after suitable data and evaluation are available.

## 16. Deliverables

- Responsive project website.
- Source code.
- Quiz question bank.
- Pre-test and post-test forms or results.
- Awareness presentation.
- Project report.
- Demonstration screenshots.
- Final presentation/PPT.
