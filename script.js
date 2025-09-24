// HTML要素を取得
const clockElement = document.getElementById('clock');
const fontSelect = document.getElementById('font-select');
const colorPicker = document.getElementById('color-picker');
const sizeSlider = document.getElementById('size-slider');
const sizeValueSpan = document.getElementById('size-value');
const obsUrlInput = document.getElementById('obs-url-input');
const copyButton = document.getElementById('copy-button');

// 新しいHTML要素を取得
const dateToggle = document.getElementById('date-toggle');
const dayToggle = document.getElementById('day-toggle');
const formatSelect = document.getElementById('format-select');

// CSSのルート要素（:root）を取得
const root = document.documentElement;

// ----------------------------------------------------
// 新しい時刻更新関数
// ----------------------------------------------------

function updateClock() {
    const now = new Date();
    const is12HourFormat = formatSelect.value === '12h';

    let hours = now.getHours();
    let ampm = '';

    if (is12HourFormat) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0時を12時に変換
    }

    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 時刻文字列を生成
    let timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${ampm}`;

    // 日付と曜日の表示/非表示をチェック
    let dateString = '';
    let dayString = '';

    if (dateToggle.checked) {
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        dateString = `${year}/${month}/${day}`;
    }

    if (dayToggle.checked) {
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        dayString = `(${days[now.getDay()]})`;
    }

    // すべての要素を結合して時計を更新
    const displayString = `${timeString} ${dateString} ${dayString}`.trim();
    clockElement.textContent = displayString;
}

// ----------------------------------------------------
// UIイベントリスナーとURL更新機能
// ----------------------------------------------------

function updateUrl() {
    const baseUrl = window.location.origin + window.location.pathname;

    // 新しい設定項目を追加
    const settings = {
        font: fontSelect.value,
        color: colorPicker.value.replace('#', ''),
        size: sizeSlider.value,
        date: dateToggle.checked ? 'true' : 'false',
        day: dayToggle.checked ? 'true' : 'false',
        format: formatSelect.value
    };

    const params = new URLSearchParams(settings);
    obsUrlInput.value = `${baseUrl}?${params.toString()}`;
}

// 新しいUI要素のイベントリスナーを追加
[fontSelect, colorPicker, sizeSlider, dateToggle, dayToggle, formatSelect].forEach(element => {
    element.addEventListener('change', () => {
        // CSS変数を更新
        root.style.setProperty('--clock-font', fontSelect.value);
        root.style.setProperty('--clock-color', colorPicker.value);
        root.style.setProperty('--clock-size', `${sizeSlider.value}px`);

        // 時計を更新
        updateClock();

        // URLを更新
        updateUrl();
    });
});

// コピーボタンのイベントリスナー
copyButton.addEventListener('click', () => {
    obsUrlInput.select();
    navigator.clipboard.writeText(obsUrlInput.value)
        .then(() => {
            copyButton.textContent = 'コピーしました！';
            setTimeout(() => {
                copyButton.textContent = 'コピー';
            }, 2000);
        })
        .catch(err => {
            console.error('コピーに失敗しました:', err);
        });
});

// ----------------------------------------------------
// ページの初期化
// ----------------------------------------------------

function applySettingsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const font = params.get('font');
    const color = params.get('color');
    const size = params.get('size');
    const date = params.get('date');
    const day = params.get('day');
    const format = params.get('format');

    if (font) {
        fontSelect.value = font;
        root.style.setProperty('--clock-font', font);
    }
    if (color) {
        colorPicker.value = `#${color}`;
        root.style.setProperty('--clock-color', `#${color}`);
    }
    if (size) {
        sizeSlider.value = size;
        root.style.setProperty('--clock-size', `${size}px`);
        sizeValueSpan.textContent = `${size}px`;
    }
    if (date) {
        dateToggle.checked = date === 'true';
    }
    if (day) {
        dayToggle.checked = day === 'true';
    }
    if (format) {
        formatSelect.value = format;
    }

    updateClock();
    updateUrl();
}

applySettingsFromUrl();
setInterval(updateClock, 1000);