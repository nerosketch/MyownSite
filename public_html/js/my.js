// Button gradient effect
document.querySelector('.btn_grad').onmousemove = function (e) {
    let x = e.pageX - e.target.offsetLeft;
    let y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', x + 'px');
    e.target.style.setProperty('--y', y + 'px');
};


// Line
let c = document.getElementById('canv');
if(c) {
    let $ = c.getContext('2d');
    let w = c.width = document.body.clientWidth;
    let h = c.height = 541;
    let draw = function (a, b, t) {
        $.lineWidth = 0.8;
        $.fillStyle = 'hsl(0, 0%, 0%)';
        $.fillRect(0, 0, w, h);
        for (let i = -60; i < 60; i += 1) {
            $.strokeStyle = 'hsla(0, 0%, 46%, 0.03)';
            $.beginPath();
            $.moveTo(0, h / 2);
            for (let j = 0; j < w; j += 10) {
                $.lineTo(10 * Math.sin(i / 10) + j + 0.008 * j * j, Math.floor(
                    h / 2 + j / 2 * Math.sin(j / 50 - t / 50 - i / 118) +
                    (i * 0.9) * Math.sin(j / 25 - (i + t) / 65)));
            }
            $.stroke();
        }
    };
    let t = 0;
    window.addEventListener('resize', function () {
        c.width = w = document.body.clientWidth;
        c.height = h = 541;
        $.fillStyle = 'hsl(0, 0%, 0%)';
    }, false);
    let run = function () {
        window.requestAnimationFrame(run);
        t += 5;
        draw(33, 52 * Math.sin(t / 2400), t);
    };
    run();
}
// End Line
