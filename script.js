const container = document.querySelector('.container');
const movingStickers = document.querySelectorAll('.moving');
const bgm = document.getElementById('bgm');

// 🔥 클릭하면 음악 재생 (오직 한 번만 등록!)
window.addEventListener('click', () => {
  bgm.play().catch(() => {});
});


movingStickers.forEach(st => {
    const w = st.clientWidth;
    const h = st.clientHeight;

    let x = Math.random() * (container.clientWidth - w);
    let y = Math.random() * (container.clientHeight - h);

    // 아주 느린 이동 속도
    let vx = (Math.random() * 0.3 + 0.1) * (Math.random() < 0.5 ? -1 : 1);
    let vy = (Math.random() * 0.3 + 0.1) * (Math.random() < 0.5 ? -1 : 1);

    st.style.left = `${x}px`;
    st.style.top = `${y}px`;

    // ✔ 클릭 시: 스티커 사라짐 + 음악 줄어듦 + 하얀 박스 생성
    st.addEventListener('click', () => {
        st.classList.add('hidden');

        // 🔉 음악 볼륨 점점 줄어듦
        let v = bgm.volume;
        const fade = setInterval(() => {
            v -= 0.008;
            if (v <= 0) {
                v = 0;
                clearInterval(fade);
            }
            bgm.volume = v;
        }, 70);

        // 🔳 하얀 박스 생성
        const count = Math.floor(Math.random() * 2) + 5;
        for (let i = 0; i < count; i++) {
            createGlitchBox();
        }
    });

    // 스티커 떠다니기
    function animate() {
        if (st.classList.contains('hidden')) return;

        x += vx;
        y += vy;

        if (x <= 0 || x >= container.clientWidth - w) vx *= -1;
        if (y <= 0 || y >= container.clientHeight - h) vy *= -1;

        st.style.left = `${x}px`;
        st.style.top = `${y}px`;

        requestAnimationFrame(animate);
    }

    animate();
});


// ⭐ 하얀 정사각형 박스 생성 (크기 랜덤)
function createGlitchBox() {
    const box = document.createElement('div');
    box.classList.add('glitch-box');

    const size = Math.random() * 20 + 100;
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;

    const cx = Math.random() * (container.clientWidth - size);
    const cy = Math.random() * (container.clientHeight - size);

    box.style.left = `${cx}px`;
    box.style.top = `${cy}px`;

    container.appendChild(box);
}
