const x_button = document.querySelectorAll(".x_button")
const y_button = document.querySelectorAll(".y_button")
const z_button  = document.querySelectorAll(".z_button")
const result_button = document.querySelectorAll(".result_button")
const form = document.getElementById("form")

form.addEventListener("click", onsubmit)

function onsubmit(){

    const x = checkX() //проверка валидности введенных данных пользователем, возвращает объект с полями mass - массив из чисел x,
    // error - boolean(true в случае ошибки), message(в случае отсутствия ошибки вернет пустую строку), остальные функции по аналогии
    const y = checkY()
    const z = checkZ()
    const result = checkResult()
    if(!(x.error && y.error && z.error && result.error)){ //проверка валидности данных
        gauss(x, y, z, result)
    }
    else{
        alert(x.message + y.message + z.message + result.message) //вывод сообщения в случаи невалидных данных
    }

}

function gauss(x, y, z, result){
    let s1 = [x.mass[0], y.mass[0], z.mass[0], result.mass[0]]
    let s2 = [x.mass[1], y.mass[1], z.mass[1], result.mass[1]]
    let s3 = [x.mass[2], y.mass[2], z.mass[2], result.mass[2]] //cтроки
    let A = [s1, s2, s3]
    const n = 3
    while(!isEnd(A)){

        A = replaceString(A)
        if(A[1][0] !== 0){

            if(A[0][0] !== 0) {
                let k = -(A[1][0] / A[0][0])
                console.log("k = " + k)
                for (let i = 0; i <= n; i++) {
                    A[1][i] += k * A[0][i]
                }
            }
            else{
                alert("невозможно найти корни уравнения")
                return
            }
        }
        A = replaceString(A)
        if(A[2][0] !== 0){
            if(A[0][0]){
                let k = -(A[2][0] / A[0][0])
                for(let i = 0; i <= n; i++ ){
                    A[2][i] += k * A[0][i]
                }
            }
            else{
                alert("невозможно найти корни уравнения")
                return
            }
        }
        A = replaceString(A)
        if(A[2][1] !== 0){
            if(A[1][1]){
                let k = -(A[2][1] / A[1][1])
                for(let i = 0; i <= n; i++ ){
                    A[2][i] += k * A[1][i]
                }
            }
            else{
                alert("невозможно найти корни уравнения")
                return
            }
        }

    }
    let resultZ = A[2][3] / A[2][2]
    let resultY = (A[1][3] - A[1][2] * resultZ) / A[1][1]
    let resultX = (A[0][3] - A[0][2] * resultZ - A[0][1] * resultY)/A[0][0]
    if(Math.round(resultX) - resultX<= 0.003){
        resultX = Math.round(resultX)
    }
    if(Math.round(resultY) - resultY<= 0.003){
        resultY = Math.round(resultY)
    }
    if(Math.round(resultZ) - resultZ<= 0.0003){
        resultZ = Math.round(resultZ)
    }
    if(!isNaN(resultX) && !isNaN(resultY) && !isNaN(resultZ)){
        alert("x = " + resultX + "\n" + "y = " + resultY + "\n" + "z = " + resultZ)
    }
    else{
        alert("Система не имеет решений")
    }

}

function checkResultMatrix(resultX, resultY, resultZ, a){
    if(
        a[0][0] * resultX + a[0][1] * resultY + a[0][2] * resultZ === a[0][3] &&
        a[1][0] * resultX + a[1][1] * resultY + a[1][2] * resultZ === a[1][3] &&
        a[2][0] * resultX + a[2][1] * resultY + a[2][2] * resultZ === a[2][3]
    ){
        alert("x = " + resultX + "\n" + "y = " + resultY + "\n" + "z = " + resultZ)
    }
    else if(
        a[0][0] * resultX + a[0][1] * resultZ + a[0][2] * resultY === a[0][3] &&
        a[1][0] * resultX + a[1][1] * resultZ + a[1][2] * resultY === a[1][3] &&
        a[2][0] * resultX + a[2][1] * resultZ + a[2][2] * resultY === a[2][3]
    ){
        alert("x = " + resultX + "\n" + "y = " + resultZ + "\n" + "z = " + resultY)
    }
    else if(
        a[0][0] * resultY + a[0][1] * resultX + a[0][2] * resultZ === a[0][3] &&
        a[1][0] * resultY + a[1][1] * resultX + a[1][2] * resultZ === a[1][3] &&
        a[2][0] * resultY + a[2][1] * resultX + a[2][2] * resultZ === a[2][3]
    ) {
        alert("x = " + resultY + "\n" + "y = " + resultX + "\n" + "z = " + resultZ)
    }
    else if(
        a[0][0] * resultY + a[0][1] * resultZ + a[0][2] * resultX === a[0][3] &&
        a[1][0] * resultY + a[1][1] * resultZ + a[1][2] * resultX === a[1][3] &&
        a[2][0] * resultY + a[2][1] * resultZ + a[2][2] * resultX === a[2][3]
    ){
        alert("x = " + resultY + "\n" + "y = " + resultZ + "\n" + "z = " + resultX)
    }
    else if(
        a[0][0] * resultZ + a[0][1] * resultX + a[0][2] * resultY === a[0][3] &&
        a[1][0] * resultZ + a[1][1] * resultX + a[1][2] * resultY === a[1][3] &&
        a[2][0] * resultZ + a[2][1] * resultX + a[2][2] * resultY === a[2][3]
    ){
        alert("x = " + resultZ + "\n" + "y = " + resultX + "\n" + "z = " + resultY)
    }
    else{
        alert("x = " + resultZ + "\n" + "y = " + resultY + "\n" + "z = " + resultX)
    }


}

