document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.editor-tab');
    const contents = document.querySelectorAll('.editor-content');
    const output = document.querySelector("#output");
    const htmlTextarea = document.querySelector("#htmlCode");
    const cssTextarea = document.querySelector("#cssCode");
    const jsTextarea = document.querySelector("#jsCode");

    function updateOutput() {
        const htmlCode = htmlTextarea.value;
        const cssCode = `<style>body { color: #f0f0f0; } ${cssTextarea.value}</style>`;
        const jsCode = `<script>${jsTextarea.value}<\/script>`;
        const fullCode = htmlCode + cssCode + jsCode;
        output.contentDocument.body.innerHTML = fullCode;
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            contents[index].classList.add('active');
        });
    });

    document.querySelectorAll(".editor-content textarea").forEach((textarea) => {
        textarea.addEventListener("keyup", updateOutput);
    });

    const divider = document.getElementById("divider");
    let isDragging = false;

    divider.addEventListener("mousedown", function(e) {
        isDragging = true;
    });

    document.addEventListener("mousemove", function(e) {
        if (!isDragging) return;
        const container = document.querySelector(".container");
        const editorContainer = document.querySelector(".editor-container");
        const outputContainer = document.querySelector(".output-container");
        const containerWidth = container.offsetWidth;
        const editorWidth = e.clientX;
        const outputWidth = containerWidth - editorWidth - divider.offsetWidth;

        if (editorWidth < 20 || outputWidth < 20) return; // Minimum width condition

        editorContainer.style.width = `${editorWidth}px`;
        outputContainer.style.width = `${outputWidth}px`;
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });
});
