//페이지 아래로 스크롤시 header 스타일링 적용
const header = document.querySelector('.header')
// 객체의 총 높이 
const headerHeight = header.offsetHeight
//console.log(headerHeight) 
document.addEventListener('scroll',()=>{
    if(window.scrollY> headerHeight){
        header.classList.add('header--dark')     //헤더에 적용된 클래스 리스트 확인
    }
    else{
        header.classList.remove('header--dark')
    }
})

// home 섹션을 아래로 스크롤시 투명하게 처리함
const home = document.querySelector('.home__container')
const homeHeight = home.offsetHeight
document.addEventListener('scroll',() => {
    home.style.opacity = 1-window.scrollY / homeHeight
})
// 화살 업 버튼을 아래로 내릴시 투명하게 처리 함
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll',()=>{
    if(window.scrollY > homeHeight / 2){
        arrowUp.style.opacity = 1
    }
    else{
        arrowUp.style.opacity = 0
    }
})


// 네비바 토글 버튼 클릭 처리
const navbarMenu = document.querySelector('.header__menu')
const navbarToggle = document.querySelector('.header__toggle')

navbarToggle.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open')
})
// navbar 메뉴 클릭시 메뉴를 자동으로 닫아줌

navbarMenu.addEventListener('click',()=>{
    navbarMenu.classList.remove('open')
})

// Intersection Observer 설정
const sections = document.querySelectorAll('section');
const menuItems = document.querySelectorAll('.header__menu__item');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const menuItem = document.querySelector(`.header__menu__item[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        menuItems.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');
      }
    });
  },
  {
    threshold: 0.5 // 50% 이상 보일 때
  }
);

sections.forEach((section) => observer.observe(section));

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

let isScrolling = false;
let timeoutId = null;




window.addEventListener('scroll', () => {
  if (isScrolling) return;  

  const scrollPosition = window.scrollY;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop - sectionHeight / 2 && scrollPosition < sectionTop + sectionHeight) {
      
      if (timeoutId) {
        clearTimeout(timeoutId); 
      }
      timeoutId = setTimeout(() => {
        isScrolling = true; 
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        isScrolling = false; 
      }, 300);

      menuItems[index].classList.add('active');
    } else {
      menuItems[index].classList.remove('active');
    }
  });
});
