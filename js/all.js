// V5
const infoBox = document.querySelector('.infoBox');
let SN = document.querySelector('#SN');
let Num = document.querySelector('#Num');
let btn = document.getElementById('#scanButton');
let reader = null; // 儲存 NDEFReader 物件


// 新增文字資訊框調用
function addText(event, className) {
  const newDiv = document.createElement('div');
  newDiv.className = 'text ' + className;
  newDiv.textContent = event;
  infoBox.appendChild(newDiv);
}

function startNfcScan() {
	console.log("掃描按鈕觸發"); // 輸出訊息，表示使用者按下了掃描按鈕
	addText(' >>> 掃描按鈕觸發 <<<', 'red center');
	
	if ('NDEFReader' in window) {
		const statusElement = document.getElementById('status');
		statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 請掃描 NFC'; // 初始狀態：請掃描 NFC，並加上旋轉的 Spinner 圖示

		SN.value = ''; // 清空序號框的值
		Num.value = ''; // 清空資料框的值

		// 移除已有的讀取事件監聽器
		if (reader !== null) {
		reader.removeEventListener('reading', handleNfcReading);
		}

		// 建立 NDEFReader 物件
		reader = new NDEFReader();

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

		statusElement.innerHTML = '<i class="fas fa-check green"></i> NFC 狀態：已讀取'; // 讀取完成後的狀態：已讀取

		// 倒數顯示回請掃描
		setTimeout(() => {
			statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 請掃描 NFC';
		}, 1000);
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

// 複製相對應的input值

function copyValue(inputId) {
	let input = document.getElementById(inputId);
	if (input.value.trim() !== '') {
	  input.select();
	  input.setSelectionRange(0, 99999);
	  document.execCommand('copy');
	  addText(`已複製:  ${input.value}`,'green');
	}
  }