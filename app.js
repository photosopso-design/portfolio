const data=window.PORTFOLIO_DATA;
const params=new URLSearchParams(location.search);
const page=params.get('page')||'home';
const app=document.getElementById('app');
const categoryKeys=Object.keys(data.categories);
const categories=data.categories;
const homeNames=[
 ['documentaire','Réalisation documentaire'],['production','Production audiovisuelle'],
 ['photographie','Photographie'],['publicite','Publicité'],['drone','Drone'],['fpv','FPV']
];
function footerPage(){return;}
function setActive(){document.querySelectorAll('#nav a').forEach(a=>{if(a.href.includes('page='+page))a.classList.add('active')})}
function renderHome(){
 app.innerHTML=`<section class="hero"><p class="eyebrow">PORTFOLIO · IMAGE & MOUVEMENT</p><h1>Sofiane<br><span>Bouchentouf</span></h1><p class="intro">Image · Réalisation · Photographie · Drone & FPV</p><a class="discover" href="?page=documentaire">DÉCOUVRIR LE PORTFOLIO <span>↘</span></a></section><section class="home-categories">${homeNames.map(([k,n],i)=>`<a class="category-tile" href="?page=${k}"><small>0${i+1} / PORTFOLIO</small><strong>${n}</strong></a>`).join('')}<a class="category-tile" href="?page=apropos"><small>À PROPOS</small><strong>Qui suis-je ?</strong></a><a class="category-tile" href="?page=cv"><small>CURRICULUM VITAE</small><strong>CV ↗</strong></a></section>`;
}
function renderCategory(key){
 const cat=categories[key]; if(!cat){renderHome();return;}
 app.innerHTML=`<section class="page-head"><p class="section-kicker">PORTFOLIO / ${cat.label}</p><h1>${cat.label}</h1></section><section class="project-grid">${cat.cards.map((c,i)=>`<article class="project" data-image="${c.image}"><img src="${c.image}" alt="${c.title}" loading="${i>3?'lazy':'eager'}"><div class="project-meta"><span>${c.title}</span><span>${c.year}</span></div></article>`).join('')}</section>`;
 document.querySelectorAll('.project').forEach(el=>el.addEventListener('click',()=>openLightbox(el.dataset.image,el.querySelector('img').alt)));
}
function renderAbout(){
 const paras=data.about.split(/(?<=[.!?])\s+(?=[A-ZÀÂÇÉÈÊËÎÏÔÛÙÜ])/);
 app.innerHTML=`<section class="page-head"><p class="section-kicker">PORTFOLIO / PRÉSENTATION</p><h1>À propos</h1></section><section class="about">${paras.map(p=>`<p>${p}</p>`).join('')}</section>`;
}
function renderCV(){
 app.innerHTML=`<section class="page-head"><p class="section-kicker">PORTFOLIO / CURRICULUM VITAE</p><h1>CV</h1></section><section class="cv-area">${data.cvPreview?`<img src="${data.cvPreview}" alt="Aperçu du CV">`:''}<p class="notice">Le fichier PDF du CV n'était pas présent dans les archives transmises. Il pourra être ajouté ici pour permettre son ouverture et son téléchargement.</p></section>`;
}
function openLightbox(src,alt){const lb=document.getElementById('lightbox');lb.querySelector('img').src=src;lb.querySelector('img').alt=alt||'';lb.classList.add('open');lb.setAttribute('aria-hidden','false')}
document.querySelector('#lightbox .close').addEventListener('click',()=>{const lb=document.getElementById('lightbox');lb.classList.remove('open');lb.setAttribute('aria-hidden','true')});
document.getElementById('lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')e.currentTarget.classList.remove('open')});
document.querySelector('.menu-toggle').addEventListener('click',()=>{const n=document.getElementById('nav');n.classList.toggle('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded',n.classList.contains('open'))});
if(page==='home')renderHome();else if(page==='apropos')renderAbout();else if(page==='cv')renderCV();else renderCategory(page);
setActive();
