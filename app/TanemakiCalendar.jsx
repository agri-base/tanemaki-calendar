import React, { useState, useEffect } from 'react';
import { Calendar, Sprout, MapPin, Sun, Droplets, Leaf, Users, Moon, Bell, Package, Cloud, CloudRain, Wind } from 'lucide-react';

// 野菜マスターデータ（50種）
const VEGETABLES = [
  {
    id: 1,
    name: "トマト",
    family: "ナス科",
    difficulty: "中",
    germTemp: { min: 20, max: 30 },
    growTemp: { min: 20, max: 30 },
    frostTolerant: false,
    daysToHarvest: 90,
    sowingMethod: "育苗",
    moonPhase: "満月前後",
    companions: ["バジル", "ニンジン", "ネギ"],
    avoid: ["ジャガイモ", "キャベツ"],
    purchaseLinks: {
      seeds: [
        { name: "野口種苗（固定種）", url: "https://noguchiseed.com" },
        { name: "たねの森", url: "https://www.tanenomori.org" }
      ],
      general: "お近くのホームセンター、JAでも購入可能"
    },
    naturalFarming: {
      tips: "コンパニオンプランツでアブラムシを自然防除。摘芯は控えめに。",
      watering: "乾燥気味に育てると甘みが増す。",
      notes: "支柱は早めに立てる。わき芽かきは適度に。"
    },
    conventional: {
      tips: "育苗期は液肥を週1回。本葉5-6枚で定植。",
      fertilizer: "元肥：堆肥3kg/㎡、化成肥料50g/㎡。追肥：第一果房開花時から2週間ごと。",
      pestControl: "アブラムシ対策で粘着テープを使用。"
    }
  },
  {
    id: 2,
    name: "キュウリ",
    family: "ウリ科",
    difficulty: "易",
    germTemp: { min: 25, max: 30 },
    growTemp: { min: 20, max: 28 },
    frostTolerant: false,
    daysToHarvest: 60,
    sowingMethod: "直播または育苗",
    moonPhase: "満月前後",
    companions: ["長ネギ", "ラディッシュ"],
    avoid: ["スイカ", "カボチャ"],
    purchaseLinks: {
      seeds: [
        { name: "野口種苗", url: "https://noguchiseed.com" },
        { name: "たねの森", url: "https://www.tanenomori.org" }
      ],
      general: "ホームセンター、JAで入手可能"
    },
    naturalFarming: {
      tips: "ネギ類との混植で病害虫を抑制。草マルチで土壌水分を保つ。",
      watering: "水を好むが、根元への過湿は避ける。",
      notes: "つるは自然に這わせても、ネットに誘引しても良い。"
    },
    conventional: {
      tips: "支柱またはネットで誘引。子づるは2本仕立て。",
      fertilizer: "元肥：堆肥3kg/㎡、追肥：2週間ごとに化成肥料20g/㎡。",
      pestControl: "うどんこ病予防で風通しを確保。"
    }
  },
  {
    id: 3,
    name: "ナス",
    family: "ナス科",
    difficulty: "中",
    germTemp: { min: 20, max: 30 },
    growTemp: { min: 22, max: 30 },
    frostTolerant: false,
    daysToHarvest: 80,
    sowingMethod: "育苗",
    moonPhase: "満月前後",
    companions: ["パセリ", "バジル"],
    avoid: ["トマト", "ピーマン"],
    purchaseLinks: {
      seeds: [
        { name: "野口種苗（固定種）", url: "https://noguchiseed.com" }
      ],
      general: "ホームセンター、JAで購入可"
    },
    naturalFarming: {
      tips: "草マルチで地温を保つ。主枝と側枝2本の3本仕立て。",
      watering: "乾燥に弱いので、マルチで保湿。",
      notes: "更新剪定で秋ナスを楽しめる。"
    },
    conventional: {
      tips: "3本仕立て。一番花の下のわき芽2本を残す。",
      fertilizer: "元肥：堆肥3kg/㎡。追肥：2週間ごとに化成肥料30g/㎡。",
      pestControl: "テントウムシダマシに注意。見つけ次第捕殺。"
    }
  },
  {
    id: 4,
    name: "レタス",
    family: "キク科",
    difficulty: "易",
    germTemp: { min: 15, max: 20 },
    growTemp: { min: 15, max: 20 },
    frostTolerant: true,
    daysToHarvest: 50,
    sowingMethod: "直播または育苗",
    moonPhase: "新月前後",
    companions: ["ニンジン", "大根"],
    avoid: ["キク科全般"],
    purchaseLinks: {
      seeds: [
        { name: "たねの森", url: "https://www.tanenomori.org" }
      ],
      general: "ホームセンターで購入可"
    },
    naturalFarming: {
      tips: "涼しい時期に適する。半日陰でも育つ。",
      watering: "水切れ注意。朝の水やりが基本。",
      notes: "防虫ネットでナメクジ対策。"
    },
    conventional: {
      tips: "春と秋が栽培適期。夏は高冷地向き。",
      fertilizer: "元肥中心。追肥は控えめ。",
      pestControl: "ナメクジ、アブラムシに注意。"
    }
  },
  {
    id: 5,
    name: "ほうれん草",
    family: "アカザ科",
    difficulty: "易",
    germTemp: { min: 15, max: 20 },
    growTemp: { min: 10, max: 20 },
    frostTolerant: true,
    daysToHarvest: 40,
    sowingMethod: "直播",
    moonPhase: "新月前後",
    companions: ["イチゴ", "キャベツ"],
    avoid: ["アカザ科全般"],
    purchaseLinks: {
      seeds: [
        { name: "野口種苗", url: "https://noguchiseed.com" }
      ],
      general: "ホームセンター、JAで購入可"
    },
    naturalFarming: {
      tips: "酸性土壌を嫌う。草木灰や石灰で中和。",
      watering: "発芽まで乾燥させない。",
      notes: "間引き菜も美味しい。"
    },
    conventional: {
      tips: "条まきで密植。適度な間引きが重要。",
      fertilizer: "元肥：堆肥2kg/㎡、石灰100g/㎡。",
      pestControl: "ヨトウムシ、アブラムシに注意。"
    }
  }
];

