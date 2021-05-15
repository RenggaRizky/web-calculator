/**
 *  Objek calculator digunakan untuk tempat menyimpan data
 *  calculator.displayNumber = tempat munculnya angka pada layar kalkulator
 *
 */

let calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

/**
 *  function updateDisplay = untuk mengupdate angka pada layar
 */
const updateDisplay = () => {
  document.querySelector("#displayNumber").innerHTML = calculator.displayNumber;
};

/**
 *  function clear Calculator = untuk menghapus data pada kalkulator
 */
const clearCalculator = () => {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
};

/**
 *  function inputDigit = untuj memasukan angka ke dalam nilai displayNumber
 */
const inputDigit = (digit) => {
  /**
   *  jika displayNumber bernilai 0, maka angka yang pertama dimasukan akan menggantikan keseluruhan nilai displayNumber
   *  jika tidak, maka lakukan seperti biasa (angka yang dimasukan akan muncul setelahnya)
   */
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
};

/**
 *  bilangan negatif, jika displayNumber bernilai 0 maka tidak terjadi perkalian
 *  jika tidak maka nilai displayNUmber * -1
 */
const inverseNumber = () => {
  if (calculator.displayNumber === "0") {
    return;
  }

  calculator.displayNumber = calculator.displayNumber * -1;
};

/**
 *   Fungsi ini membutuhkan satu argument yang merupakan sebuah operator
 *   Nilai operator bersumber dari innerText tombol operator yang menjadi event target.
 *
 *   Secara prinsip, fungsi ini bertujuan untuk menyimpan operator dan firstNumber dengan nilai displayNumber
 *   saat ini pada object calculator, hanya jika properti waitingForSecondNumber bernilai false
 *
 *   Namun jika waitingForSecondNumber bernilai true. browser akan menampilkan alert()
 */

const handleOperator = (operator) => {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    //mengatur ulang nilai displayNumber agar tombol selanjutnya dimulai dari angka pertama lagi
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
};

/**
 *  Fungsi akan melakukan pengecekan nilai - nilai yang dibutuhkan, tapi jika tidak terpenuhi akan distop
 *
 *  lalu saat melakukan kalkulasi terdapat pengecekan tipe operator apa yang akan dilakukan.
 *  parseInt() digunakan untuk mengubah String menjadi number.
 *
 */
const performCalculation = () => {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  calculator.displayNumber = result;
};

/**
 *  Buat variabel buttons dengan menginisialisasikan seluruh elemen button yang ada
 *  lalu berikan event click pada tiap elemenya
 *
 *  Untuk mendapatkan nilai seluruh elemen button, maka gunakan querySelectorAll(".button")
 *  kemudian lakukan perulangan nilainya dan berikan event click ke setiap element tersebut
 */
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    //mendapatkan objek elemen yang diklik
    const target = event.target;

    /**
     *  Pada event handler. tambahkan kondisi dimana ketika event target merupukana elemen dengan class clear
     *  maka kita akan panggil fungsi clearCalculator
     *
     *  fungsi event.classList untuk melihat nilai class apa saja dalam bentuk array yang ada pada element target,
     *  kemudian menggunakan contains() yang merupakan method dari array yang berguna untuk memastikan nilai yang terkandung di dalam array tersebut
     *
     *  gunakan return statement agar fungsi event handler terhenti sehingga kode yang dibawahnya tidak terkesekusi
     */
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerHTML);
    updateDisplay();
  });
}
