const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: 0.07 })
  : null;
document.querySelectorAll('.reveal').forEach(element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('visible');
});

// Illustrative workflow steps, not live customer data.
const steps = [
  {
    kicker: 'START WELL',
    title: 'Get the programme ready.',
    text: 'Bring your learning plan, content, enrolments and responsibilities together before delivery begins.',
    bullets: ['Organise programmes and learning content', 'Set up assessments and milestones', 'Assign the right people to each step'],
    status: 'Ready to launch',
    checklist: ['Programme organised', 'Team responsibilities set', 'Evidence requirements mapped'],
    progress: '82%'
  },
  {
    kicker: 'KEEP IT MOVING',
    title: 'Know how learning is going.',
    text: 'Follow learning activities, attendance and participation without waiting for another spreadsheet.',
    bullets: ['Make learning accessible to your cohort', 'See participation and attendance', 'Spot activities that need attention'],
    status: 'Delivery in motion',
    checklist: ['Learning available', 'Participation visible', 'Follow-ups identified'],
    progress: '65%'
  },
  {
    kicker: 'KEEP ASSESSMENTS ON TRACK',
    title: 'From submission to outcome.',
    text: 'Give assessments a clearer path through submission, marking and feedback.',
    bullets: ['Follow submissions', 'Track marking and feedback', 'See outstanding assessment tasks'],
    status: 'Assessments progressing',
    checklist: ['Submissions organised', 'Marking tracked', 'Feedback in one place'],
    progress: '76%'
  },
  {
    kicker: 'CONNECT THE PROOF',
    title: 'Keep evidence with the learner.',
    text: 'Bring workplace logbooks, practical experience and supporting records into one clear picture.',
    bullets: ['Capture workplace activity', 'Link evidence to the learner', 'Follow gaps before they grow'],
    status: 'Evidence taking shape',
    checklist: ['Workplace records linked', 'Evidence easy to locate', 'Gaps visible'],
    progress: '72%'
  },
  {
    kicker: 'FINISH WITH CLARITY',
    title: 'Make every update count.',
    text: 'See what is complete, what needs a final review and what is ready for reporting.',
    bullets: ['Follow outstanding actions', 'Support moderation and completion', 'Prepare a clearer programme overview'],
    status: 'Reporting made simpler',
    checklist: ['Records organised', 'Milestones visible', 'Next actions clear'],
    progress: '90%'
  }
];
const tabs = [...document.querySelectorAll('.workflow-tabs button')];
const stageKicker = document.querySelector('#stage-kicker');
const stageTitle = document.querySelector('#stage-title');
const stageText = document.querySelector('#stage-text');
const stageList = document.querySelector('#stage-list');
const visualTitle = document.querySelector('#visual-title');
const checks = [...document.querySelectorAll('.checks span')];
const progress = document.querySelector('.progress i');
function setStep(index) {
  const stage = steps[index];
  if (!stage) return;
  tabs.forEach((button, i) => {
    const selected = i === index;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  stageKicker.textContent = stage.kicker;
  stageTitle.textContent = stage.title;
  stageText.textContent = stage.text;
  stageList.replaceChildren(...stage.bullets.map(value => {
    const item = document.createElement('li');
    item.textContent = value;
    return item;
  }));
  visualTitle.textContent = stage.status;
  checks.forEach((row, i) => {
    row.replaceChildren(document.createTextNode(stage.checklist[i] + ' '));
    const tick = document.createElement('b');
    tick.textContent = '✓';
    row.append(tick);
  });
  progress.style.width = stage.progress;
}
tabs.forEach((button, index) => {
  button.addEventListener('click', () => setStep(index));
  button.addEventListener('keydown', event => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setStep(next);
    tabs[next].focus();
  });
});
setStep(0);
const menu = document.querySelector('.menu');
const nav = document.querySelector('.topbar nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
}));

// Introduce the user-provided connected workflow diagram when it enters view.
(() => {
  const after = document.getElementById('sfba-after-panel');
  if (!after) return;
  if (!('IntersectionObserver' in window)) { after.classList.add('sfba-in'); return; }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { after.classList.add('sfba-in'); observer.disconnect(); break; }
    }
  }, {threshold: 0.18});
  observer.observe(after);
})();


// Animate the user-supplied 5-stage workflow only when its section enters view.
(() => {
  const section = document.querySelector('.sfpipe-section');
  if (!section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    section.classList.add('sfpipe-in');
    return;
  }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      section.classList.add('sfpipe-in');
      observer.disconnect();
    }
  }, {threshold:.12});
  observer.observe(section);
})();

