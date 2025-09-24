// HTML要素を取得
const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');
const dayDisplay = document.getElementById('day-display');
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

const timePosXSlider = document.getElementById('time-pos-x-slider');
const timePosXInput = document.getElementById('time-pos-x-input');
const timePosYSlider = document.getElementById('time-pos-y-slider');
const timePosYInput = document.getElementById('time-pos-y-input');

const datePosXSlider = document.getElementById('date-pos-x-slider');
const datePosXInput = document.getElementById('date-pos-x-input');
const datePosYSlider = document.getElementById('date-pos-y-slider');
const datePosYInput = document.getElementById('date-pos-y-input');

const dayPosXSlider = document.getElementById('day-pos-x-slider');
const dayPosXInput = document.getElementById('day-pos-x-input');
const dayPosYSlider = document.getElementById('day-pos-y-slider');
const dayPosYInput = document.getElementById('day-pos-y-input');

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
    
    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${ampm}`;

    let dateString = '';
    let dayString = '';

    if (dateToggle.checked) {
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        dateString = `${year}/${month}/${day}`;
    }
    dateDisplay.textContent = dateString;

    if (dayToggle.checked) {
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        dayString = `(${days[now.getDay()]})`;
    }
    dayDisplay.textContent = dayString;
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
        timePosX: timePosXSlider.value,
        timePosY: timePosYSlider.value,
        datePosX: datePosXSlider.value,
        datePosY: datePosYSlider.value,
        dayPosX: dayPosXSlider.value,
        dayPosY: dayPosYSlider.value,
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

    root.style.setProperty('--time-pos-x', `${timePosXSlider.value}%`);
    root.style.setProperty('--time-pos-y', `${timePosYSlider.value}%`);
    root.style.setProperty('--date-pos-x', `${datePosXSlider.value}%`);
    root.style.setProperty('--date-pos-y', `${datePosYSlider.value}%`);
    root.style.setProperty('--day-pos-x', `${dayPosXSlider.value}%`);
    root.style.setProperty('--day-pos-y', `${dayPosYSlider.value}%`);
    
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

    // スライダーと入力欄の値を同期
    sizeInput.value = sizeSlider.value;
    borderWidthInput.value = borderWidthSlider.value;
    borderRadiusInput.value = borderRadiusSlider.value;
    bgWidthInput.value = bgWidthSlider.value;
    bgHeightInput.value = bgHeightSlider.value;
    timePosXInput.value = timePosXSlider.value;
    timePosYInput.value = timePosYSlider.value;
    datePosXInput.value = datePosXSlider.value;
    datePosYInput.value = datePosYSlider.value;
    dayPosXInput.value = dayPosXSlider.value;
    dayPosYInput.value = dayPosYSlider.value;

    updateClock();
    updateUrl();
}

const allElements = [
    fontSelect, colorPicker, dateToggle, dayToggle, formatSelect,
    borderToggle, borderColorPicker,
    bgToggle, textShadowToggle, boxShadowToggle, previewBgColorPicker
];

// スライダーと入力欄の同期
const syncSliders = [
    { slider: sizeSlider, input: sizeInput },
    { slider: borderWidthSlider, input: borderWidthInput },
    { slider: borderRadiusSlider, input: borderRadiusInput },
    { slider: bgWidthSlider, input: bgWidthInput },
    { slider: bgHeightSlider, input: bgHeightInput },
    { slider: timePosXSlider, input: timePosXInput },
    { slider: timePosYSlider, input: timePosYInput },
    { slider: datePosXSlider, input: datePosXInput },
    { slider: datePosYSlider, input: datePosYInput },
    { slider: dayPosXSlider, input: dayPosXInput },
    { slider: dayPosYSlider, input: dayPosYInput },
];

syncSliders.forEach(pair => {
    pair.slider.addEventListener('input', () => { pair.input.value = pair.slider.value; updateAll(); });
    pair.input.addEventListener('input', () => { pair.slider.value = pair.input.value; updateAll(); });
});

allElements.forEach(element => {
    element.addEventListener('change', updateAll);
});

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
    const timePosX = params.get('timePosX');
    const timePosY = params.get('timePosY');
    const datePosX = params.get('datePosX');
    const datePosY = params.get('datePosY');
    const dayPosX = params.get('dayPosX');
    const dayPosY = params.get('dayPosY');
    const bgWidth = params.get('bgWidth');
    const bgHeight = params.get('bgHeight');
    const bg = params.get('bg');
    const textShadow = params.get('textShadow');
    const boxShadow = params.get('boxShadow');
    const previewBgColor = params.get('previewBgColor');

    if (font) { fontSelect.value = font; }
    if (color) { colorPicker.value = `#${color}`; }
    if (size) { sizeSlider.value = size; sizeInput.value = size; }
    if (date) { dateToggle.checked = date === 'true'; }
    if (day) { dayToggle.checked = day === 'true'; }
    if (format) { formatSelect.value = format; }
    if (border) { borderToggle.checked = border === 'true'; }
    if (borderColor) { borderColorPicker.value = `#${borderColor}`; }
    if (borderWidth) { borderWidthSlider.value = borderWidth; borderWidthInput.value = borderWidth; }
    if (borderRadius) { borderRadiusSlider.value = borderRadius; borderRadiusInput.value = borderRadius; }
    if (timePosX) { timePosXSlider.value = timePosX; timePosXInput.value = timePosX; }
    if (timePosY) { timePosYSlider.value = timePosY; timePosYInput.value = timePosY; }
    if (datePosX) { datePosXSlider.value = datePosX; datePosXInput.value = datePosX; }
    if (datePosY) { datePosYSlider.value = datePosY; datePosYInput.value = datePosY; }
    if (dayPosX) { dayPosXSlider.value = dayPosX; dayPosXInput.value = dayPosX; }
    if (dayPosY) { dayPosYSlider.value = dayPosY; dayPosYInput.value = dayPosY; }
    if (bgWidth) { bgWidthSlider.value = bgWidth; bgWidthInput.value = bgWidth; }
    if (bgHeight) { bgHeightSlider.value = bgHeight; bgHeightInput.value = bgHeight; }
    if (bg) { bgToggle.checked = bg === 'true'; }
    if (textShadow) { textShadowToggle.checked = textShadow === 'true'; }
    if (boxShadow) { boxShadowToggle.checked = boxShadow === 'true'; }
    if (previewBgColor) { previewBgColorPicker.value = `#${previewBgColor}`; } else { previewBgColorPicker.value = `#FFFFFF`; }

    updateAll();
    updateClock();
}

applySettingsFromUrl();
setInterval(updateClock, 1000);