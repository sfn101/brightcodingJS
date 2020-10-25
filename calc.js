function calc(s) {
  const result = 0;
  const str = s.split(/\s/);
  const myArry = str.map(e => {
    if (e === "+") return (e = "+");
    if (e === "*") return (e = "*");
    if (e === "-") return (e = "-");
    return parseFloat(e);
  });
  const numb = myArry.filter(e => {
    if (typeof e === "number") return e;
  });
  const oper = myArry.filter(e => {
    if (typeof e === "string") return e;
  });
  console.log(numb);
  console.log(oper);
  const total = (numb, oper) => {
    let x = 0;
    for (let i = 0; i < oper.length; i++) {
      if (oper[i] === "+") return (x = numb[i] + x);
      if (oper[i] === "*") return (x = x * numb[i]);
      if (oper[i] === "-") return (x = x - numb[i]);
    }
    return x;
  };

  return total(numb, oper);
}
console.log(calc("3 + 1 + 2"));