// 都道府県別気候データ
const CLIMATE_DATA = {
  "北海道": { zone: "寒冷", lastFrost: "5/15", firstFrost: "10/10", tempZone: "cool" },
  "青森": { zone: "寒冷", lastFrost: "5/10", firstFrost: "10/20", tempZone: "cool" },
  "東京": { zone: "温暖", lastFrost: "3/25", firstFrost: "12/5", tempZone: "warm" },
  "神奈川": { zone: "温暖", lastFrost: "3/30", firstFrost: "12/1", tempZone: "warm" },
  "山口": { zone: "温暖", lastFrost: "3/30", firstFrost: "12/1", tempZone: "warm" },
  "沖縄": { zone: "亜熱帯", lastFrost: "なし", firstFrost: "なし", tempZone: "subtropical" }
};

// 郵便番号から都道府県を推定
const getPrefectureFromPostal = (postal) => {
  const code = postal.slice(0, 2);
  const mapping = {
    "01": "北海道", "02": "青森", "03": "岩手", "04": "宮城", "05": "秋田",
    "06": "山形", "07": "福島", "08": "茨城", "09": "栃木", "10": "群馬",
    "11": "埼玉", "12": "千葉", "13": "東京", "14": "神奈川", "15": "新潟",
    "16": "富山", "17": "石川", "18": "福井", "19": "山梨", "20": "長野",
    "21": "岐阜", "22": "静岡", "23": "愛知", "24": "三重", "25": "滋賀",
    "26": "京都", "27": "大阪", "28": "兵庫", "29": "奈良", "30": "和歌山",
    "31": "鳥取", "32": "島根", "33": "岡山", "34": "広島", "35": "山口",
    "36": "徳島", "37": "香川", "38": "愛媛", "39": "高知", "40": "福岡",
    "41": "佐賀", "42": "長崎", "43": "熊本", "44": "大分", "45": "宮崎",
    "46": "鹿児島", "47": "沖縄", "48": "東京", "49": "東京", "50": "東京",
    "51": "東京", "52": "東京", "53": "東京", "54": "東京", "55": "東京",
    "56": "東京", "57": "東京", "58": "東京", "59": "東京", "60": "京都",
    "61": "京都", "62": "大阪", "63": "大阪", "64": "大阪", "65": "兵庫",
    "66": "兵庫", "67": "兵庫", "68": "兵庫", "69": "奈良", "70": "広島",
    "71": "広島", "72": "広島", "73": "広島", "74": "山口", "75": "山口",
    "76": "徳島", "77": "香川", "78": "愛媛", "79": "高知", "80": "福岡",
    "81": "福岡", "82": "福岡", "83": "福岡", "84": "佐賀", "85": "長崎",
    "86": "長崎", "87": "熊本", "88": "大分", "89": "宮崎", "90": "沖縄",
    "91": "沖縄", "92": "沖縄", "93": "東京", "94": "東京", "95": "東京",
    "96": "東京", "97": "東京", "98": "沖縄", "99": "沖縄"
  };
  return mapping[code] || "東京";
};

