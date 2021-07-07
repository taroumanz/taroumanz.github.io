'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    // {q: '世界一大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖'], a: 'カスピ海'},
    // {q: '2の8乗は？', c: ['1024', '64', '256'], a: '256'},
    // {q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'HTML'], a: 'Python'},
    {q: '肝機能の指標となる検査項目は？', c: ['AST', 'TP', 'Alb'], a: 'AST'},
    {q: '心不全の指標となる検査項目は？', c: ['ALT', 'ALP', 'BNP'], a: 'BNP'},
    {q: '腎機能の指標となる検査項目は？', c: ['Ca', 'クレアチニン', 'クレアチン'], a: 'クレアチニン'},
    {q: '心筋梗塞の指標となる検査項目は？', c: ['γ-GT', 'BUN', 'トロポニン'], a: 'トロポニン'},
    {q: '前立腺癌の指標となる検査項目は？', c: ['CEA', 'PSA', 'AFP'], a: 'PSA'},
    {q: '肝細胞癌の指標となる検査項目は？', c: ['AFP', 'CA15-3', 'CA19-9'], a: 'AFP'},
    {q: '栄養状態の指標となる検査項目は？', c: ['Ch-E', 'eGFR', 'ALP'], a: 'Ch-E'},
    {q: '炎症の指標となる検査項目は？', c: ['NH3', 'RBC', 'CRP'], a: 'CRP'},
    {q: '糖尿病の指標となる検査項目は？', c: ['TP', 'HbA1c', 'P'], a: 'HbA1c'},
  ]);
  let currentNum = 0;
  let isAnswerd;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswerd === true) {
      return;
    }
    isAnswerd = true;
    if (li.textContent === quizSet[currentNum].a) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz () {
    isAnswerd = false;
    question.textContent = `Q.${currentNum +1} ${quizSet[currentNum].q}`;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);

    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      choices.appendChild(li);
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score!';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      // console.log(`Score: ${score} / ${quizSet.length} 問中`);
      scoreLabel.textContent = `Score: ${score} (${quizSet.length} 問中) でした！`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });

}