const factorial = (numb) => {
    let bigIntNumb = BigInt(numb);
    let retValue = BigInt(true); // Sets retVal to 1
    for (bigIntNumb; bigIntNumb > 0n; bigIntNumb--) {
        retValue = bigIntNumb * retValue;
    }
    return retValue;
}


console.log(factorial(5));
console.log(factorial(10));
console.log(factorial(50n));

module.exports = {factorial}
