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
  calculator.displayNumber += digit;
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

    inputDigit(target.innerHTML);
    updateDisplay();
  });
}
