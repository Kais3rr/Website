document.addEventListener('DOMContentLoaded', () => {
    const Cursor = document.querySelector('.CustomCursor');
    let CursorX = 0,
        CursorY = 0;
    let TargetX = 0,
        TargetY = 0;
    const Easing = 0.15;

    document.addEventListener('mousemove', (e) => {
        TargetX = e.clientX + window.scrollX;
        TargetY = e.clientY + window.scrollY;
    });

    function AnimateCursor() {
        CursorX += (TargetX - CursorX) * Easing;
        CursorY += (TargetY - CursorY) * Easing;

        Cursor.style.left = `${CursorX}px`;
        Cursor.style.top = `${CursorY}px`;
        requestAnimationFrame(AnimateCursor);
    }

    AnimateCursor();

    document.oncontextmenu = document.body.oncontextmenu = function() {
        return false;
    }

}
