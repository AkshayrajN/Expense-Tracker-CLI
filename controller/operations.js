

export function add(description, amount) {
    console.log(typeof(amount));
    console.log(`Adding expense: ${description}, Amount: ${amount}`);
}

export function del(description) {
    console.log(`Deleting expense: ${description}`);
}
