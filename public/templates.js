/**
 * Shared celebration-page templates.
 * Loaded as a plain <script> in the browser (attaches to window.CelebrateTemplates)
 * and required directly by the Node server (module.exports) — one source of truth
 * for both the client-side "download" flow and the server-side "shareable link" flow.
 *
 * Design language: an elegant centered greeting card (white, colored border,
 * cursive script title, "pop" entrance) staged inside a soft gradient scene
 * with symmetric floating ornaments and twinkling sparkles. Every celebration
 * type shares this same composition but gets its own palette, ornament icons
 * and centerpiece — Birthday matches the reference (balloons + cake) closely
 * since it's the exact design the reference specified.
 */
(function (root, factory) {
    var mod = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = mod;
    } else {
        root.CelebrateTemplates = mod;
    }
})(typeof self !== 'undefined' ? self : this, function () {
    function esc(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    var FONT_LINK = '<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@700;900&display=swap" rel="stylesheet"/>';

    // ---- Theme palettes -------------------------------------------------------
    var THEMES = {
        birthday: { bg: 'linear-gradient(160deg,#f5e6c8 0%,#e8d5a3 40%,#d4b97a 100%)', border: '#c9a84c', title: '#c9a84c', a: '#ffe066,#c9a84c 60%,#8a6a1a', b: '#6ab0f5,#1565c0 60%,#0d3a7a', sparkle: '#ffd700' },
        anniversary: { bg: 'linear-gradient(160deg,#fff3e0 0%,#ffe0b2 45%,#e6c288 100%)', border: '#b8860b', title: '#b8860b', a: '#f0c05a,#c9962b 60%,#8a651a', b: '#f7d9a0,#d4a84b 60%,#8a651a', sparkle: '#e8b94b' },
        valentine: { bg: 'linear-gradient(160deg,#ffe9ec 0%,#ffc9d4 45%,#ff9fb0 100%)', border: '#e0355c', title: '#e0355c', a: '#ff8fa3,#e0355c 60%,#8a1030', b: '#ffc1cc,#ff5f7a 60%,#a1123a', sparkle: '#ff5f7a' },
        christmas: { bg: 'linear-gradient(160deg,#fdf6e3 0%,#e3f3e6 45%,#cdeacd 100%)', border: '#b3261e', title: '#2e7d32', a: '#ff6b6b,#c8102e 60%,#7a0a1c', b: '#66bb6a,#2e7d32 60%,#164a19', sparkle: '#ffd700' },
        newyear: { bg: 'linear-gradient(160deg,#fdf6ff 0%,#eddcff 45%,#d9baff 100%)', border: '#8e44ad', title: '#8e44ad', a: '#e0b3ff,#9b59b6 60%,#5b2a70', b: '#ffe08a,#c9962b 60%,#8a651a', sparkle: '#c9962b' },
        studentday: { bg: 'linear-gradient(160deg,#eaf6ff 0%,#d7f0ea 45%,#c3e6f5 100%)', border: '#0e7d7d', title: '#0e7d7d', a: '#5ad1c9,#0e9e9e 60%,#075858', b: '#7fb3ff,#2f80ed 60%,#173f7a', sparkle: '#0e9e9e' },
        independenceday: { bg: 'linear-gradient(160deg,#fff3e0 0%,#ffffff 45%,#d9f2dc 100%)', border: '#ff7a00', title: '#1e3a8a', a: '#ffb066,#ff7a00 60%,#a34e00', b: '#7fd39a,#1e8e3e 60%,#0f4a20', sparkle: '#ff7a00' },
        labourday: { bg: 'linear-gradient(160deg,#fff3e0 0%,#ffe0b2 45%,#ffcc80 100%)', border: '#b0560a', title: '#b0560a', a: '#ffb066,#d9720a 60%,#7a3d05', b: '#c9a06a,#8a5a2a 60%,#4a2f14', sparkle: '#d9720a' },
        engineerday: { bg: 'linear-gradient(160deg,#eaf4ff 0%,#dbeeff 45%,#c3ddfa 100%)', border: '#1d6fe0', title: '#1d6fe0', a: '#7fb3ff,#1d6fe0 60%,#0e3a7a', b: '#a9c4e0,#4b6b8f 60%,#233850', sparkle: '#1d6fe0' }
    };

    // ---- Shared card + scene CSS -----------------------------------------------
    function baseCSS(t) {
        return '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}' +
            'body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:' + t.bg + ';font-family:"Montserrat",sans-serif;overflow:hidden;padding:20px}' +
            '.scene{position:relative;width:520px;max-width:96vw;height:660px;max-height:96vh;display:flex;align-items:center;justify-content:center}' +
            '.card{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:280px;max-width:80vw;min-height:380px;background:#fff;border:4px solid ' + t.border + ';border-radius:6px;box-shadow:0 8px 40px rgba(0,0,0,0.18),inset 0 0 0 8px rgba(255,255,255,0.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:28px 24px 20px;z-index:10;animation:cardPop .8s cubic-bezier(.34,1.56,.64,1) both}' +
            '@keyframes cardPop{from{transform:translate(-50%,-50%) scale(.7);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}' +
            '.card-eyebrow{font-family:"Montserrat",sans-serif;font-weight:900;font-size:26px;letter-spacing:4px;color:#1a1a1a;animation:fadeUp .6s .4s both}' +
            '.card-title{font-family:"Great Vibes",cursive;font-size:58px;color:' + t.title + ';line-height:1;animation:fadeUp .6s .55s both;text-shadow:2px 2px 0 rgba(0,0,0,0.12)}' +
            '.card-name{font-family:"Montserrat",sans-serif;font-weight:900;font-size:22px;letter-spacing:2px;color:#1a1a1a;text-align:center;overflow-wrap:break-word;animation:fadeUp .6s .7s both}' +
            '.card-extra{font-family:"Montserrat",sans-serif;font-weight:700;font-size:13px;letter-spacing:1px;color:#666;margin-top:2px;animation:fadeUp .6s .75s both}' +
            '.card-divider{width:60px;height:2px;background:linear-gradient(90deg,transparent,' + t.border + ',transparent);margin:10px 0 8px;animation:fadeUp .6s .8s both}' +
            '.card-quote{font-size:12px;color:#666;text-align:center;line-height:1.6;font-style:italic;padding:0 6px;overflow-wrap:break-word;animation:fadeUp .6s .9s both}' +
            '.card-from{font-size:11.5px;color:#8a8a8a;font-style:italic;margin-top:10px;overflow-wrap:break-word;animation:fadeUp .6s 1s both}' +
            '@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}' +
            '.orn{position:absolute;width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;z-index:5;box-shadow:0 6px 14px rgba(0,0,0,0.12)}' +
            '.orn-a{background:radial-gradient(circle at 35% 30%,' + t.a + ')}' +
            '.orn-b{background:radial-gradient(circle at 35% 30%,' + t.b + ')}' +
            '.o1{width:80px;height:80px;left:8px;top:38px;animation:sway1 3.2s ease-in-out infinite 0s,ornIn .7s .1s both}' +
            '.o2{width:72px;height:72px;left:50px;top:18px;animation:sway2 3.5s ease-in-out infinite .2s,ornIn .7s .2s both}' +
            '.o3{width:76px;height:76px;left:4px;top:130px;animation:sway1 3.8s ease-in-out infinite .4s,ornIn .7s .3s both}' +
            '.o4{width:68px;height:68px;left:58px;top:110px;animation:sway2 3.1s ease-in-out infinite .1s,ornIn .7s .4s both}' +
            '.o5{width:66px;height:66px;left:20px;top:220px;animation:sway1 3.6s ease-in-out infinite .3s,ornIn .7s .5s both}' +
            '.o6{width:72px;height:72px;left:66px;top:200px;animation:sway2 3.3s ease-in-out infinite .5s,ornIn .7s .6s both}' +
            '.o7{width:80px;height:80px;right:8px;top:38px;animation:sway2 3.4s ease-in-out infinite .2s,ornIn .7s .1s both}' +
            '.o8{width:72px;height:72px;right:50px;top:18px;animation:sway1 3.7s ease-in-out infinite .4s,ornIn .7s .2s both}' +
            '.o9{width:76px;height:76px;right:4px;top:130px;animation:sway2 3.2s ease-in-out infinite 0s,ornIn .7s .3s both}' +
            '.o10{width:68px;height:68px;right:58px;top:110px;animation:sway1 3.9s ease-in-out infinite .3s,ornIn .7s .4s both}' +
            '.o11{width:66px;height:66px;right:20px;top:220px;animation:sway2 3.5s ease-in-out infinite .1s,ornIn .7s .5s both}' +
            '.o12{width:72px;height:72px;right:66px;top:200px;animation:sway1 3.1s ease-in-out infinite .5s,ornIn .7s .6s both}' +
            '@keyframes sway1{0%,100%{transform:rotate(-4deg) translateY(0)}50%{transform:rotate(4deg) translateY(-6px)}}' +
            '@keyframes sway2{0%,100%{transform:rotate(4deg) translateY(0)}50%{transform:rotate(-4deg) translateY(-8px)}}' +
            '@keyframes ornIn{from{opacity:0;transform:scale(.3) translateY(60px)}to{opacity:1;transform:scale(1) translateY(0)}}' +
            '.sparkle{position:absolute;width:6px;height:6px;border-radius:50%;background:' + t.sparkle + ';z-index:20;animation:sparkleAnim 2s ease-in-out infinite}' +
            '.sparkle::before{content:"✦";position:absolute;font-size:14px;color:' + t.sparkle + ';top:-4px;left:-4px}' +
            '.sp1{top:50px;left:135px;animation-delay:0s}.sp2{top:80px;right:130px;animation-delay:.5s}.sp3{top:160px;left:148px;animation-delay:1s}.sp4{top:200px;right:142px;animation-delay:1.5s}.sp5{top:320px;left:140px;animation-delay:.8s}' +
            '@keyframes sparkleAnim{0%,100%{opacity:0;transform:scale(.5) rotate(0deg)}50%{opacity:1;transform:scale(1.2) rotate(180deg)}}' +
            '.pedestal-wrap{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);animation:fadeUp .7s 1.05s both;z-index:15;text-align:center}' +
            '.pedestal-plate{width:100px;height:12px;background:linear-gradient(135deg,' + t.border + ',#00000022);border-radius:50%;margin:0 auto;box-shadow:0 3px 8px rgba(0,0,0,0.18)}' +
            '.pedestal-body{width:88px;height:46px;background:linear-gradient(180deg,' + t.border + ' 0%,#00000030 100%);border-radius:6px 6px 4px 4px;margin:0 auto;position:relative;box-shadow:0 4px 12px rgba(0,0,0,0.2)}' +
            '.pedestal-topper{position:absolute;top:-30px;left:50%;transform:translateX(-50%);font-size:30px}' +
            '.share-badge{position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);font-size:11px;color:rgba(0,0,0,0.35);white-space:nowrap}' +
            '@media(max-width:400px){.card{padding:22px 16px 16px}.card-title{font-size:44px}.card-eyebrow{font-size:20px}}';
    }

    function ornaments() {
        var slots = [
            [1, 'a', '🎈'], [2, 'b', '🎈'], [3, 'b', '🎈'], [4, 'a', '🎈'], [5, 'a', '🎈'], [6, 'b', '🎈'],
            [7, 'b', '🎈'], [8, 'a', '🎈'], [9, 'a', '🎈'], [10, 'b', '🎈'], [11, 'b', '🎈'], [12, 'a', '🎈']
        ];
        return slots;
    }

    function ornamentsHTML(iconA, iconB) {
        var out = '';
        var pattern = ['a', 'b', 'b', 'a', 'a', 'b', 'b', 'a', 'a', 'b', 'b', 'a'];
        for (var i = 0; i < 12; i++) {
            var cls = pattern[i];
            var icon = cls === 'a' ? iconA : iconB;
            out += '<div class="orn orn-' + cls + ' o' + (i + 1) + '">' + icon + '</div>';
        }
        return out;
    }

    function sparklesHTML() {
        return '<div class="sparkle sp1"></div><div class="sparkle sp2"></div><div class="sparkle sp3"></div><div class="sparkle sp4"></div><div class="sparkle sp5"></div>';
    }

    function pedestal(topperIcon) {
        return '<div class="pedestal-wrap"><div class="pedestal-body"><span class="pedestal-topper">' + topperIcon + '</span></div><div class="pedestal-plate"></div></div>';
    }

    function shareBadge(shareUrl) {
        return shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '';
    }

    function page(title, extraCss, bodyInner, script) {
        return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>' + title + '</title>' + FONT_LINK +
            '<style>' + extraCss + '</style></head><body><div class="scene">' + bodyInner + '</div>' + (script ? '<script>' + script + '<\/script>' : '') + '</body></html>';
    }

    var BIRTHDAY_FONT_LINK = '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>';

    // Fixed preloaded messages baked into each celebration type's card — not user-editable.
    var PRELOADED_MESSAGES = {
        birthday: "Another year, another reason to celebrate you. May this birthday be full of laughter, good food, and everything that makes you smile. Here's to the year ahead!",
        anniversary: "Choosing each other, year after year, and it still shows. Wishing you both a day as warm and joyful as the life you've built together. Here's to many more.",
        christmas: 'Wishing you a Christmas filled with warm gatherings, twinkling lights, and quiet moments of joy. May the new year that follows be just as kind to you.',
        labourday: 'A day to honor the effort behind every achievement — the early mornings, the steady hands, the quiet persistence. Thank you for the work you do. Rest well today.',
        independenceday: "A day to remember what was won, and to carry that spirit forward with pride. Wishing you a day full of gratitude, freedom, and hope for what's ahead.",
        engineerday: "For every problem you've solved, every late deadline you've beaten, and every idea you've built into something real — today's for you. Keep engineering the future.",
        studentday: 'To curiosity, late-night study sessions, and every question you dared to ask. Keep learning, keep questioning — the best lessons are still ahead of you.'
    };

    var templates = {
        // Floating-particle scene with a single gradient "card" panel — a deliberately
        // different composition from the other celebration types' scene+card layout.
        birthday: function (d, opts) {
            opts = opts || {};
            var title = 'Happy Birthday — ' + esc(d.name);
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(160deg,#FFF3EA,#FFEFD8);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:100%;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:rise;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes rise{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.85}92%{opacity:.7}100%{transform:translateY(-110vh) translateX(var(--drift,20px)) rotate(var(--spin,25deg));opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:linear-gradient(160deg,#FF6F59,#FFD37A);color:#2A1610;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.45);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;opacity:.8;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;margin:12px 0 16px;animation:lineIn .5s ease-out .25s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;animation:lineIn .5s ease-out .35s both}' +
                '.age{font-weight:600;opacity:.85}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(42,22,16,.45)}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card"><div><div class="kicker">BIRTHDAY WISH</div>' +
                '<div class="headline"><span class="sparkle">🎂</span> Happy Birthday, ' + esc(d.name) + '!</div>' +
                '<div class="message">' + PRELOADED_MESSAGES.birthday + ' <span class="age">Turning ' + esc(d.age) + ' today!</span></div></div>' +
                '<div class="sign"><span class="from">From</span>' + esc(d.from) + '</div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['🎈','🎉','✨'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%F0%9F%8E%82%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        },

        // Same floating-particle scene composition as the birthday template, restyled
        // in a rose-gold palette with a heart/dove particle set.
        anniversary: function (d, opts) {
            opts = opts || {};
            var names = esc(d.partner1) + ' &amp; ' + esc(d.partner2);
            var title = 'Happy Anniversary — ' + names;
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(160deg,#FDF1F2,#FBE9EC);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:100%;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:rise;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes rise{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.85}92%{opacity:.7}100%{transform:translateY(-110vh) translateX(var(--drift,20px)) rotate(var(--spin,25deg));opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:linear-gradient(160deg,#C9788C,#F2C6B4);color:#301620;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.45);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;opacity:.8;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;margin:12px 0 16px;animation:lineIn .5s ease-out .25s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;animation:lineIn .5s ease-out .35s both}' +
                '.years{font-weight:600;opacity:.85}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(48,22,32,.45)}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card"><div><div class="kicker">MARRIAGE ANNIVERSARY</div>' +
                '<div class="headline"><span class="sparkle">💞</span> Happy Anniversary, ' + names + '!</div>' +
                '<div class="message">' + PRELOADED_MESSAGES.anniversary + '</div></div>' +
                '<div class="sign"><span class="from">Celebrating</span><span class="years">' + esc(d.years) + ' Years Together</span></div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['💗','💫','🕊️'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%F0%9F%92%9E%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        },

        // Two-phase interactive card: ask, then reveal the personalized message —
        // both phases use the same card/ornament/sparkle visual language.
        // Same floating-particle scene composition as the other rebuilt templates,
        // restyled in a light blush palette with a heart particle set, plus the
        // original two-phase ask/reveal interaction kept intact on the new card.
        valentine: function (d, opts) {
            opts = opts || {};
            var title = 'Will you be my Valentine, ' + esc(d.theirName) + '?';
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(160deg,#FFF0F1,#FFE6EA);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:100%;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:rise;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes rise{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.85}92%{opacity:.7}100%{transform:translateY(-110vh) translateX(var(--drift,20px)) rotate(var(--spin,25deg));opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:linear-gradient(160deg,#FFD9E0,#FFF3F5);color:#4A1220;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.2);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;opacity:.8;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;margin:12px 0 16px;animation:lineIn .5s ease-out .25s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;animation:lineIn .5s ease-out .35s both}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(74,18,32,.45)}' +
                '.v-buttons{display:flex;gap:14px;margin-top:22px;animation:lineIn .5s ease-out .55s both}' +
                '.v-btn{padding:10px 22px;font-size:13px;font-weight:600;letter-spacing:.02em;border-radius:20px;cursor:pointer;font-family:"Public Sans",sans-serif;border:2px solid #FF2E56}' +
                '.v-yes{background:#FF2E56;color:#fff}.v-no{background:#fff;color:#FF2E56}' +
                '#reveal{display:none}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card" id="ask"><div><div class="kicker">WILL YOU BE MY</div>' +
                '<div class="headline"><span class="sparkle">❤️</span> Valentine, ' + esc(d.theirName) + '?</div></div>' +
                '<div class="v-buttons"><button class="v-btn v-yes" id="yesBtn" type="button">Yes 💕</button><button class="v-btn v-no" id="noBtn" type="button">No</button></div></div>' +
                '<div class="card" id="reveal"><div><div class="kicker">HAPPY VALENTINE\'S DAY</div>' +
                '<div class="headline"><span class="sparkle">💕</span> ' + esc(d.theirName) + '</div>' +
                '<div class="message">' + esc(d.message) + '</div></div>' +
                '<div class="sign"><span class="from">Love</span>' + esc(d.yourName) + '</div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['❤️','💕','💗'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}var noCount=0;var yesBtn=document.getElementById('yesBtn'),noBtn=document.getElementById('noBtn'),ask=document.getElementById('ask'),reveal=document.getElementById('reveal');yesBtn.addEventListener('click',function(){ask.style.display='none';reveal.style.display='flex';});noBtn.addEventListener('click',function(){noCount++;var s=1+noCount*0.15;yesBtn.style.transform='scale('+s+')';if(noCount>=8)noBtn.style.display='none';});})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%E2%9D%A4%EF%B8%8F%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        },

        // Same floating-particle scene composition as birthday/anniversary, restyled
        // in a pine-green palette with a falling snowflake particle set.
        christmas: function (d, opts) {
            opts = opts || {};
            var title = 'Merry Christmas — ' + esc(d.name);
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(160deg,#EAF6EF,#F3FBF6);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:-10vh;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:fall;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes fall{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.9}92%{opacity:.75}100%{transform:translateY(110vh) translateX(var(--drift,20px)) rotate(var(--spin,60deg));opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:linear-gradient(160deg,#DCEEDF,#F7FBF4);color:#14301C;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.2);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;opacity:.8;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;margin:12px 0 16px;animation:lineIn .5s ease-out .25s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;animation:lineIn .5s ease-out .35s both}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(15,32,19,.45)}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card"><div><div class="kicker">MERRY CHRISTMAS</div>' +
                '<div class="headline"><span class="sparkle">🎄</span> Merry Christmas, ' + esc(d.name) + '!</div>' +
                '<div class="message">' + PRELOADED_MESSAGES.christmas + '</div></div>' +
                '<div class="sign"><span class="from">From</span>' + esc(d.from) + '</div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['❄️','✨'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%F0%9F%8E%84%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        },

        // Same floating-particle scene composition as the other rebuilt templates,
        // restyled in a light lavender/gold palette with a confetti particle set.
        newyear: function (d, opts) {
            opts = opts || {};
            var title = 'Happy New Year ' + esc(d.year) + ' — ' + esc(d.name);
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(160deg,#FFF9E8,#F3E9FF);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:100%;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:riseSpin;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes riseSpin{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.85}92%{opacity:.75}100%{transform:translateY(-110vh) translateX(var(--drift,20px)) rotate(720deg);opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:linear-gradient(160deg,#F3E6FF,#FFF7E0);color:#2E1A47;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.2);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;opacity:.8;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;margin:12px 0 4px;animation:lineIn .5s ease-out .25s both}' +
                '.year{font-family:"Fraunces",serif;font-weight:700;font-size:clamp(30px,8vw,40px);color:#8E44AD;margin:0 0 16px;animation:lineIn .5s ease-out .3s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;animation:lineIn .5s ease-out .35s both}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(46,26,71,.45)}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card"><div><div class="kicker">HAPPY</div>' +
                '<div class="headline"><span class="sparkle">🎊</span> New Year</div>' +
                '<div class="year">' + esc(d.year) + '</div>' +
                '<div class="message">' + esc(d.message) + ' <strong>' + esc(d.name) + '</strong></div></div>' +
                '<div class="sign"><span class="from">From</span>' + esc(d.from) + '</div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['✨','🎊','🎉'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%F0%9F%8E%8A%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        },

        // Same floating-particle scene composition as the other rebuilt templates,
        // restyled in a teal palette with book/pencil/star particles.
        studentday: function (d, opts) {
            opts = opts || {};
            var title = 'Happy Students\' Day — ' + esc(d.name);
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(160deg,#EAF6F5,#F4FBFA);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:100%;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:rise;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes rise{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.85}92%{opacity:.7}100%{transform:translateY(-110vh) translateX(var(--drift,20px)) rotate(var(--spin,25deg));opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:linear-gradient(160deg,#D7F0EC,#F2FBF9);color:#0D2A2C;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.2);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;opacity:.8;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;margin:12px 0 16px;animation:lineIn .5s ease-out .25s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;animation:lineIn .5s ease-out .35s both}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(13,42,44,.45)}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card"><div><div class="kicker">STUDENTS\' DAY</div>' +
                '<div class="headline"><span class="sparkle">📚</span> Happy Students\' Day, ' + esc(d.name) + '!</div>' +
                '<div class="message">' + PRELOADED_MESSAGES.studentday + '</div></div>' +
                '<div class="sign"><span class="from">From</span>' + esc(d.from) + '</div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['📚','✏️','⭐'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%F0%9F%93%9A%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        },

        // Same floating-particle scene composition as birthday/anniversary/christmas/
        // labourday, restyled light with a tricolor (saffron/white/green) background
        // and a tricolor accent stripe on the card, plus a firework particle set.
        independenceday: function (d, opts) {
            opts = opts || {};
            var title = 'Happy Independence Day — ' + esc(d.name);
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(180deg,#FFF3E0 0%,#FFFFFF 45%,#E3F7E6 100%);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:100%;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:rise;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes rise{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.85}92%{opacity:.7}100%{transform:translateY(-110vh) translateX(var(--drift,20px)) rotate(var(--spin,25deg));opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:#FFFFFF;color:#101A2C;padding:34px 28px 30px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.25);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '.card::before{content:"";position:absolute;top:0;left:0;right:0;height:8px;border-radius:14px 14px 0 0;background:linear-gradient(90deg,#FF9933 0 33%,#FFFFFF 33% 66%,#138808 66% 100%);box-shadow:inset 0 -1px 0 rgba(0,0,0,.08)}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;color:#CC6A00;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;color:#0B2559;margin:12px 0 16px;animation:lineIn .5s ease-out .25s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;color:#2A3548;animation:lineIn .5s ease-out .35s both}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;color:#138808;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;color:#101A2C;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(16,26,44,.45)}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card"><div><div class="kicker">INDEPENDENCE DAY</div>' +
                '<div class="headline"><span class="sparkle">🎆</span> Happy Independence Day, ' + esc(d.name) + '!</div>' +
                '<div class="message">' + PRELOADED_MESSAGES.independenceday + '</div></div>' +
                '<div class="sign"><span class="from">From</span>' + esc(d.from) + '</div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['🎆','✨','🎇'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%F0%9F%8E%86%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        },

        // Same floating-particle scene composition as birthday/anniversary/christmas,
        // restyled in a brass/bronze palette with a tools particle set.
        labourday: function (d, opts) {
            opts = opts || {};
            var title = 'Happy Labour Day — ' + esc(d.name);
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(160deg,#F8F1E3,#FFFAF0);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:100%;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:rise;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes rise{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.85}92%{opacity:.7}100%{transform:translateY(-110vh) translateX(var(--drift,20px)) rotate(var(--spin,25deg));opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:linear-gradient(160deg,#FCE9C4,#FFF6E8);color:#3B2A0E;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.2);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;opacity:.8;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;margin:12px 0 16px;animation:lineIn .5s ease-out .25s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;animation:lineIn .5s ease-out .35s both}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(36,26,8,.45)}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card"><div><div class="kicker">LABOUR DAY</div>' +
                '<div class="headline"><span class="sparkle">🛠️</span> Happy Labour Day, ' + esc(d.name) + '!</div>' +
                '<div class="message">' + PRELOADED_MESSAGES.labourday + '</div></div>' +
                '<div class="sign"><span class="from">From</span>' + esc(d.from) + '</div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['🛠️','🔨','⚒️'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%F0%9F%9B%A0%EF%B8%8F%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        },

        // Same floating-particle scene composition as the other rebuilt templates,
        // restyled in a steel-blue/brass palette with full-spin gear/bulb particles.
        engineerday: function (d, opts) {
            opts = opts || {};
            var title = 'Happy Engineer\'s Day — ' + esc(d.name);
            var css = ':root{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}html,body{height:100%;margin:0}' +
                'body{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Public Sans",system-ui,sans-serif;background:linear-gradient(160deg,#EEF2F6,#FFF6EB);overflow:hidden;position:relative}' +
                '.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
                '.particle{position:absolute;top:100%;font-size:22px;opacity:0;will-change:transform,opacity;animation-name:riseSpin;animation-timing-function:ease-in;animation-iteration-count:infinite}' +
                '@keyframes riseSpin{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.85}92%{opacity:.75}100%{transform:translateY(-110vh) translateX(var(--drift,20px)) rotate(720deg);opacity:0}}' +
                '.card{position:relative;z-index:1;width:100%;max-width:460px;aspect-ratio:4/5;border-radius:14px;background:linear-gradient(160deg,#DCE6F0,#FDEBD3);color:#1B2A38;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 28px 60px -22px rgba(0,0,0,.2);animation:cardIn .7s cubic-bezier(.22,.9,.32,1) both,cardFloat 6s ease-in-out .7s infinite}' +
                '@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
                '.kicker{font-size:12.5px;font-weight:600;letter-spacing:.03em;opacity:.8;animation:lineIn .5s ease-out .15s both}' +
                '.headline{font-family:"Fraunces",serif;font-size:clamp(26px,6.5vw,34px);line-height:1.08;font-weight:600;margin:12px 0 16px;animation:lineIn .5s ease-out .25s both}' +
                '.message{font-size:15.5px;line-height:1.6;max-width:36ch;animation:lineIn .5s ease-out .35s both}' +
                '.sign{margin-top:20px;font-family:"Fraunces",serif;font-style:italic;font-size:17px;animation:lineIn .5s ease-out .45s both}' +
                '.sign .from{display:block;font-size:12px;font-style:normal;opacity:.75;font-family:"Public Sans",sans-serif;margin-bottom:3px;letter-spacing:.02em}' +
                '@keyframes lineIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
                '.sparkle{display:inline-block;animation:sparkle 2.4s ease-in-out infinite}' +
                '@keyframes sparkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:.55;transform:scale(.85) rotate(8deg)}}' +
                '.share-badge{margin-top:10px;font-size:11px;color:rgba(16,27,38,.45)}' +
                '@media(prefers-reduced-motion:reduce){.particle,.card,.card .kicker,.card .headline,.card .message,.card .sign,.sparkle{animation:none!important}}';
            var body = '<div class="particles" id="particles"></div>' +
                '<div class="card"><div><div class="kicker">ENGINEER\'S DAY</div>' +
                '<div class="headline"><span class="sparkle">⚙️</span> Happy Engineer\'s Day, ' + esc(d.name) + '!</div>' +
                '<div class="message">' + PRELOADED_MESSAGES.engineerday + '</div></div>' +
                '<div class="sign"><span class="from">From</span>' + esc(d.from) + '</div>' +
                (opts.shareUrl ? '<div class="share-badge">Made with CelebrateMe</div>' : '') + '</div>';
            var script = "(function(){var EMOJIS=['⚙️','🔧','💡'];var host=document.getElementById('particles');var COUNT=22;for(var i=0;i<COUNT;i++){var span=document.createElement('span');span.className='particle';span.textContent=EMOJIS[i%EMOJIS.length];var left=Math.random()*100;var duration=9+Math.random()*8;var delay=Math.random()*12;var drift=(Math.random()*80-40)+'px';var spin=(Math.random()*50-25)+'deg';var size=16+Math.random()*14;span.style.left=left+'vw';span.style.fontSize=size+'px';span.style.animationDuration=duration+'s';span.style.animationDelay='-'+delay+'s';span.style.setProperty('--drift',drift);span.style.setProperty('--spin',spin);host.appendChild(span);}})();";
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>' + title + '</title>' +
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%E2%9A%99%EF%B8%8F%3C/text%3E%3C/svg%3E">' +
                '<link rel="preconnect" href="https://fonts.googleapis.com">' + BIRTHDAY_FONT_LINK +
                '<style>' + css + '</style></head><body>' + body + '<script>' + script + '<\/script></body></html>';
        }
    };

    var filenames = {
        birthday: 'birthday-celebration.html',
        anniversary: 'anniversary-celebration.html',
        valentine: 'valentine-celebration.html',
        christmas: 'christmas-celebration.html',
        newyear: 'newyear-celebration.html',
        studentday: 'student-day-celebration.html',
        independenceday: 'independence-day-celebration.html',
        labourday: 'labour-day-celebration.html',
        engineerday: 'engineer-day-celebration.html'
    };

    var TYPES = Object.keys(templates);

    return { esc: esc, templates: templates, filenames: filenames, TYPES: TYPES, THEMES: THEMES };
});
