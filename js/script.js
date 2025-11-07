// 移动端菜单切换
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // 关闭移动菜单
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// 表单提交处理
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 验证表单
        if (!name || !phone || !message) {
            alert('请填写所有必填项！');
            return;
        }
        
        // 验证手机号
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('请输入有效的手机号码！');
            return;
        }
        
        // 验证邮箱（如果填写了）
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址！');
                return;
            }
        }
        
        // 模拟提交成功
        alert('感谢您的咨询！我们将尽快与您联系。');
        contactForm.reset();
        
        // 实际项目中，这里应该发送数据到服务器
        // 例如：
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, email, message })
        })
        .then(response => response.json())
        .then(data => {
            alert('感谢您的咨询！我们将尽快与您联系。');
            contactForm.reset();
        })
        .catch(error => {
            alert('提交失败，请稍后重试。');
        });
        */
    });
}

// 滚动动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.feature-card, .spec-category, .stat-item, .info-item'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// 数字滚动效果（统计数据）
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (element.textContent.includes('+')) {
            element.textContent = value + '万+';
        } else if (element.textContent.includes('%')) {
            element.textContent = value + '%+';
        } else {
            element.textContent = value + '×24';
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// 监听统计数据区域
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            
            if (statItems.length >= 3) {
                animateValue(statItems[0], 0, 50, 2000);
                animateValue(statItems[1], 0, 99, 2000);
                // 第三个保持原样显示7×24
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// 移动端菜单样式增强
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 968px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            gap: 0;
        }
        
        .nav-menu.active li {
            padding: 1rem 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .nav-menu.active li:last-child {
            border-bottom: none;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(7px, 7px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(style);

console.log('UJS 网站已加载完成');

