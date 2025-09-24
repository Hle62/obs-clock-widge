// HTML要素を取得
const clockElement = document.getElementById('clock');
const fontSelect = document.getElementById('font-select');
const colorPicker = document.getElementById('color-picker');
const sizeSlider = document.getElementById('size-slider');
const sizeValueSpan = document.getElementById('size-value');
const obsUrlInput = document.getElementById('obs-url-input');
const copyButton = document.getElementById('copy-button');

// CSSのルート要素（:root）を取得
const root = document.documentElement;

// 現在時刻を更新する関数
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// ----------------------------------------------------
// UIイベントリスナーとURL更新機能
// ----------------------------------------------------

function updateUrl() {
    // 現在のサイトURLを取得
    const baseUrl = window.location.origin + window.location.pathname;

    // 設定値をオブジェクトにまとめる
    const settings = {
        font: fontSelect.value,
        color: colorPicker.value.replace('#', ''), // #を削除
        size: sizeSlider.value
    };

    // URLSearchParamsオブジェクトでクエリパラメータを生成
    const params = new URLSearchParams(settings);

    // 完成したURLをinputに表示
    obsUrlInput.value = `${baseUrl}?${params.toString()}`;
}

// フォント、色、サイズが変更されたらプレビューとURLを更新
[fontSelect, colorPicker, sizeSlider].forEach(element => {
    element.addEventListener('change', () => {
        // CSS変数を更新
        root.style.setProperty('--clock-font', fontSelect.value);
        root.style.setProperty('--clock-color', colorPicker.value);
        root.style.setProperty('--clock-size', `${sizeSlider.value}px`);

        // URLを更新
        updateUrl();
    });
});

// コピーボタンのクリックイベント
copyButton.addEventListener('click', () => {
    // inputの内容をクリップボードにコピー
    obsUrlInput.select();
    navigator.clipboard.writeText(obsUrlInput.value)
        .then(() => {
            // コピー成功時のフィードバック
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

// URLのクエリパラメータを読み込んでデザインを適用
function applySettingsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const font = params.get('font');
    const color = params.get('color');
    const size = params.get('size');

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

    // 初回読み込み時にURLを生成
    updateUrl();
}

// ページ読み込み時の処理
applySettingsFromUrl();
setInterval(updateClock, 1000);
updateClock();