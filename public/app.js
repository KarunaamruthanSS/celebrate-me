(function () {
    var CT = window.CelebrateTemplates;
    var UI_THEMES = window.CELEBRATE_UI_THEMES;

    var bgA = document.getElementById('bg-a');
    var bgB = document.getElementById('bg-b');
    var activeLayer = bgA;

    function applyTheme(type) {
        var theme = UI_THEMES[type];
        if (!theme) return;

        var root = document.documentElement.style;
        root.setProperty('--accent', theme.accent);
        root.setProperty('--accent2', theme.accent2);
        root.setProperty('--glow', theme.glow);

        var nextLayer = activeLayer === bgA ? bgB : bgA;
        nextLayer.style.background = theme.bg;
        nextLayer.classList.add('active');
        activeLayer.classList.remove('active');
        activeLayer = nextLayer;
    }

    document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            document.querySelectorAll('.celebration-form').forEach(function (f) { f.classList.remove('active'); });
            document.getElementById(btn.dataset.tab + '-form').classList.add('active');
            applyTheme(btn.dataset.tab);
        });
    });

    function downloadHTML(content, filename) {
        var blob = new Blob([content], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function showShareResult(form, url, message) {
        var result = form.querySelector('.share-result');
        var input = result.querySelector('input');
        var status = result.querySelector('.status');
        result.classList.add('visible');
        input.value = url || '';
        status.textContent = message || '';
    }

    document.querySelectorAll('.celebration-form').forEach(function (form) {
        var type = form.dataset.type;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = Object.fromEntries(new FormData(form));
            downloadHTML(CT.templates[type](data), CT.filenames[type]);
        });

        var shareBtn = form.querySelector('.share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', function () {
                var data = Object.fromEntries(new FormData(form));
                shareBtn.disabled = true;
                var originalText = shareBtn.textContent;
                shareBtn.textContent = 'Creating link...';

                fetch('/api/pages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: type, data: data })
                })
                    .then(function (res) {
                        return res.json().then(function (body) { return { ok: res.ok, body: body }; });
                    })
                    .then(function (result) {
                        if (!result.ok) {
                            showShareResult(form, '', result.body.error || 'Could not create link.');
                            return;
                        }
                        var url = window.location.origin + result.body.url;
                        showShareResult(form, url, 'Link created — copy and send it!');
                    })
                    .catch(function () {
                        showShareResult(form, '', 'Network error — please try again.');
                    })
                    .finally(function () {
                        shareBtn.disabled = false;
                        shareBtn.textContent = originalText;
                    });
            });
        }

        var copyBtn = form.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                var input = form.querySelector('.share-result input');
                var status = form.querySelector('.share-result .status');
                if (!input.value) return;
                navigator.clipboard.writeText(input.value)
                    .then(function () { status.textContent = 'Copied to clipboard!'; })
                    .catch(function () {
                        input.select();
                        status.textContent = 'Press Ctrl+C to copy.';
                    });
            });
        }
    });

    applyTheme('birthday');
})();
