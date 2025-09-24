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

const bgToggle = document.getElementById('bg-toggle');
const textShadowToggle = document.getElementById('text-shadow-toggle');
const boxShadowToggle = document.getElementById('box-shadow-toggle');
const previewBgColorPicker = document.getElementById('preview-bg-color-picker');

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
        bgHeight: bgHeightSlider.value,
        bg: bgToggle.checked ? 'true' : 'false',
        textShadow: textShadowToggle.checked ? 'true' : 'false',
        boxShadow: boxShadowToggle.checked ? 'true' : 'false',
        previewBgColor: previewBgColorPicker.value.replace('#', '')
    };

    const params = new URLSearchParams(settings);
    obsUrlInput.value = `${baseUrl}?${params.toString()}`;
}

function updateAll() {
    root.style.setProperty('--clock-font', fontSelect.value);
    root.style.setProperty('--clock-color', colorPicker.value);
    root.style.setProperty('--clock-size', `${sizeSlider.value}px`);

    root.style.setProperty('--bg-width', `${bgWidthSlider.value}px`);
    root.style.setProperty('--bg-height', `${bgHeightSlider.value}px`);

    root.style.setProperty('--pos-x', `${posxSlider.value}%`);
    root.style.setProperty('--pos-y', `${posySlider.value}%`);
    
    // 背景のオンオフ
    if(bgToggle.checked) {
        previewContainer.style.backgroundColor = 'rgba(45, 45, 45, 0.8)';
    } else {
        previewContainer.style.backgroundColor = 'transparent';
    }


    if (borderToggle.checked) {
        root.style.setProperty('--border-width', `${borderWidthSlider.value}px`);
        root.style.setProperty('--border-color', borderColorPicker.value);
        root.style.setProperty('--border-radius', `${borderRadiusSlider.value}px`);
    } else {
        root.style.setProperty('--border-width', `0px`);
    }

    if (textShadowToggle.checked) {
        root.style.setProperty('--text-shadow-value', '2px 2px 6px rgba(0, 0, 0, 0.5)');
    } else {
        root.style.setProperty('--text-shadow-value', 'none');
    }

    if (boxShadowToggle.checked) {
        root.style.setProperty('--box-shadow-value', '0 4px 15px rgba(0, 0, 0, 0.6)');
    } else {
        root.style.setProperty('--box-shadow-value', 'none');
    }

    root.style.setProperty('--preview-bg-color', previewBgColorPicker.value);

    updateClock();
    updateUrl();
}

const allElements = [
    fontSelect, colorPicker, sizeSlider, sizeInput, dateToggle, dayToggle, formatSelect,
    borderToggle, borderColorPicker, borderWidthSlider, borderWidthInput, borderRadiusSlider, borderRadiusInput,
    bgWidthSlider, bgWidthInput, bgHeightSlider, bgHeightInput,
    posxSlider, posxInput, posySlider, posyInput,
    bgToggle, textShadowToggle, boxShadowToggle, previewBgColorPicker
];

allElements.forEach(element => {
    element.addEventListener('input', () => {
        // スライダーと入力欄の同期
        if (element.type === 'range') {
            document.getElementById(element.id.replace('slider', 'input')).value = element.value;
        } else if (element.type === 'number') {
            document.getElementById(element.id.replace('input', 'slider')).value = element.value;
        }
        updateAll();
    });
    // changeイベントも追加
    element.addEventListener('change', updateAll);
});

// 背景のオンオフと背景の影の連動機能
bgToggle.addEventListener('change', () => {
    if (bgToggle.checked) {
        boxShadowToggle.checked = true;
    } else {
        boxShadowToggle.checked = false;
    }
    updateAll();
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
    const bg = params.get('bg');
    const textShadow = params.get('textShadow');
    const boxShadow = params.get('boxShadow');
    const previewBgColor = params.get('previewBgColor');

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
    if (bg) {
        bgToggle.checked = bg === 'true';
    }
    if (textShadow) {
        textShadowToggle.checked = textShadow === 'true';
    }
    if (boxShadow) {
        boxShadowToggle.checked = boxShadow === 'true';
    }
    if (previewBgColor) {
        previewBgColorPicker.value = `#${previewBgColor}`;
    }

    updateAll();
    updateClock();
}

applySettingsFromUrl();
setInterval(updateClock, 1000);