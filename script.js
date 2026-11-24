// JavaScript
console.log('Hello world!');

// 緯度・経度
const latitude = 33.52150997605013;
const longitude = 130.53477834046305;

// Open-MeteoのAPI URL
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

// 要素の取得
const btn = document.getElementById('get-weather-btn');
const iconElem = document.getElementById('weather-icon');
const textElem = document.getElementById('weather-text');
const tempElem = document.getElementById('temperature');

// 天気コードの変換
const weatherCodes = {
    0: { text: '快晴', image: 'images/hare.png' },
    1: { text: '晴れ', image: 'images/hare.png' },
    2: { text: '一部曇り', image: 'images/harekumori.png' },
    3: { text: '曇り', image: 'images/kumori.png' },
    61: { text: '小雨', image: 'images/umbrella.png' },
    63: { text: '雨', image: 'images/umbrella.png' },
    65: { text: '大雨', image: 'images/umbrella.png' },
};

// 天気情報を取得する関数
async function fetchWeather() {
    console.log('天気情報を取得中...');
    //読み込み中の表示
    iconElem.src = 'images/loading.png';

    // APIからデータを取得
    const response = await fetch(apiUrl);
    const data = await response.json();

    // コンソールでデータを確認
    console.log('取得したデータ:', data);
    console.log('現在の天気情報:', data.current_weather);
    console.log('気温:', data.current_weather.temperature);
    console.log('天気コード:', data.current_weather.weathercode);

    // データの取り出し
    const current = data.current_weather;
    const temp = current.temperature; // 気温
    const code = current.weathercode; // 天気コード

    // 登録がないコードは「不明」とする
    const weatherInfo = weatherCodes[code] || { text: '不明', image: 'images/question.png' };

    // 画面に表示
    iconElem.src = weatherInfo.image;
    iconElem.alt = weatherInfo.text;
    iconElem.textContent = weatherInfo.icon;
    textElem.textContent = weatherInfo.text;
    tempElem.textContent = `${temp}℃`;

}

// ボタンをクリックしたら実行
btn.addEventListener('click', fetchWeather);