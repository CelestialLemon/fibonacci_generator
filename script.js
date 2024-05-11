const inputEl = document.querySelector('#n-fib-input');
const calcEl = document.querySelector('#calculate-btn');
const outputEl = document.querySelector('#p-fib-number-output');
const timeTakenEl = document.querySelector('#p-time-taken');
const orderOfMagEl = document.querySelector('#p-order-of-mag');

calcEl.addEventListener('click', () => {
    const n = Number.parseInt(inputEl.value);

    if (n == NaN) {
        console.error("Input is not a number");
        return;
    } else if (n == 0) {
        console.error("Input must be positve integer");
        return;
    } else {
        const startTime = performance.now();
        const result = generateFibonacci(n - 1);
        const endTime = performance.now();

        outputEl.innerHTML = result;
        timeTakenEl.innerHTML = `${endTime - startTime}ms`;
        orderOfMagEl.innerHTML = `${result.length} (10^)`;
    }

})

/**
 * Generates the Nth fibonacci number
 * @param {number} n Nth number to generate
 * @returns Nth fibonacci number
 */
const generateFibonacci = (n) => {
    if (n === 0) return '0';
    else if (n === 1) return '1';
    
    const fibNumbers = ['0', '1'];

    for (let i = 2; i <= n; i++) {
        const sum = add(fibNumbers[0], fibNumbers[1]);
        fibNumbers[0] = fibNumbers[1];
        fibNumbers[1] = sum;
        // fibNumbers.push(sum);        
    }
    return fibNumbers[fibNumbers.length - 1];
}

/**
 * Returns the index of the string if we count from the end
 * @param {string} s string for which to get index
 * @param {number} i index from last to get
 * @returns index of the string counted from last
 */
const stringIndexFromLast = (s, i) => {
    return s.length - 1 - i;
}

/**
 * Adds two string represented numbers
 * @param {string} a first number represented by string
 * @param {string} b second number represented by string
 * @returns sum of the numbers
 */
const add = (a, b) => {
    const biggerLength = Math.max(a.length, b.length);

    let result = '';

    let carry = 0;
    for (let i = 0; i < biggerLength; i++) {
        const x = Number.parseInt(a[stringIndexFromLast(a, i)] ?? 0);
        const y = Number.parseInt(b[stringIndexFromLast(b, i)] ?? 0);
        
        let sum = x + y + carry;
        carry = Math.floor(sum / 10);
        sum %= 10;

        result = sum + result;
    }

    if (carry === 1) result = '1' + result;

    return result;
}