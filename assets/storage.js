/**
 *  variabel CACHE_KEY digunakan sebagai key untuk mengakses dan menyimpan data pada localStorage
 */
const CACHE_KEY = "calculation_history";

/**
 *  function checkStorage akan digunakan di dalam if statement setiap fungsi transaksi pada localStorage
 */
function checkStorage() {
  return typeof Storage !== "undefined";
}

/**
 * function putHistoryData(data) untuk menyimpan data riwayat kalkulasi.
 * argument data dipakai untuk hasil kalkulasi yang nantinya akan dimasukan ke dalam localStorage
 */
function putHistory(data) {
  if (checkStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      /**
       *  JSON.parse digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek Javascript
       */
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    /**
     *  unshift() digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index
     *  function ini juga mengembalikan nilai panjang array yang telah ditambahkan dengan nilai baru
     */
    historyData.unshift(data);

    if (historyData.length > 5) {
      /**
       *  pop() digunakan untuk menghapus nilai index terakhir pada array, sehingga ukuran array historyData
       *  tidak akan pernah lebih dari 5
       */
      historyData.pop();
    }

    /**
     *  JSON.stringify digunakan untuk mengubah objek Javascript ke dalam bentuk String.
     *  karena localStorage hanya dapat menyimpan data primitif
     */
    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

/**
 *  function showHistory digunakan untuk mendapatkan data dari localStorage.
 *  function ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse().
 *  namun jika localStorage masih kosong, function ini akan mengembalikan nilai array kosong
 */
function showHistory() {
  if (checkStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

/**
 *  function renderHistory() digunakan untuk merender data riwayat kalkulasi pada halaman HTML
 */
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  // selalu hapus konter HTML pada elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
  }
}

renderHistory();
