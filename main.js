document.addEventListener('DOMContentLoaded', () => {
    // --- Interview Data ---
    const interviewData = {
        '01': {
            num: 'Interview 01',
            tag: '入社1年目',
            title: '未経験でも、現場でちゃんと成長できる',
            text: `入社前は「自分にできるのか」と不安もありましたが、先輩がしっかりフォローしてくれる環境で、安心して成長できました。<br><br>現場ごとに違う課題があるので、毎日が同じではなく、やりがいを感じています。完成した建物を見たときの達成感は、この仕事ならではだと思います。`
        },
        '02': {
            num: 'Interview 02',
            tag: '入社3年目',
            title: '任されるからこそ、面白い仕事になる',
            text: `入社して数年経ち、少しずつ現場を任せてもらえるようになりました。最初は不安もありましたが、自分で工程を考え、現場を動かしていく経験は大きなやりがいにつながっています。<br><br>もちろんトラブルが起きることもありますが、チームで相談しながら解決していく中で、自分の判断力も鍛えられていると感じます。“言われたことをやる”だけではなく、自分で考えて進められる点が、この仕事の面白さだと思います。`
        },
        '03': {
            num: 'Interview 03',
            tag: '入社8年目',
            title: '人と現場を動かす、その手応えがある仕事',
            text: `この仕事は、建物をつくるだけでなく、人と人をつなぎながら現場をまとめていく仕事です。職人さんや協力会社との信頼関係が、そのまま現場の質につながるため、コミュニケーションの大切さを日々感じています。<br><br>若手の頃は目の前の業務で精一杯でしたが、今は現場全体を見ながら、どうすればより良い施工になるかを考えるようになりました。一つの現場が無事に終わったときの達成感は、何年経っても変わらない魅力です。`
        }
    };

    // --- Modal Logic ---
    const modal = document.getElementById('interviewModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = modal ? modal.querySelector('.modal__close') : null;
    const modalOverlay = modal ? modal.querySelector('.modal__overlay') : null;
    const memberCards = document.querySelectorAll('.member__card');

    const openModal = (id) => {
        const data = interviewData[id];
        if (!data) return;

        modalBody.innerHTML = `
            <div class="modal__interview-header">
                <span class="modal__interview-num">${data.num}</span>
                <span class="tag">${data.tag}</span>
                <h2 class="modal__interview-title">${data.title}</h2>
            </div>
            <div class="modal__interview-text">
                <p>${data.text}</p>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    memberCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-interview');
            openModal(id);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });


    // --- Intersection Observer (Reveal Animation) ---
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));


    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq__trigger');
        const body = item.querySelector('.faq__body');
        
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__body').style.maxHeight = null;
                }
            });
            
            item.classList.toggle('active');
            if (!isActive) {
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.main-header');
                const offset = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Hamburger Menu Logic ---
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const globalNav = document.querySelector('.global-nav');
    const navLinks = document.querySelectorAll('.global-nav__list a, .global-nav__sp-btns a');

    const toggleMenu = () => {
        const isActive = globalNav.classList.contains('is-active');
        hamburgerBtn.classList.toggle('is-active');
        globalNav.classList.toggle('is-active');
        
        if (!isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        hamburgerBtn.classList.remove('is-active');
        globalNav.classList.remove('is-active');
        document.body.style.overflow = '';
    };

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Hero Visual Parallax ---
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero__img');
    
    if (hero && heroImg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            if (scrollPos < window.innerHeight) {
                heroImg.style.transform = `scale(1.1) translateY(${scrollPos * 0.15}px)`;
            }
        });
    }

    // --- Header Scroll Logic ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        });
    }
});
