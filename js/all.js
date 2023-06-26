const infoBox = document.querySelector('.infoBox');

// 新增文字資訊框調用
function addText(event, className) {
	const newDiv = document.createElement('div');
	newDiv.className = 'text ' + className;
	newDiv.textContent = event;
	infoBox.appendChild(newDiv);
  }

function startNfcScan() {

	console.log("掃描按鈕觸發"); // 輸出訊息，表示使用者按下了掃描按鈕
	addText(' >>> 掃描按鈕觸發 <<<','red center');

	if ('NDEFReader' in window) {
	  // 取得狀態元素
	  const statusElement = document.getElementById('status');
  
	  // 建立 NDEFReader 物件
	  const reader = new NDEFReader();
  
	  // 監聽 'reading' 事件
	  reader.addEventListener('reading', event => {
		// 取得訊息中的記錄
		const records = event.message.records;
  
		// 迭代處理每個記錄
		for (const record of records) {
		  console.log(record.data);
		  addText(record.data);
		}
  
		// 更新狀態元素內容為「NFC 狀態：已讀取」
		statusElement.innerHTML = '<i class="fas fa-check green"></i> NFC 狀態：已讀取';

		// 顯示序號
		const serialNumber = event.serialNumber;
		console.log(`> 序號: ${serialNumber}`); // 輸出訊息，顯示序列號
		addText(`> 序號: ${serialNumber}`,'bold');

		// 顯示記錄數量
		const numberOfRecords = event.message.records.length;
		console.log(`> 記錄: (${numberOfRecords})`); // 輸出訊息，顯示記錄數量
		addText(`> 記錄: (${numberOfRecords})`,'bold');
	  });

	// 在掃描開始前更新狀態元素為「掃描中」
	statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> NFC 狀態：掃描中';

	reader.scan().then(() => {
		// 掃描完成後更新狀態元素為「已讀取」
		statusElement.innerHTML = '<i class="fas fa-check green"></i> NFC 狀態：已讀取';
	}).catch(error => {
		console.error('掃描 NFC 錯誤: ', error);
		addText(`掃描 NFC 錯誤: (${error})`,'bold');
		// 若發生錯誤，更新狀態元素為「掃描失敗」
		statusElement.innerHTML = '<i class="fas fa-times red"></i> NFC 狀態：掃描失敗';
	});
  
	  // 開始掃描 NFC
	  reader.scan().catch(error => {
		console.error('掃描 NFC 錯誤: ', error);
		addText(`掃描 NFC 錯誤: (${error})`,'bold');
	  });
	} else {
	  // 若瀏覽器不支援 Web NFC API，輸出錯誤訊息並更新狀態元素內容為「NFC 功能不支援」
	  console.error('此瀏覽器不支持 NFC。');
	  addText('此瀏覽器不支持 NFC。','red center');

	  document.getElementById('status').innerHTML = '<i class="fas fa-times red"></i> NFC 功能不支援';
	}

	addText('','bt');

  }

  

// // 檢查瀏覽器是否支援NFC功能
// 	if (!("NDEFReader" in window)) {
// 		console.log("瀏覽器不支援NFC功能"); // 輸出訊息，表示瀏覽器不支援NFC功能
// 		scanButton.disabled = true; // 禁用掃描按鈕

// }

// // 監聽掃描按鈕的點擊事件
// scanButton.addEventListener("click", async () => {
// 	console.log("使用者按下了掃描按鈕"); // 輸出訊息，表示使用者按下了掃描按鈕

  
// 	try {
// 	  const ndef = new NDEFReader(); // 創建 NDEFReader 物件
// 	  await ndef.scan(); // 開始掃描NFC標籤
// 	  console.log("> 掃描已開始"); // 輸出訊息，表示掃描已開始
  
// 	  // 監聽讀取錯誤事件
// 	  ndef.addEventListener("readingerror", () => {
// 		console.log("無法從NFC標籤讀取數據，請嘗試另一個標籤"); // 輸出訊息，表示無法從NFC標籤讀取數據，建議使用者嘗試另一個標籤
// 	  });
  
// 	  // 監聽讀取事件
// 	  ndef.addEventListener("reading", ({ message, serialNumber }) => {
// 		console.log(`> 序號: ${serialNumber}`); // 輸出訊息，顯示序列號
// 		console.log(`> 記錄: (${message.records.length})`); // 輸出訊息，顯示記錄數量
// 	  });
// 	} catch (error) {
// 		console.log("錯誤! " + error); // 輸出錯誤訊息
// 	}
//   });


