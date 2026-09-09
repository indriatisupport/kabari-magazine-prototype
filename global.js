function setLang(lang) {
    localStorage.setItem('kabariLang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active-lang'));
    const activeBtn = document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`);
    if (activeBtn) activeBtn.classList.add('active-lang');
    
    document.querySelectorAll('[data-en]').forEach(el => {
        if (lang === 'id' && el.getAttribute('data-id')) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-id');
            } else {
                el.innerText = el.getAttribute('data-id');
            }
        } else {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-en');
            } else {
                el.innerText = el.getAttribute('data-en');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('kabariLang') || 'en';
    setLang(savedLang);
});