import React, {useState, useEffect} from "react";
import Layout from "../components/Layout";
import Switch from '@mui/material/Switch';

export default function App() {
  const [headItem, setHeadItem] = useState('2桁')
  const [range, setRange] = useState({max: 100, min: 10})
  const [random, setRandom] = useState({left:'', right:''});
  const [checked, setChecked] = useState(false);
  const [ text, setText ] = useState("");
  
  // 正解か不正解かの判定
  let isCorrect = null;
  if (random.left * random.right === Number(text)) {
    isCorrect = true;
  } else {
    isCorrect = false;
  }

  // 解答欄
  const onChangeText = (event) => {
    setText(event.target.value);
  };

  // 「次」ボタンを押した時の処理
  const handleRanddomChange = () =>{
    setRandom({
      left: Math.floor( Math.random() * range.max - range.min ) + range.min,
      right: Math.floor( Math.random() * range.max - range.min ) + range.min
    });
    setText('');
  };

  // 桁数を変更した時の処理
  const handleDigitChange = (event) => {
    setChecked(event.target.checked);
    setText('');
    if (!checked) {
      setRange({max: 1000, min: 100});
      setRandom({
        left: Math.floor( Math.random() * 1000 - 100 ) + 100,
        right: Math.floor( Math.random() * 1000 - 100 ) + 100
      });
      setHeadItem('3桁');
    } else {
      setRange({max: 100, min: 10});
      setRandom({
        left: Math.floor( Math.random() * 100 - 10 ) + 10,
        right: Math.floor( Math.random() * 100 - 10 ) + 10
      });
      setHeadItem('2桁');
    }
  };

  // SSRとクライアントで乱数が違う値になることを防ぐための処理
  useEffect(() => {
    setRandom({
      left: Math.floor( Math.random() * 100 - 10 ) + 10,
      right: Math.floor( Math.random() * 100 - 10 ) + 10
    })
  }, [])
  
  if (!random) {
    return null
  }
  return (
    <Layout title={headItem + "｜暗算練習アプリ"}>
      
      {/* 正解か不正解かの判定 */}
      {text &&
          (isCorrect ?
            <div className="text-2xl text-red-500 mb-8">正解！！</div>
            :
            <div className="text-2xl text-blue-500 mb-8">不正解！！</div>
          )
      }

      {/* 式と解答欄 */}
      <div className="text-2xl sm:text-4xl md:text-6xl text-gray-700 mb-20">
        {random.left} × {random.right} =
        <input
          className="shadow border border-gray-600 rounded ml-6 w-16 sm:w-24 md:w-40"
          type={"text"}
          value={text}
          onChange={onChangeText}
        />
      </div>

      {/* 「次」ボタン */}
      <div className="flex items-center justify-center text-gray-500 text-xl  mb-10
                      bg-yellow-300 hover:bg-yellow-500 rounded-full h-16 w-16"
           onClick={handleRanddomChange}>次</div>

      {/* 桁数の変更 */}
      <div>3桁の掛け算に変更</div>
      <Switch
        checked={checked}
        onChange={handleDigitChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />

    </Layout>
  );
};
