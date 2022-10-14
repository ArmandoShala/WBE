const factorial = (numb) => {
    if(numb === 0) {
        return 1;
    }

    let bigIntNumb = BigInt(numb);
    let retValue = BigInt(1); // Sets retVal to 1n
    for (bigIntNumb; bigIntNumb > 0n; bigIntNumb--) {
        retValue = bigIntNumb * retValue;
    }

    if(typeof numb != 'bigint'){
        retValue = Number(retValue);
    }

    return retValue;
}


console.log(factorial(5));
console.log(factorial(10));
console.log(factorial(50n));

module.exports = {factorial}