// SoftDev360 AI Assistant: marketing-only interactive sample. No AI API or live data is called.
(() => {
  const section = document.getElementById('ai');
  if (!section) return;
  const tabs = [...section.querySelectorAll('.sfai-mode')];
  const suggestions = section.querySelector('#sfai-suggestions');
  const input = section.querySelector('#sfai-input');
  const form = section.querySelector('#sfai-form');
  const panel = section.querySelector('#sfai-panel');
  const explanation = section.querySelector('#sfai-mode-description');
  const answer = section.querySelector('#sfai-answer');
  const answerTitle = section.querySelector('#sfai-answer-title');
  const answerText = section.querySelector('#sfai-answer-text');
  const tags = section.querySelector('#sfai-answer-tags');
  const icons = {
    question: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M9 9.5a2.5 2.5 0 1 1 3.3 2.4c-.8.3-1.3.7-1.3 1.6M11 16h.01"/></svg>',
    trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 16 6-5 4 3 7-9M15 5h5v5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 8 3v7c0 5-3.5 8-8 10-4.5-2-8-5-8-10V5l8-3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4 10-10"/><circle cx="12" cy="12" r="9"/></svg>'
  };
  const reports = [
    { id: 'programme', label: 'Programme data analysis report', title: 'Programme data analysis', text: 'This report layout brings programme participation, learner activity, assessments and evidence progress into one overview for managers.', tags: ['Programme overview','Activity trends','Follow-up actions'], icon: 'trend' },
    { id: 'progress', label: 'Learnership progress report', title: 'Learnership progress', text: 'See which learning milestones are complete, what is still in progress and where support may be needed.', tags: ['Milestones','Completion','Outstanding work'], icon: 'trend' },
    { id: 'attendance', label: 'Attendance report', title: 'Attendance overview', text: 'Summarise recorded attendance, identify gaps and prepare a consistent view across learners or cohorts.', tags: ['Attendance','Exceptions','Cohort view'], icon: 'check' },
    { id: 'risk', label: 'At-risk learners report', title: 'Learners needing attention', text: 'Bring together signs such as missed activities, incomplete assessments and evidence gaps so teams can follow up earlier.', tags: ['Risk signals','Next actions','Follow-up'], icon: 'shield' },
    { id: 'assessment', label: 'Assessment outcomes report', title: 'Assessment outcomes', text: 'Organise submission status, marking progress and results to make the assessment workload easier to review.', tags: ['Submissions','Results','Pending marking'], icon: 'check' },
    { id: 'tracker', label: 'Learner tracker report', title: 'Learner tracker', text: 'Follow learners through enrolment, attendance, learning activity and assessment milestones in one structured report.', tags: ['Learner status','Milestones','Follow-up'], icon: 'trend' },
    { id: 'scope', label: 'Scope: units we’ve worked on', title: 'Units and scope overview', text: 'Organise the units or modules covered so far, with progress and supporting learning activity for each part of the programme.', tags: ['Units covered','Learning scope','Progress'], icon: 'check' },
    { id: 'executive', label: 'Executive summary', title: 'Programme executive summary', text: 'Create a concise management-ready narrative covering progress, participation, emerging issues and priorities.', tags: ['Highlights','Risks','Decisions'], icon: 'trend' }
  ];
  const queries = [
    { id: 'stall', label: 'Which learners are falling behind?', title: 'Identify stalled progress', text: 'The live assistant can look at recent activity, outstanding learning and assessment records to help identify learners who may need support.', tags: ['Learner activity','Progress signals','Follow-up'], icon: 'question' },
    { id: 'overdue', label: 'What assessments are outstanding?', title: 'Review pending assessments', text: 'Ask for a consolidated view of unsubmitted work, marking queues or unresolved assessment actions across your programmes.', tags: ['Submissions','Marking status','Outstanding work'], icon: 'check' },
    { id: 'evidence', label: 'Where are the evidence gaps?', title: 'Find evidence gaps', text: 'Explore workplace logbook and evidence records to see what still needs to be supplied or reviewed.', tags: ['Workplace records','Evidence gaps','Review'], icon: 'shield' },
    { id: 'week', label: 'What changed in my programme this week?', title: 'Weekly programme check-in', text: 'Compare recent attendance, activity, assessment and evidence updates to prepare a clearer weekly progress view.', tags: ['Recent activity','Attendance','Changes'], icon: 'trend' }
  ];
  let mode = 'report';
  function setAnswer(title, text, labelTags) {
    answerTitle.textContent = title;
    answerText.textContent = text;
    tags.replaceChildren(...labelTags.map(label => {
      const item = document.createElement('span');
      item.textContent = label;
      return item;
    }));
    answer.hidden = false;
  }
  function setMode(next) {
    if (!['report','query'].includes(next)) return;
    mode = next;
    tabs.forEach(tab => {
      const selected = tab.dataset.aiMode === next;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', next === 'report' ? 'sfai-tab-report' : 'sfai-tab-query');
    explanation.textContent = next === 'report'
      ? 'Build a clear report from the information already in your platform.'
      : 'Ask your platform questions and find the information that matters.';
    input.placeholder = next === 'report' ? 'Describe the report you need...' : 'Ask a question about your programme...';
    input.value = '';
    answer.hidden = true;
    const list = next === 'report' ? reports : queries;
    const fragment = document.createDocumentFragment();
    for (const item of list) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sfai-suggestion';
      button.dataset.aiPreset = item.id;
      button.innerHTML = icons[item.icon] + '<span></span><span class="sfai-suggestion-arrow" aria-hidden="true">↗</span>';
      button.querySelector('span').textContent = item.label;
      fragment.append(button);
    }
    suggestions.replaceChildren(fragment);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setMode(tab.dataset.aiMode));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault();
      const nextIndex = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      setMode(tabs[nextIndex].dataset.aiMode);
      tabs[nextIndex].focus();
    });
  });
  suggestions.addEventListener('click', e => {
    const button = e.target.closest('button[data-ai-preset]');
    if (!button) return;
    const list = mode === 'report' ? reports : queries;
    const selection = list.find(item => item.id === button.dataset.aiPreset);
    if (!selection) return;
    input.value = selection.label;
    setAnswer(selection.title, selection.text, selection.tags);
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) { input.focus(); return; }
    const list = mode === 'report' ? reports : queries;
    const selection = list.find(item => item.label.toLowerCase() === query.toLowerCase());
    if (selection) {
      setAnswer(selection.title, selection.text, selection.tags);
      return;
    }
    setAnswer('Try this in your SoftDev360 account', 'This is an interactive website preview, not a live AI connection. In the platform, the assistant can use authorised programme records to answer questions and help prepare reports. Book a demo to see this with real data.', ['Website preview only','No live data']);
  });
})();