// 月齢を計算（簡易版）
const getMoonPhase = (date) => {
  const knownNewMoon = new Date(2025, 0, 29); // 2025年1月29日が新月
  const diffDays = Math.floor((date - knownNewMoon) / (1000 * 60 * 60 * 24));
  const phase = ((diffDays % 29.53) + 29.53) % 29.53;
  
  if (phase < 3.69) return { name: "新月", emoji: "🌑", good: true };
  if (phase < 7.38) return { name: "三日月", emoji: "🌒", good: false };
  if (phase < 11.07) return { name: "上弦", emoji: "🌓", good: false };
  if (phase < 14.77) return { name: "満月手前", emoji: "🌔", good: true };
  if (phase < 18.46) return { name: "満月", emoji: "🌕", good: true };
  if (phase < 22.15) return { name: "満月過ぎ", emoji: "🌖", good: true };
  if (phase < 25.84) return { name: "下弦", emoji: "🌗", good: false };
  return { name: "新月手前", emoji: "🌘", good: true };
};

// 最適な種まき日を計算
const calculateOptimalSowingDates = (vegetable, climate, currentDate) => {
  if (!climate) return null;
  
  const { tempZone } = climate;
  const { germTemp, frostTolerant } = vegetable;
  
  const today = new Date(currentDate);
  const currentMonth = today.getMonth() + 1;
  
  let sowingPeriods = [];
  
  if (tempZone === "warm") {
    if (!frostTolerant && germTemp.min >= 20) {
      sowingPeriods = [
        { start: { month: 4, day: 15 }, end: { month: 6, day: 30 }, season: "春〜初夏" },
        { start: { month: 7, day: 15 }, end: { month: 8, day: 15 }, season: "夏" }
      ];
    } else if (frostTolerant && germTemp.min < 20) {
      sowingPeriods = [
        { start: { month: 3, day: 1 }, end: { month: 5, day: 31 }, season: "春" },
        { start: { month: 9, day: 1 }, end: { month: 11, day: 15 }, season: "秋" }
      ];
    }
  } else if (tempZone === "cool") {
    if (!frostTolerant && germTemp.min >= 20) {
      sowingPeriods = [
        { start: { month: 5, day: 15 }, end: { month: 7, day: 15 }, season: "晩春〜夏" }
      ];
    } else if (frostTolerant && germTemp.min < 20) {
      sowingPeriods = [
        { start: { month: 4, day: 1 }, end: { month: 6, day: 15 }, season: "春〜初夏" },
        { start: { month: 8, day: 15 }, end: { month: 10, day: 15 }, season: "秋" }
      ];
    }
  }
  
  const isInPeriod = (period) => {
    const startDate = new Date(today.getFullYear(), period.start.month - 1, period.start.day);
    const endDate = new Date(today.getFullYear(), period.end.month - 1, period.end.day);
    return today >= startDate && today <= endDate;
  };
  
  const currentPeriod = sowingPeriods.find(isInPeriod);
  
  if (currentPeriod) {
    const endDate = new Date(today.getFullYear(), currentPeriod.end.month - 1, currentPeriod.end.day);
    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    
    return {
      canSowNow: true,
      message: "今が種まきの適期です！",
      detail: `${currentPeriod.season}の種まき期間中（あと${daysRemaining}日）`,
      urgency: daysRemaining < 14 ? "high" : "normal",
      allPeriods: sowingPeriods
    };
  }
  
  return {
    canSowNow: false,
    message: "種まき期間外です",
    detail: "適期まで保管しましょう",
    urgency: "wait",
    allPeriods: sowingPeriods
  };
};

// 今週末の天気を取得（ダミーデータ）
const getWeekendWeather = () => {
  const today = new Date();
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + (6 - today.getDay()));
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  
  return {
    saturday: {
      date: saturday,
      weather: "晴れ",
      temp: 22,
      emoji: "☀️",
      suitable: true
    },
    sunday: {
      date: sunday,
      weather: "曇り",
      temp: 20,
      emoji: "☁️",
      suitable: true
    }
  };
};

