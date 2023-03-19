const SITE_URL = window.location.origin + window.location.pathname

// texto rotativo
const rotatingText = document.querySelector('.rotating-text')
const textArray = rotatingText.querySelectorAll('.text')
let index = 0

function rotateText() {
  textArray[index].style.opacity = '0'
  textArray[index].classList.remove('active')
  index = (index + 1) % textArray.length
  textArray[index].style.opacity = '1'
  textArray[index].classList.add('active')
}

setInterval(rotateText, 5000)

const getGallery = document.querySelector('.gallery')
const imgActive = getGallery.querySelector('.active')

getGallery.addEventListener('mouseenter', () => imgActive.classList.remove('active'))
getGallery.addEventListener('mouseleave', () => imgActive.classList.add('active'))

// navbar active

// toggler 
const toggler = document.querySelector('.toggler')
const bars = document.querySelectorAll('.bar')
const menu = document.querySelector('.menu-nav')

toggler.addEventListener('click', function() {
  menu.classList.toggle('active')
  bars.forEach(function(bar) {
    bar.classList.toggle('active')
  })
})

const nav = document.querySelector('.nav-content')
const navLinks = nav.querySelectorAll('.nav-hover')
const sections = document.querySelectorAll('section[id]')

// deixa o nav item ativo quando a seção estiver visível
const scrollActive = () => {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 58
    const sectionId = current.getAttribute('id')
    const parentElement = document.querySelector(`.nav-content a[href*=${sectionId}]`).parentElement

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(a => {
        a.classList.remove('active')
      });
      parentElement.classList.add('active')
    } else {
      parentElement.classList.remove('active')
    }
  })

  document.querySelector('nav').classList.toggle('active', window.scrollY >= 43)
}

window.addEventListener('scroll', scrollActive)


// close menu onclick
const links = document.querySelectorAll('.nav-hover')

links.forEach(link => {
  link.addEventListener('click', function() {
    if(menu.classList.contains('active')) {
      menu.classList.remove('active')
      bars.forEach(function(bar) {
        bar.classList.remove('active')
      })
    }
  })
})
  


// accordion
const accordionHeaders = document.querySelectorAll('.accordion-header')

function toggleAccordion() {
  const accordionContent = this.nextElementSibling;
  if (accordionContent.style.display === 'block') {
    accordionContent.style.display = 'none'
  } else {
    accordionHeaders.forEach(header => {
      header.nextElementSibling.style.display = 'none'
    });
    accordionContent.style.display = 'block'
  }
}

accordionHeaders.forEach(header => {
  header.addEventListener('click', toggleAccordion)
})


// modal e carousel

const modal = document.getElementById("modal")
const modalImg = document.querySelector(".modal-content")
const closeBtn = document.querySelector(".close")
// const carouselSlide = document.querySelector('.carousel-slide');
// const carouselImages = document.querySelectorAll(".carousel-slide img")
const galeriaImagens = document.querySelectorAll(".galeria-item img")

let counter = 0;

// const size = galeriaImagens[0].clientWidth;

function showModal() {
  modal.classList.add("show")
}

function hideModal() {
  modal.classList.remove("show")
}

galeriaImagens.forEach(function(img, index) {
  img.addEventListener("click", function() {
    modalImg.src = this.src
    counter = index
    showModal()
  })
})

closeBtn.onclick = hideModal

function mostrarArrow() {
  document.querySelector('.modal-prev').style.display = 'block'
  document.querySelector('.modal-next').style.display = 'block'
}

function modalImgSrc(index) {
  modalImg.src = galeriaImagens[index].src
}


document.querySelector('.modal-next').addEventListener('click', () => {
  if (counter >= galeriaImagens.length - 1) {
    // document.querySelector('.modal-next').style.display = 'none'
    counter = 0
    return
  }
  mostrarArrow()
  counter++
  modalImgSrc(counter)
  // carouselSlide.style.transition = "transform 0.4s ease-in-out"
  // carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
});

document.querySelector('.modal-prev').addEventListener('click', () => {
  if (counter <= 0) {
    // document.querySelector('.modal-prev').style.display = 'none'
    counter = galeriaImagens.length - 1
    return
  }
  mostrarArrow()
  counter--
  modalImgSrc(counter)
  // carouselSlide.style.transition = "transform 0.4s ease-in-out"
  // carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
})

// arrastar o carousel

// compartilhar no whatsapp

const shareBtn = document.querySelectorAll('.item-hover')

shareBtn.forEach(function(galeriaItem, index) { 
  galeriaItem.addEventListener("click", function() {
    compartilharWhatsApp(`?galeria=${index}`, 
    `Olha essa imagem linda que eu encontrei no site da @casaancora_aamar`)
  })
})

function compartilharWhatsApp(params_img_url, texto) {
  const imageUrl = `${SITE_URL}${params_img_url}`
  const textoEncoded = encodeURIComponent(texto);
  const whatsappUrl = `whatsapp://send?text=${textoEncoded} ${imageUrl}&image=${imageUrl}`;
  window.location.href = whatsappUrl
}

const queryString = window.location.search

// abrir modal da galeria de acordo com a query contendo um id da img
if(temNumero(queryString)) {
  const img_id = queryString.match(/\d+/)[0]
  modalImgSrc(img_id)
  showModal()
}

// verifica se tem numero na string
function temNumero(string) {
  return /\d+/.test(string);
}


// show and hide elementos

function showEl(elQuery, display = 'block') {
  document.querySelector(elQuery).style.display = display
}

function hideEl(elQuery) {
  document.querySelector(elQuery).style.display = 'none'
}

