let currencyRatio = {
    USD:{
        KRW: 1286.65,
        USD: 1,
        JPY: 141.80,
        unit:'달러'
    },
    KRW:{
        KRW: 1,
        USD: 0.00078,
        JPY: 0.11,
        unit:'원'
    },
    JPY:{
        KRW: 9.07,
        USD: 0.0071,
        JPY: 1,
        unit:'엔'
    }
}

let fromCurrency = 'USD'
let toCurrency = 'USD'

console.log(currencyRatio.USD.unit)

//메뉴에서 클릭한 요소의 텍스트 값을 가져와 메뉴에 띄워주기
document.querySelectorAll("#from-currency-list a").forEach((menu) => menu.addEventListener("click",function(){
    document.getElementById("from-button").textContent = this.textContent;
    fromCurrency = this.textContent;
    console.log("from c = " + fromCurrency);
    document.querySelector(".unit-box1 .unit1").textContent = currencyRatio[fromCurrency].unit;
    convert1()
 
}))

//메뉴에서 클릭한 요소의 텍스트 값을 가져와 메뉴에 띄워주기
document.querySelectorAll("#to-currency-list a").forEach((menu) => menu.addEventListener("click",function(){
    document.getElementById("to-button").textContent = this.textContent;
    toCurrency = this.textContent;
    console.log("to c = " + toCurrency);
    document.querySelector(".unit-box2 .unit2").textContent = currencyRatio[toCurrency].unit;
    convert2()
    
}))


function convert1(){
    // console.log("키업 이벤트 실행");

    //인풋박스에 입력한 숫자 값을 amount로 저장해준다.
    let amount1 = document.getElementById("from-input").value;
    // console.log("돈은" + amount);
    let convertedAmount1 = amount1 * currencyRatio[fromCurrency][toCurrency];
    // console.log("환전결과" + convertedAmount)
    document.getElementById("to-input").value = convertedAmount1;
    totalNum1();
    totalNum2();
}

function convert2(){
    // console.log("키업 이벤트 실행");

    //인풋박스에 입력한 숫자 값을 amount로 저장해준다.
    let amount2 = document.getElementById("to-input").value;
    // console.log("돈은" + amount);
    let convertedAmount2 = amount2 * currencyRatio[toCurrency][fromCurrency];
    // console.log("환전결과" + convertedAmount)
    document.getElementById("from-input").value = convertedAmount2;
    totalNum1();
    totalNum2();
}

function totalNum1(){
    total_1 = document.getElementById("from-input").value;
    document.querySelector(".total-num1").textContent = numberToKorean(total_1);
}

function totalNum2(){
    total_2 = document.getElementById("to-input").value;
    document.querySelector(".total-num2").textContent = numberToKorean(total_2);
}


//숫자를 한국어 단위로 표시해주기
number = 1000700000

function numberToKorean(number){
    var inputNumber  = number < 0 ? false : number;
    var unitWords    = ['', '만', '억', '조', '경'];
    var splitUnit    = 10000;
    var splitCount   = unitWords.length;
    var resultArray  = [];
    var resultString = '';

    for (var i = 0; i < splitCount; i++){
         var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (var i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    return resultString;
}

console.log(numberToKorean(number))