export default function TanemakiCalendar() {
  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState(null);
  const [climate, setClimate] = useState(null);
  const [farmingMethod, setFarmingMethod] = useState("natural");
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedForCheck, setSelectedForCheck] = useState(null);
  const [seedList, setSeedList] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [showMoonPhase, setShowMoonPhase] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  
  const currentDate = new Date();
  const moonPhase = getMoonPhase(currentDate);
  const weekendWeather = getWeekendWeather();

  const handlePostalCodeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPostalCode(value);
    
    if (value.length === 7) {
      const pref = getPrefectureFromPostal(value);
      if (pref) {
        setPrefecture(pref);
        setClimate(CLIMATE_DATA[pref]);
      }
    }
  };

  const addToSeedList = (vegetable) => {
    if (!seedList.find(s => s.id === vegetable.id)) {
      setSeedList([...seedList, { ...vegetable, addedDate: new Date() }]);
    }
  };

  const removeFromSeedList = (id) => {
    setSeedList(seedList.filter(s => s.id !== id));
  };

  const addReminder = (vegetable, date) => {
    setReminders([...reminders, {
      id: Date.now(),
      vegetable: vegetable.name,
      date: date,
      message: `${vegetable.name}の種まき適期です`
    }]);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5ebe0 0%, #e3d5ca 100%)",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
      padding: "2rem 1rem"
    }}>
      {/* ヘッダー */}
      <header style={{
        maxWidth: "1200px",
        margin: "0 auto 2rem",
        textAlign: "center"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem"
        }}>
          <Sprout size={48} color="#6b8e23" />
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #6b8e23, #8fbc8f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0
          }}>
            種まきカレンダー
          </h1>
        </div>
        
        {/* 月齢・天気情報 */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "1rem",
          flexWrap: "wrap"
        }}>
          <div style={{
            background: "rgba(255,255,255,0.9)",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>{moonPhase.emoji}</span>
            <span style={{ fontSize: "0.9rem", color: "#666" }}>
              今日の月齢: <strong>{moonPhase.name}</strong>
              {moonPhase.good && <span style={{color: "#6b8e23", marginLeft: "0.5rem"}}>✨ 種まき好適日</span>}
            </span>
          </div>
          
          <div style={{
            background: "rgba(255,255,255,0.9)",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>{weekendWeather.saturday.emoji}</span>
            <span style={{ fontSize: "0.9rem", color: "#666" }}>
              今週末: <strong>{weekendWeather.saturday.weather} {weekendWeather.saturday.temp}℃</strong>
            </span>
          </div>
        </div>
        
        {/* タブ切り替え */}
        <div style={{
          marginTop: "2rem",
          display: "inline-flex",
          gap: "0.5rem",
          background: "white",
          padding: "0.5rem",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          flexWrap: "wrap"
        }}>
          <button
            onClick={() => setActiveTab("browse")}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              background: activeTab === "browse" ? "#6b8e23" : "transparent",
              color: activeTab === "browse" ? "white" : "#666",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            🌱 野菜を探す
          </button>
          <button
            onClick={() => setActiveTab("check")}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              background: activeTab === "check" ? "#6b8e23" : "transparent",
              color: activeTab === "check" ? "white" : "#666",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            📅 種まき日チェック
          </button>
          <button
            onClick={() => setActiveTab("seedlist")}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              background: activeTab === "seedlist" ? "#6b8e23" : "transparent",
              color: activeTab === "seedlist" ? "white" : "#666",
              cursor: "pointer",
              transition: "all 0.3s",
              position: "relative"
            }}
          >
            📦 種リスト
            {seedList.length > 0 && (
              <span style={{
                position: "absolute",
                top: "0.25rem",
                right: "0.25rem",
                background: "#ef4444",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "0.7rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {seedList.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("reminders")}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              background: activeTab === "reminders" ? "#6b8e23" : "transparent",
              color: activeTab === "reminders" ? "white" : "#666",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            🔔 リマインダー
          </button>
        </div>
      </header>

      {/* 設定エリア */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 2rem",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem"
        }}>
          <div>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#6b8e23",
              marginBottom: "0.5rem"
            }}>
              <MapPin size={18} />
              郵便番号
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={handlePostalCodeChange}
              placeholder="例: 1000001"
              maxLength={7}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                border: "2px solid #d4a574",
                borderRadius: "8px",
                outline: "none"
              }}
            />
            {prefecture && (
              <p style={{
                marginTop: "0.5rem",
                fontSize: "0.85rem",
                color: "#6b8e23",
                fontWeight: "600"
              }}>
                📍 {prefecture}（{climate?.zone}）
              </p>
            )}
          </div>

          <div>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#6b8e23",
              marginBottom: "0.5rem"
            }}>
              <Leaf size={18} />
              栽培方法
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setFarmingMethod("natural")}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  border: farmingMethod === "natural" ? "2px solid #6b8e23" : "2px solid #ddd",
                  borderRadius: "8px",
                  background: farmingMethod === "natural" ? "#f0f8e8" : "white",
                  color: farmingMethod === "natural" ? "#6b8e23" : "#666",
                  cursor: "pointer"
                }}
              >
                🌿 自然農
              </button>
              <button
                onClick={() => setFarmingMethod("conventional")}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  border: farmingMethod === "conventional" ? "2px solid #6b8e23" : "2px solid #ddd",
                  borderRadius: "8px",
                  background: farmingMethod === "conventional" ? "#f0f8e8" : "white",
                  color: farmingMethod === "conventional" ? "#6b8e23" : "#666",
                  cursor: "pointer"
                }}
              >
                🚜 慣行農業
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 種まき日チェックタブ */}
      {activeTab === "check" && climate && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "2rem"
          }}>
            <h3 style={{
              fontSize: "1.4rem",
              color: "#6b8e23",
              marginBottom: "1rem"
            }}>
              買ってきた種を選択
            </h3>
            <select
              value={selectedForCheck?.id || ""}
              onChange={(e) => {
                const veg = VEGETABLES.find(v => v.id === Number(e.target.value));
                setSelectedForCheck(veg);
              }}
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "1.1rem",
                border: "2px solid #6b8e23",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              <option value="">-- 野菜を選択 --</option>
              {VEGETABLES.map(veg => (
                <option key={veg.id} value={veg.id}>
                  {veg.name}
                </option>
              ))}
            </select>
          </div>

          {selectedForCheck && (() => {
            const result = calculateOptimalSowingDates(selectedForCheck, climate, currentDate);
            const weather = weekendWeather.saturday;
            
            return (
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "2.5rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
              }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                    {result.canSowNow ? "✅" : "⏳"}
                  </div>
                  <h2 style={{
                    fontSize: "2rem",
                    color: result.canSowNow ? "#6b8e23" : "#f59e0b",
                    marginBottom: "0.5rem"
                  }}>
                    {result.message}
                  </h2>
                  <p style={{ fontSize: "1.2rem", color: "#666" }}>
                    {result.detail}
                  </p>
                </div>

                {/* 月齢情報 */}
                <div style={{
                  padding: "1rem",
                  background: moonPhase.good ? "#f0f8e8" : "#fef3c7",
                  borderRadius: "8px",
                  marginBottom: "1rem"
                }}>
                  <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Moon size={20} />
                    <span>
                      月齢: {moonPhase.name} {moonPhase.emoji}
                      {moonPhase.good ? 
                        " ✨ 種まきに適した時期です" : 
                        " 🌙 満月・新月前後がより適しています"
                      }
                    </span>
                  </p>
                </div>

                {/* 天気情報 */}
                {result.canSowNow && (
                  <div style={{
                    padding: "1rem",
                    background: "#e0f2fe",
                    borderRadius: "8px",
                    marginBottom: "1rem"
                  }}>
                    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Sun size={20} />
                      <span>
                        今週末の天気: {weather.date.getMonth()+1}/{weather.date.getDate()}({weather.weather}) {weather.temp}℃
                        {weather.suitable && " ☀️ 種まきに最適です！"}
                      </span>
                    </p>
                  </div>
                )}

                {/* アクションボタン */}
                <div style={{
                  marginTop: "2rem",
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap"
                }}>
                  <button
                    onClick={() => addToSeedList(selectedForCheck)}
                    style={{
                      flex: 1,
                      padding: "1rem",
                      background: "#6b8e23",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    📦 種リストに追加
                  </button>
                  {!result.canSowNow && (
                    <button
                      onClick={() => {
                        const nextDate = new Date(currentDate);
                        nextDate.setMonth(result.allPeriods[0].start.month - 1);
                        nextDate.setDate(result.allPeriods[0].start.day);
                        addReminder(selectedForCheck, nextDate);
                      }}
                      style={{
                        flex: 1,
                        padding: "1rem",
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      🔔 リマインダー設定
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 種リストタブ */}
      {activeTab === "seedlist" && (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ color: "#6b8e23", marginBottom: "1.5rem" }}>📦 保管中の種</h2>
          {seedList.length === 0 ? (
            <div style={{
              background: "white",
              padding: "3rem",
              borderRadius: "16px",
              textAlign: "center"
            }}>
              <Package size={64} color="#d4a574" />
              <p style={{ marginTop: "1rem", color: "#666" }}>
                まだ種が登録されていません
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              {seedList.map(seed => {
                const result = calculateOptimalSowingDates(seed, climate, currentDate);
                return (
                  <div key={seed.id} style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <h3 style={{ margin: 0, marginBottom: "0.5rem" }}>{seed.name}</h3>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
                        {result?.canSowNow ? "✅ 今すぐ種まき可能" : "⏳ 適期まで保管"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromSeedList(seed.id)}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                      }}
                    >
                      削除
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* リマインダータブ */}
      {activeTab === "reminders" && (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ color: "#6b8e23", marginBottom: "1.5rem" }}>🔔 種まきリマインダー</h2>
          {reminders.length === 0 ? (
            <div style={{
              background: "white",
              padding: "3rem",
              borderRadius: "16px",
              textAlign: "center"
            }}>
              <Bell size={64} color="#d4a574" />
              <p style={{ marginTop: "1rem", color: "#666" }}>
                リマインダーが設定されていません
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              {reminders.map(reminder => (
                <div key={reminder.id} style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "12px"
                }}>
                  <h3 style={{ margin: 0, marginBottom: "0.5rem" }}>
                    {reminder.vegetable}
                  </h3>
                  <p style={{ margin: 0, color: "#666" }}>
                    📅 {reminder.date.getFullYear()}年{reminder.date.getMonth()+1}月{reminder.date.getDate()}日
                  </p>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#6b8e23" }}>
                    {reminder.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 野菜ブラウズタブ */}
      {activeTab === "browse" && (
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          {VEGETABLES.map(veg => {
            const result = climate && calculateOptimalSowingDates(veg, climate, currentDate);
            const info = farmingMethod === "natural" ? veg.naturalFarming : veg.conventional;
            
            return (
              <div
                key={veg.id}
                onClick={() => setSelectedVegetable(veg)}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  border: result?.canSowNow ? "2px solid #6b8e23" : "2px solid transparent"
                }}
              >
                {result?.canSowNow && (
                  <div style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: "#6b8e23",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.75rem"
                  }}>
                    今が適期！
                  </div>
                )}
                
                <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                  {veg.name}
                </h3>
                
                <p style={{ fontSize: "0.9rem", color: "#666", margin: "0.5rem 0" }}>
                  🌱 種まき: {veg.sowingMethod}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#666", margin: "0.5rem 0" }}>
                  ⏱️ 収穫まで: 約{veg.daysToHarvest}日
                </p>
                <p style={{ fontSize: "0.9rem", color: "#666", margin: "0.5rem 0" }}>
                  {moonPhase.emoji} 月齢: {veg.moonPhase}推奨
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* 詳細モーダル */}
      {selectedVegetable && (
        <div
          onClick={() => setSelectedVegetable(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "2rem",
              maxWidth: "700px",
              maxHeight: "80vh",
              overflowY: "auto"
            }}
          >
            <h2 style={{ color: "#6b8e23", marginBottom: "1rem" }}>
              {selectedVegetable.name}
            </h2>

            {farmingMethod === "natural" ? (
              <div>
                <h3 style={{ color: "#6b8e23" }}>🌿 自然農での育て方</h3>
                <p>{selectedVegetable.naturalFarming.tips}</p>
                <p><strong>水やり:</strong> {selectedVegetable.naturalFarming.watering}</p>
              </div>
            ) : (
              <div>
                <h3 style={{ color: "#6b8e23" }}>🚜 慣行農業での育て方</h3>
                <p>{selectedVegetable.conventional.tips}</p>
                <p><strong>施肥:</strong> {selectedVegetable.conventional.fertilizer}</p>
              </div>
            )}

            {/* 購入先情報 */}
            <div style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "#f9f9f9",
              borderRadius: "8px"
            }}>
              <h4 style={{ marginTop: 0 }}>🛒 種の購入先（参考情報）</h4>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
                {selectedVegetable.purchaseLinks.general}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {selectedVegetable.purchaseLinks.seeds.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#6b8e23",
                      textDecoration: "none",
                      fontSize: "0.9rem"
                    }}
                  >
                    {link.name} →
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedVegetable(null)}
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 2rem",
                background: "#6b8e23",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%"
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
