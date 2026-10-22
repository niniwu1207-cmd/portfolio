
console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}


let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'cv/', title: 'CV' },
];


const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"
  : "/portfolio/";

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  
    let url = p.url;

    if (!url.startsWith('http')) {
        url = BASE_PATH + url;
    }

    let title = p.title;

  
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);


    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }

    if (a.host !== location.host) {
        a.target = '_blank';
    }


}

let themeSelect = document.createElement('select');

themeSelect.innerHTML = `
  <option value="auto">Auto</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
`;

document.body.prepend(themeSelect);
themeSelect.addEventListener('change', () => {
localStorage.setItem('theme', themeSelect.value);
    if (themeSelect.value === 'auto') {
    document.documentElement.style.colorScheme = 'light dark';
  } else {
    document.documentElement.style.colorScheme = themeSelect.value;
  }
});

let savedTheme = localStorage.getItem('theme') || 'auto';

themeSelect.value = savedTheme;

document.documentElement.style.colorScheme =
  savedTheme === 'auto' ? 'light dark' : savedTheme;

let footer = document.createElement('footer');
footer.textContent = `© ${new Date().getFullYear()} Yi-Ning Wu`;
document.body.append(footer);

let profile = {
  name: 'Yi-Ning Wu',
  school: 'UC San Diego',
  major: 'Data Science',
};

console.log(profile);

let nameElement = document.querySelector('#profile-name');

if (nameElement) {
  nameElement.textContent = profile.name;
}

let introElement = document.querySelector('#profile-intro');

if (introElement) {
  introElement.textContent =
    `Hi! I'm a ${profile.major} student at ${profile.school}.`;
}

let greetingElement = document.querySelector('#greeting');

if (greetingElement) {
  let hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = 'Good morning! ☀️';
  } else if (hour < 18) {
    greeting = 'Good afternoon! 🌸';
  } else {
    greeting = 'Good evening! 🌙';
  }

  greetingElement.textContent = greeting;
}

let greetingButton = document.querySelector('#greeting-button');

if (greetingButton) {
  greetingButton.addEventListener('click', () => {
    greetingElement.textContent = 'Have a lovely day! 💕';
  });
}

let skills = ['Python', 'HTML', 'CSS', 'JavaScript'];

let skillsList = document.querySelector('#skills-list');

if (skillsList) {
  for (let skill of skills) {
    let li = document.createElement('li');
    li.textContent = skill;
    skillsList.append(li);
  }
}


const form = document.querySelector('#contact-form');

form?.addEventListener('submit', (event) => {
    event.preventDefault();

const data = new FormData(form);

const subject = encodeURIComponent(data.get('subject'));
const body = encodeURIComponent(data.get('body'));

const url = `${form.action}?subject=${subject}&body=${body}`;

location.href = url;
});


export async function fetchJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}


export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  containerElement.innerHTML = '';

  for (const project of projects) {
    const article = document.createElement('article');

    article.innerHTML = `
      <${headingLevel}>${project.title}</${headingLevel}>
      <img src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>
    `;

    containerElement.appendChild(article);
  }
}


export async function fetchGithubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
