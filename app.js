const quizData = [
  {question:"A post says: ‘SHOCKING! Share this with EVERYONE before it gets deleted!!!’ but gives no source. What is your best next step?", options:["Share it quickly","Needs verification","It must be real"], answer:1, explanation:"Urgency, sensational language, excessive punctuation, and no source are strong reasons to pause and verify."},
  {question:"You find an article from two years ago being shared as breaking news today. How should you classify it?", options:["Real as presented","Fake in every case","Needs verification"], answer:2, explanation:"The original article may be real, but its date and current context need checking before you trust or share the post."},
  {question:"A claim includes a named publisher, a clear date, links to evidence, and is confirmed by two independent reliable outlets. What does that suggest?", options:["A stronger signal of reliability","It is definitely true","It is clickbait"], answer:0, explanation:"Multiple independent checks are reassuring, but responsible readers still avoid treating a simple checklist as absolute proof."}
];

const form = document.querySelector('#checker-form');
const resultPanel = document.querySelector('#result-panel');
const errorMessage = document.querySelector('#form-error');

function runCheck(event) {
  event.preventDefault();
  const message = document.querySelector('#message').value.trim();
  const source = document.querySelector('#source').value.trim();
  const date = document.querySelector('#date').value;
  if (!message) { errorMessage.textContent = 'Add a headline or message first.'; document.querySelector('#message').focus(); return; }
  errorMessage.textContent = '';
  const lower = message.toLowerCase();
  const warnings = [];
  if (/\b(shocking|guaranteed|miracle| unbelievable|you won't believe|breaking)\b/.test(lower) || /[A-Z]{5,}/.test(message)) warnings.push('Sensational or absolute language');
  if (/\b(share|forward|send)\b.{0,35}\b(now|immediately|everyone|urgent|quickly)\b/i.test(message) || /before it gets deleted|don.t let them hide/i.test(lower)) warnings.push('Urgent sharing request');
  if ((message.match(/!/g) || []).length >= 2 || (message.match(/\?/g) || []).length >= 3) warnings.push('Excessive punctuation');
  if (!source) warnings.push('Missing source or publisher');
  if (!date) warnings.push('Unclear publication date');
  const score = Math.min(100, warnings.length * 18 + (warnings.length ? 5 : 0));
  let category = 'Low signal — still check';
  let advice = 'Few warning signs stood out. Verify the source and context before sharing.';
  if (score >= 55) { category = 'High risk — verify before sharing'; advice = 'Several warning signs appeared. Pause, find the original source, and cross-check the claim.'; }
  else if (score >= 25) { category = 'Needs verification'; advice = 'Some warning signs appeared. Check the source, date, evidence, and another reliable outlet.'; }
  resultPanel.innerHTML = `<div class="result-report"><div class="result-top"><span class="result-kicker">SIGNAL REPORT</span><span class="result-score">${score}<small>/100</small></span></div><h3 class="result-category">${category}</h3><p class="result-advice">${advice}</p><ul class="warning-list">${warnings.length ? warnings.map(item => `<li>${item}</li>`).join('') : '<li>No obvious warning signs detected</li>'}</ul><p class="result-advice" style="margin-top:18px"><strong>Remember:</strong> this is a prompt to verify, not proof that a story is true or false.</p></div>`;
}
form.addEventListener('submit', runCheck);

let quizIndex = 0; let quizScore = 0; let quizLocked = false;
const quizContent = document.querySelector('#quiz-content');
function renderQuiz() {
  const item = quizData[quizIndex]; quizLocked = false;
  document.querySelector('#quiz-progress-label').textContent = `QUESTION ${quizIndex + 1} / ${quizData.length}`;
  document.querySelector('#quiz-progress-bar').style.width = `${((quizIndex + 1) / quizData.length) * 100}%`;
  quizContent.innerHTML = `<h3 class="quiz-question">${item.question}</h3><div class="quiz-options">${item.options.map((option, index) => `<button class="quiz-option" data-option="${index}">${option}</button>`).join('')}</div><div class="quiz-feedback" id="quiz-feedback"></div>`;
  quizContent.querySelectorAll('.quiz-option').forEach(button => button.addEventListener('click', () => answerQuiz(Number(button.dataset.option))));
}
function answerQuiz(selected) {
  if (quizLocked) return; quizLocked = true;
  const item = quizData[quizIndex]; if (selected === item.answer) quizScore++;
  quizContent.querySelectorAll('.quiz-option').forEach((button, index) => { button.classList.toggle('selected', index === selected); button.disabled = true; });
  const feedback = document.querySelector('#quiz-feedback');
  feedback.innerHTML = `${selected === item.answer ? '<strong>Good read.</strong>' : '<strong>Good pause.</strong>'} ${item.explanation}<br /><button class="button button-dark quiz-next">${quizIndex === quizData.length - 1 ? 'See my result' : 'Next question'} <span>→</span></button>`;
  feedback.querySelector('button').addEventListener('click', () => { if (quizIndex === quizData.length - 1) showQuizResult(); else { quizIndex++; renderQuiz(); } });
}
function showQuizResult() {
  const message = quizScore === 3 ? 'Sharp instincts.' : quizScore === 2 ? 'Good foundation.' : 'Keep practicing the pause.';
  quizContent.innerHTML = `<div class="result-report"><span class="result-kicker">YOUR QUIZ RESULT</span><h3 class="result-category">${message}</h3><p class="result-advice">You got <strong>${quizScore} out of ${quizData.length}</strong> right. The most useful habit is not guessing faster—it’s knowing when to verify.</p><button class="button button-dark quiz-next" id="restart-quiz">Try again <span>↻</span></button></div>`;
  document.querySelector('#restart-quiz').addEventListener('click', () => { quizIndex = 0; quizScore = 0; renderQuiz(); });
}
renderQuiz();

const dialog = document.querySelector('#info-dialog');
const dialogContent = document.querySelector('#dialog-content');
const content = {misinformation:['Misinformation','Misinformation is false or inaccurate information shared without necessarily intending to deceive. A person may pass it on because they believe it is true. The best response is to correct carefully and share the context that was missing.'],disinformation:['Disinformation','Disinformation is false content deliberately created or spread to mislead people. Look for coordinated language, missing evidence, impersonation, or a clear attempt to provoke a reaction.'],clickbait:['Clickbait','Clickbait uses dramatic promises, curiosity gaps, or emotional language to earn your click. The headline may overstate what the article actually supports. Read beyond the headline and inspect the source.']};
document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => { const item = content[button.dataset.modal]; dialogContent.innerHTML = `<div class="dialog-kicker">THE BASICS</div><h2>${item[0]}</h2><p>${item[1]}</p>`; dialog.showModal(); }));
document.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelector('#assessment-button').addEventListener('click', () => document.querySelector('#assessment-dialog').showModal());
document.querySelector('.dialog-dismiss').addEventListener('click', () => document.querySelector('#assessment-dialog').close());
const menuToggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }));
