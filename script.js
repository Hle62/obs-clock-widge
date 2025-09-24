// HTML要素を取得
const clockElement = document.getElementById('clock');
const fontSelect = document.getElementById('font-select');
const colorPicker = document.getElementById('color-picker');

const obsUrlInput = document.getElementById('obs-url-input');
const copyButton = document.getElementById('copy-button');
const previewContainer = document.getElementById('preview-container');

// 新しいHTML要素を取得
const dateToggle = document.getElementById('date-toggle');
const dayToggle = document.getElementById('day-toggle');
const formatSelect = document.getElementById('format-select');

// 新しい要素を追加
const borderToggle = document.getElementById('border-toggle');
const borderColorPicker = document.getElementById('border-color-picker');

// スライダーとテキスト入力欄のペア
const sizeSlider = document.getElementById('size-slider');
const sizeInput = document.getElementById('size-input');

const borderWidthSlider = document.getElementById('border-width-slider');
const borderWidthInput = document.getElementById('border-width-input');

const borderRadiusSlider = document.getElementById('border-radius-slider');
const borderRadiusInput = document.getElementById('border-radius-input');

const bgWidthSlider = document.getElementById('bg-width-slider');
const bgWidthInput = document.getElementById('bg-width-input');

const bgHeightSlider = document.getElementById('bg-height-slider');
const bgHeightInput = document.getElementById('bg-height-input');

const posxSlider = document.getElementById('pos-x-slider');
const posxInput = document.getElementById('pos-x-input');

const posySlider = document.getElementById('pos-y-slider');
const posyInput = document.getElementById('pos-y-input');


// CSSのルート要素（:root）を取得
const root = document.documentElement;

// ----------------------------------------------------
// 時刻更新関数
// ----------------------------------------------------

function updateClock() {
    const now = new Date();
    const is12HourFormat = formatSelect.value === '12h';

    let hours = now.getHours();
    let ampm = '';

    if (is12HourFormat) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    let timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${ampm}`;

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

    const displayString = `${timeString} ${dateString} ${dayString}`.trim();
    clockElement.textContent = displayString;
}

// ----------------------------------------------------
// UIイベントリスナーとURL更新機能
// ----------------------------------------------------

function updateUrl() {
    const baseUrl = window.location.origin + window.location.pathname;

    const settings = {
        font: fontSelect.value,
        color: colorPicker.value.replace('#', ''),
        size: sizeSlider.value,
        date: dateToggle.checked ? 'true' : 'false',
        day: dayToggle.checked ? 'true' : 'false',
        format: formatSelect.value,
        border: borderToggle.checked ? 'true' : 'false',
        borderColor: borderColorPicker.value.replace('#', ''),
        borderWidth: borderWidthSlider.value,
        borderRadius: borderRadiusSlider.value,
        posX: posxSlider.value,
        posY: posySlider.value,
        bgWidth: bgWidthSlider.value,
        bgHeight: bgHeightSlider.value
    };

    const params = new URLSearchParams(settings);
    obsUrlInput.value = `${baseUrl}?${params.toString()}`;
}

// スライダーと入力欄の値を同期させる関数
function syncValues(slider, input) {
    slider.value = input.value;
    updateAll();
}

function updateAll() {
    root.style.setProperty('--clock-font', fontSelect.value);
    root.style.setProperty('--clock-color', colorPicker.value);
    root.style.setProperty('--clock-size', `${sizeSlider.value}px`);

    root.style.setProperty('--bg-width', `${bgWidthSlider.value}px`);
    root.style.setProperty('--bg-height', `${bgHeightSlider.value}px`);

    root.style.setProperty('--pos-x', `${posxSlider.value}%`);
    root.style.setProperty('--pos-y', `${posySlider.value}%`);

    if (borderToggle.checked) {
        root.style.setProperty('--border-width', `${borderWidthSlider.value}px`);
        root.style.setProperty('--border-color', borderColorPicker.value);
        root.style.setProperty('--border-radius', `${borderRadiusSlider.value}px`);
    } else {
        root.style.setProperty('--border-width', `0px`);
    }

    updateClock();
    updateUrl();
}

// スライダーと入力欄のイベントリスナーを設定
sizeSlider.addEventListener('input', () => { sizeInput.value = sizeSlider.value; updateAll(); });
sizeInput.addEventListener('input', () => { sizeSlider.value = sizeInput.value; updateAll(); });

borderWidthSlider.addEventListener('input', () => { borderWidthInput.value = borderWidthSlider.value; updateAll(); });
borderWidthInput.addEventListener('input', () => { borderWidthSlider.value = borderWidthInput.value; updateAll(); });

borderRadiusSlider.addEventListener('input', () => { borderRadiusInput.value = borderRadiusSlider.value; updateAll(); });
borderRadiusInput.addEventListener('input', () => { borderRadiusSlider.value = borderRadiusInput.value; updateAll(); });

bgWidthSlider.addEventListener('input', () => { bgWidthInput.value = bgWidthSlider.value; updateAll(); });
bgWidthInput.addEventListener('input', () => { bgWidthSlider.value = bgWidthInput.value; updateAll(); });

bgHeightSlider.addEventListener('input', () => { bgHeightInput.value = bgHeightSlider.value; updateAll(); });
bgHeightInput.addEventListener('input', () => { bgHeightSlider.value = bgHeightInput.value; updateAll(); });

posxSlider.addEventListener('input', () => { posxInput.value = posxSlider.value; updateAll(); });
posxInput.addEventListener('input', () => { posxSlider.value = posxInput.value; updateAll(); });

posySlider.addEventListener('input', () => { posyInput.value = posySlider.value; updateAll(); });
posyInput.addEventListener('input', () => { posySlider.value = posyInput.value; updateAll(); });


// その他のUIイベントリスナー
[fontSelect, colorPicker, dateToggle, dayToggle, formatSelect, borderToggle, borderColorPicker].forEach(element => {
    element.addEventListener('change', updateAll);
});

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
    const border = params.get('border');
    const borderColor = params.get('borderColor');
    const borderWidth = params.get('borderWidth');
    const borderRadius = params.get('borderRadius');
    const posX = params.get('posX');
    const posY = params.get('posY');
    const bgWidth = params.get('bgWidth');
    const bgHeight = params.get('bgHeight');

    if (font) {
        fontSelect.value = font;
    }
    if (color) {
        colorPicker.value = `#${color}`;
    }
    if (size) {
        sizeSlider.value = size;
        sizeInput.value = size;
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
    if (border) {
        borderToggle.checked = border === 'true';
    }
    if (borderColor) {
        borderColorPicker.value = `#${borderColor}`;
    }
    if (borderWidth) {
        borderWidthSlider.value = borderWidth;
        borderWidthInput.value = borderWidth;
    }
    if (borderRadius) {
        borderRadiusSlider.value = borderRadius;
        borderRadiusInput.value = borderRadius;
    }
    if (posX) {
        posxSlider.value = posX;
        posxInput.value = posX;
    }
    if (posY) {
        posySlider.value = posY;
        posyInput.value = posY;
    }
    if (bgWidth) {
        bgWidthSlider.value = bgWidth;
        bgWidthInput.value = bgWidth;
    }
    if (bgHeight) {
        bgHeightSlider.value = bgHeight;
        bgHeightInput.value = bgHeight;
    }

    updateAll();
}

applySettingsFromUrl();
setInterval(updateClock, 1000);