// Close links
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function () {
  // linksContainer.classList.toggle('show-links');

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // console.log(linksContainer.getBoundingClientRect());
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// Fixed navbar
const navbar = document.getElementById('navbar');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }

  // setup back to top link
  if (scrollHeight > 80) {
    console.log('Activate scroll up');

    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});

// Select links for smooth scroll
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav');
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });

    // close
    linksContainer.style.height = 0;
  });
});

// Set fullyear date
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
