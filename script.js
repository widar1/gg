const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    const drawer = card.querySelector('.drawer');

    // Random initial position
    card.style.left = Math.random() * (window.innerWidth  - 200) + 'px';
    card.style.top  = Math.random() * (window.innerHeight - 200) + 'px';

    let dragging = false;
    let hasMoved = false;
    let offsetX, offsetY;

    card.addEventListener('mousedown', (e) => {
        dragging = true;
        hasMoved = false;
        offsetX = e.clientX - card.offsetLeft;
        offsetY = e.clientY - card.offsetTop;

        // Bring clicked card to front
        cards.forEach(c => c.style.zIndex = 1);
        card.style.zIndex = 10;

        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        hasMoved = true;
        card.style.left = (e.clientX - offsetX) + 'px';
        card.style.top  = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (dragging && !hasMoved) {
            card.classList.toggle('expanded');
            if (drawer) drawer.classList.toggle('open');
        }
        dragging = false;
    });
});
