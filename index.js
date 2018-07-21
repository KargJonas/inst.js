function test(amount) {
    let elems = "";
    for(let i = 1; i < amount + 1; i++) {
        elems += `<h1>${i}</h1>`;
    }

    return elems;
}