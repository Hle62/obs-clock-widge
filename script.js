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

// 新しい要素を追加
const borderToggle = document.getElementById('border-toggle');
const borderColorPicker = document.getElementById('border-color-picker');
const borderWidthSlider = document.getElementById('border-width-slider');
const borderWidthValueSpan = document.getElementById('border-width-value');
const borderRadiusSlider = document.getElementById('border-radius-slider');
const borderRadiusValueSpan = document.getElementById('border-radius-value');

// 新しい要素を追加
const bgWidthSlider = document.getElementById('bg-width-slider');
const bgWidthValueSpan = document.getElementById('bg-width-value');
const bgHeightSlider = document.getElementById('bg-height-slider');
const bgHeightValueSpan = document.getElementById('bg-height-value');

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

    const settings = {
        font: fontSelect.value,
        color: colorPicker.value.replace('#', ''),
        size: sizeSlider.value,
        date: dateToggle.checked ? 'true' : 'false',
        day: dayToggle.checked ? 'true' : 'false',
        format: formatSelect.value,
        // 新しい設定項目を追加
        border: borderToggle.checked ? 'true' : 'false',
        borderColor: borderColorPicker.value.replace('#', ''),
        borderWidth: borderWidthSlider.value,
        borderRadius: borderRadiusSlider.value,
        left: clockElement.style.left,
        top: clockElement.style.top,
        // 新しい設定項目を追加
        bgWidth: bgWidthSlider.value,
        bgHeight: bgHeightSlider.value
    };

    const params = new URLSearchParams(settings);
    obsUrlInput.value = `${baseUrl}?${params.toString()}`;
}

// すべてのUI要素のイベントリスナーを一つの配列で管理
[
    fontSelect, colorPicker, sizeSlider, dateToggle, dayToggle, formatSelect,
    borderToggle, borderColorPicker, borderWidthSlider, borderRadiusSlider,
    bgWidthSlider, bgHeightSlider // 新しい要素を追加
].forEach(element => {
    element.addEventListener('change', () => {
        root.style.setProperty('--clock-font', fontSelect.value);
        root.style.setProperty('--clock-color', colorPicker.value);
        root.style.setProperty('--clock-size', `${sizeSlider.value}px`);

        // 背景枠の表示・非表示
        if (borderToggle.checked) {
            previewContainer.style.border = `${borderWidthSlider.value}px solid ${borderColorPicker.value}`;
            previewContainer.style.borderRadius = `${borderRadiusSlider.value}px`;
        } else {
            previewContainer.style.border = 'none';
        }
        
        // スライダーの値を更新
        borderWidthValueSpan.textContent = `${borderWidthSlider.value}px`;
        borderRadiusValueSpan.textContent = `${borderRadiusSlider.value}px`;
        bgWidthValueSpan.textContent = `${bgWidthSlider.value}px`;
        bgHeightValueSpan.textContent = `${bgHeightSlider.value}px`;

        updateClock();
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
// ドラッグ＆ドロップ機能
// ----------------------------------------------------

const previewContainer = document.getElementById('preview-container');
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let initialLeft = 0;
let initialTop = 0;

// マウスダウンでドラッグ開始
clockElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    clockElement.style.cursor = 'grabbing';
    
    // マウスの開始位置と時計の初期位置を記録
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    initialLeft = clockElement.offsetLeft;
    initialTop = clockElement.offsetTop;

    e.preventDefault(); // ドラッグ中のブラウザのデフォルト動作を無効化
});

// マウスを動かすたびに位置を更新
previewContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // ドラッグした距離を計算
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    // 新しい位置を計算
    const newLeft = initialLeft + dx;
    const newTop = initialTop + dy;
    
    // コンテナの境界内に収まるように調整
    const containerRect = previewContainer.getBoundingClientRect();
    const clockRect = clockElement.getBoundingClientRect();
    
    const maxLeft = containerRect.width - clockRect.width;
    const maxTop = containerRect.height - clockRect.height;
    
    const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
    const clampedTop = Math.max(0, Math.min(newTop, maxTop));
    
    // 新しい位置を適用
    clockElement.style.left = `${clampedLeft}px`;
    clockElement.style.top = `${clampedTop}px`;
    
    updateUrl();
});

// マウスアップでドラッグ終了
window.addEventListener('mouseup', () => { // window全体でイベントを監視
    isDragging = false;
    clockElement.style.cursor = 'grab';
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
    // 新しい設定項目を追加
    const border = params.get('border');
    const borderColor = params.get('borderColor');
    const borderWidth = params.get('borderWidth');
    const borderRadius = params.get('borderRadius');
    // 位置情報も追加
    const left = params.get('left');
    const top = params.get('top');
    // 新しい設定項目
    const bgWidth = params.get('bgWidth');
    const bgHeight = params.get('bgHeight');

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
    // 新しい設定を適用
    if (border) {
        borderToggle.checked = border === 'true';
        if (border === 'true') {
            previewContainer.style.border = `${borderWidth}px solid #${borderColor}`;
            previewContainer.style.borderRadius = `${borderRadius}px`;
        }
    }
    if (borderColor) {
        borderColorPicker.value = `#${borderColor}`;
    }
    if (borderWidth) {
        borderWidthSlider.value = borderWidth;
        borderWidthValueSpan.textContent = `${borderWidth}px`;
    }
    if (borderRadius) {
        borderRadiusSlider.value = borderRadius;
        borderRadiusValueSpan.textContent = `${borderRadius}px`;
    }
    // 位置情報を適用
    if (left) {
        clockElement.style.left = left;
    }
    if (top) {
        clockElement.style.top = top;
    }
    // 新しい設定を適用
    if (bgWidth) {
        bgWidthSlider.value = bgWidth;
        bgWidthValueSpan.textContent = `${bgWidth}px`;
        root.style.setProperty('--bg-width', `${bgWidth}px`);
    }
    if (bgHeight) {
        bgHeightSlider.value = bgHeight;
        bgHeightValueSpan.textContent = `${bgHeight}px`;
        root.style.setProperty('--bg-height', `${bgHeight}px`);
    }

    updateClock();
    updateUrl();
}

applySettingsFromUrl();
setInterval(updateClock, 1000);