function isEnd(A){
   return A[1][0] === 0 && A[2][0] === 0 && A[2][1] === 0
}

function checkX(){
    const mass = []
    x_button.forEach(function (input){
        const x = input.value.replace(',', '.')
        if(!isNaN(x)){
            mass.push(Number.parseFloat(x))
        }
    })

    if(mass.length === 3){
        return{
            mass: mass,
            error: false,
            message: ""
        }
    }
    else{
        return{
            mass: [],
            error: true,
            message: "Заполните все поля X\n"
        }
    }
}

function checkY(){
    const mass = []
    y_button.forEach(function (input){
        const y = input.value.replace(',', '.')
        if(!isNaN(y)){
            mass.push(Number.parseFloat(y))
        }
    })

    if(mass.length === 3){
        return{
            mass: mass,
            error: false,
            message: ""
        }
    }
    else{
        return{
            mass: [],
            error: true,
            message: "Заполните все поля Y\n"
        }
    }
}

function checkZ(){
    const mass = []
    z_button.forEach(function (input){
        const z = input.value.replace(',', '.')
        if(!isNaN(z)){
            mass.push(Number.parseFloat(z))
        }
    })

    if(mass.length === 3){
        return{
            mass: mass,
            error: false,
            message: ""
        }
    }
    else{
        return{
            mass: [],
            error: true,
            message: "Заполните все поля Z\n"
        }
    }
}

function checkResult(){
    const mass = []
    result_button.forEach(function (input){
        const result = input.value.replace(',', '.')
        if(!isNaN(result)){
            mass.push(Number.parseFloat(result))
        }
    })

    if(mass.length === 3){
        return{
            mass: mass,
            error: false,
            message: ""
        }
    }
    else{
        return{
            mass: [],
            error: true,
            message: "Заполните все поля Result\n"
        }
    }
}

function replaceString(a) {

    let anew = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    let amount = 0
    let new_amount = 0

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            anew[i][j] = a[j][i]
        }
    }

    let max_index = a[0].indexOf(Math.max(a[0]))
    for (let i = 0; i < 3; i++) {
        if (a[0][i] === a[0][max_index]) {
            amount += 1
        }

    }

    if (amount === 1) {
        if (anew[0][0] !== a[0][max_index]) {
            let temp = anew[0]
            anew[0] = anew[max_index]
            anew[max_index] = temp

        }

    } else if (amount === 2) {
        let nm = a[0].indexOf(Math.min(a[0]))
        let m1
        let m11
        let m2
        let m22
        if (nm === 0) {
            m1 = a[1][1]
            m11 = 1
            m2 = a[1][2]
            m22 = 2
        } else if (nm === 1) {
            m1 = a[1][0]
            m11 = 0
            m2 = a[1][2]
            m22 = 2
        } else {
            m1 = a[1][0]
            m11 = 0
            m2 = a[1][1]
            m22 = 1
        }
        if (m1 > m2) {
            let temp = anew[0]
            anew[0] = anew[m22]
            anew[m22] = temp
        } else {
            let temp = anew[0]
            anew[0] = anew[m11]
            anew[m11] = temp
        }
    }


    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            a[i][j] = anew[j][i]
        }
    }

    max_index = a[1].indexOf(Math.max(a[1]))
    for (let i = 0; i < 3; i++) {
        if (a[1][i] === a[1][max_index]) {
            new_amount += 1
        }
    }


    if (amount === 3) {
        if (new_amount === 1) {
            if (anew[1][1] !== a[1][max_index]) {
                let temp = anew[0]
                anew[0] = anew[max_index]
                anew[max_index] = temp
            }
        } else if (new_amount === 2) {
            let nm = a[1].indexOf(Math.min(a[1]))
            let m1
            let m11
            let m2
            let m22
            if (nm === 0) {
                m1 = a[2][1]
                m11 = 1
                m2 = a[2][2]
                m22 = 2
            } else if (nm === 1) {
                m1 = a[2][0]
                m11 = 0
                m2 = a[2][2]
                m22 = 2
            } else {
                m1 = a[2][0]
                m11 = 0
                m2 = a[2][1]
                m22 = 1
            }
            if (m1 > m2) {
                let temp = anew[1]
                anew[1] = anew[m22]
                anew[m22] = temp
            } else {
                let temp = anew[1]
                anew[1] = anew[m11]
                anew[m11] = temp
            }
        }
    } else {
        if (anew[1][1] === anew[2][1]) {
            if (anew[2][1] < anew[2][2]) {
                let temp = anew[1]
                anew[1] = anew[2]
                anew[2] = temp
            }
        } else {
            if (anew[1][1] < anew[2][1]) {
                let temp = anew[1]
                anew[1] = anew[2]
                anew[2] = temp
            }
        }

    }

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            a[i][j] = anew[j][i]
        }
    }

    if (new_amount === 2 && amount === 3){
        if (a[2][2] < a[2][0]){
            let temp = anew[0]
            anew[0] = anew[2]
            anew[2] = temp
        }
    }
    else if (new_amount === 3 && amount === 3){
        if(anew[2][2] !== a[2][max_index]){
            let temp = anew[2]
            anew[2] = anew[max_index]
            anew[max_index] =  temp
        }
    }
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            a[i][j] = anew[j][i]
        }
    }

    return a

}

