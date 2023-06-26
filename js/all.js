// // V4
// const infoBox = document.querySelector('.infoBox');
// let SN = document.querySelector("#SN");
// let Num = document.querySelector("#Num");
// let reader = null; // 儲存 NDEFReader 物件

// // 新增文字資訊框調用
// function addText(event, className) {
//   const newDiv = document.createElement('div');
//   newDiv.className = 'text ' + className;
//   newDiv.textContent = event;
//   infoBox.appendChild(newDiv);
// }

// async function startNfcScan() {
//   console.log("掃描按鈕觸發"); // 輸出訊息，表示使用者按下了掃描按鈕
//   addText(' >>> 掃描按鈕觸發 <<<', 'red center');

//   if ('NDEFReader' in window) {
//     // 取得狀態元素
//     const statusElement = document.getElementById('status');

//     // 移除已有的讀取事件監聽器
//     if (reader !== null) {
//       reader.removeEventListener('reading', handleNfcReading);
//     }

//     // 建立 NDEFReader 物件
//     reader = new NDEFReader();

//     // 定義讀取事件的處理函數
//     function handleNfcReading(event) {
//       // 取得訊息中的記錄
//       const records = event.message.records;

//       // 迭代處理每個記錄
//       for (const record of records) {
//         console.log(record.data);
//         addText(record.data);
//       }

//       // 顯示序號
//       const serialNumber = event.serialNumber;
//       console.log(`> 序號: ${serialNumber}`); // 輸出訊息，顯示序列號
//       addText(`> 序號: ${serialNumber}`, 'bold');
//       SN.value = serialNumber;

//       // 顯示記錄數量
//       const numberOfRecords = event.message.records.length;
//       console.log(`> 記錄: (${numberOfRecords})`); // 輸出訊息，顯示記錄數量
//       addText(`> 記錄: (${numberOfRecords})`, 'bold');
//       Num.value = numberOfRecords;
//     }

//     // 監聽 'reading' 事件
//     reader.addEventListener('reading', handleNfcReading);

//     // 在掃描開始前更新狀態元素為「掃描中」
//     statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> NFC 狀態：掃描中';

//     try {
//       await reader.scan();

//       // 掃描完成後更新狀態元素為「已讀取」
//       statusElement.innerHTML = '<i class="fas fa-check green"></i> NFC 狀態：已讀取';
//     } catch (error) {
//       console.error('掃描 NFC 錯誤: ', error);
//       addText(`掃描 NFC 錯誤: (${error})`, 'bold');
//       // 若發生錯誤，更新狀態元素為「掃描失敗」
//       statusElement.innerHTML = '<i class="fas fa-times red"></i> NFC 狀態：掃描失敗';
//     }
//   } else {
//     // 若瀏覽器不支援 Web NFC API，輸出錯誤訊息並更新狀態元素內容為「NFC 功能不支援」
//     console.error('此瀏覽器不支持 NFC。');
//     addText('此瀏覽器不支持 NFC。', 'red center');

//     document.getElementById('status').innerHTML = '<i class="fas fa-times red"></i> NFC 功能不支援';
//   }

//   addText('', 'bt');
// }



// V5
const infoBox = document.querySelector('.infoBox');
let SN = document.querySelector("#SN");
let Num = document.querySelector("#Num");
let reader = null; // 儲存 NDEFReader 物件


// 新增文字資訊框調用
function addText(event, className) {
  const newDiv = document.createElement('div');
  newDiv.className = 'text ' + className;
  newDiv.textContent = event;
  infoBox.appendChild(newDiv);
}

function startNfcScan() {
  if ('NDEFReader' in window) {
    const statusElement = document.getElementById('status');
    statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 請掃描 NFC'; // 初始狀態：請掃描 NFC，並加上旋轉的 Spinner 圖示

    SN.value = ''; // 清空序號框的值
    Num.value = ''; // 清空資料框的值

    // 建立 NDEFReader 物件
    const reader = new NDEFReader();

    reader.addEventListener('reading', event => {
      // 取得訊息中的記錄
      const records = event.message.records;

      // 迭代處理每個記錄
      for (const record of records) {
	      console.log(record);
        console.log(record.data);
        addText(`資料: ${record.data==null?'資料不存在或格式錯誤':record.data}`);

      }

      // 顯示序號
      const serialNumber = event.serialNumber;
      console.log(`> 序號: ${serialNumber}`); // 輸出訊息，顯示序列號
      addText(`> 序號: ${serialNumber}`, 'bold');
      SN.value = serialNumber;

      // 顯示記錄數量
      const numberOfRecords = event.message.records.length;
      console.log(`> 記錄: (${numberOfRecords})`); // 輸出訊息，顯示記錄數量
      addText(`> 記錄: (${numberOfRecords})`, 'bold');
      Num.value = numberOfRecords;

      statusElement.innerHTML = '<i class="fas fa-check"></i> NFC 狀態：已讀取'; // 讀取完成後的狀態：已讀取
    });

    reader.scan().catch(error => {
      console.error('掃描 NFC 錯誤: ', error);
      addText(`掃描 NFC 錯誤: (${error})`, 'bold');
      statusElement.innerHTML = '<i class="fas fa-times red"></i> 無法掃描 NFC'; // NFC 功能未啟用的狀態
    });
    
  } else {
    // 若瀏覽器不支援 Web NFC API，輸出錯誤訊息並更新狀態元素內容為「NFC 功能不支援」
    console.error('此瀏覽器不支持 NFC。');
    addText('此瀏覽器不支持 NFC。', 'red center');
    document.getElementById('status').innerHTML = '<i class="fas fa-times red"></i> NFC 功能不支援';
  }

  addText('', 'bt');
}
