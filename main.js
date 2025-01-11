// Tok misli prilikom programiranja
// Trebam napraviti igricu gdje dva igraca igraju igricu bacanja kocki tako sto postoji deset rundi i u konzoli se ispisuje sledece:

// Prvo trebamo ynati sta je task i kako treba da izgleda,ustvari sta trebamo da uradimo

// ****  ROUND 1  ****
// Igrac1 3:4  Igrac2      (3:4)
// ****  ROUND 2  ****
// Igrac1 5:2  Igrac2      (8:6)
// ****  ROUND 3  ****
// Igrac1 2:5  Igrac2      (10:11)

// -----------------------------

// ****  ROUND 10  ****
// Igrac1 5:6  Igrac2      (55:56)

// 

// Na kraju treba provjeriti koji je igrac pobijedio ili je bilo nerijeseno i to ispisati u konzoli


// console.log("****  ROUND 1  ****");
// console.log("Igrac1 3:4  Igrac2      (3:4)");


// U window objectu imamo Math objekat koji sadryi ugradjene matematicke funkcije koje mozemo da koristimo

// console.log(window.Math);

// Jedna od tih je floor kojaa znaci pod i zaokruzuje predati broj na donju cijelu vrijednost, u ovom slucaju na 12

// console.log(Math.floor(12.6));

// Sledeca je,koja se isto veoma cesto koristi ceil,koja zaokruzuje broj na sledecu cijelu vrijednost,u ovom slucaju na 13

// console.log(Math.ceil(12.2) );

// Sledeca je round,to je metoda koja zaokruzuje na najblizu cjelobrojnu vrijednost npr od 12.0 do 12.4 ce zaokruyiti na 12,a od 12.5 do 12.9 ce yaokruyiti na 13

// console.log(Math.round(12.1));


// Postoje super metode kao na primjer min i max

// console.log(Math.min(10,20,30));
// console.log(Math.max(10,20,30));

// Metoda koja se dosta koristo je metoda random.Math.random() je ugrađena metoda u JavaScript-u koja generiše pseudo-nasumičan broj između 0 (uključujući) i 1 (isključujući). To znači da će broj koji se generiše biti u intervalu od [0, 1), što uključuje 0, ali ne uključuje 1.

// Objašnjenje:
// Math.random(): Generiše nasumičan broj između 0 (uključujući) i 1 (isključujući). Na primer, može vratiti broj kao što je 0.37466351443434047.

// Math.random() * 6: Pomnoži nasumičan broj sa 6, što znači da će rezultat biti u opsegu od 0 (uključujući) do 6 (isključujući). Na primer, ako je nasumičan broj 0.37466351443434047, pomnožen sa 6 daje 2.2479810866060428.

// Math.ceil(): Zaokružuje rezultat na najveći celobrojni broj koji je veći ili jednak datom broju. Dakle, zaokružiće bilo koji broj u opsegu od 0 do 5 na broj između 1 i 6. Na primer, Math.ceil(2.2479810866060428) daje 3.


// console.log(Math.ceil(Math.random()*6));


// Sad se vracamo na zadata posle svih ovih objasnjenja

let player1 = {
  firstName: "",
  points: 0,
  dice: 0,
};

let player2 = {
  firstName: "",
  points: 0,
  dice: 0
};

let round = {
  current: 0,
  total: 0
};

let loop;

function inputPlayerNames() {
  player1.firstName = prompt("Unesite ime prvog igrača:");
  player2.firstName = prompt("Unesite ime drugog igrača:");

  if (player1.firstName && player2.firstName && /^[A-Za-z\s]+$/.test(player1.firstName) && /^[A-Za-z\s]+$/.test(player2.firstName)) {
    inputRounds();
  } else {
    alert("Morate uneti imena oba igrača koja sadrže samo slova i razmake!");
    setTimeout(inputPlayerNames, 0); // Rekurzivni poziv sa odlaganjem
  }
}

function inputRounds() {
  round.total = parseInt(prompt("Unesite broj rundi za igru (1-10):"));
  if (!isNaN(round.total) && round.total > 0 && round.total <= 10) {
    console.clear();
    loop = setInterval(diceRoll, 3000); // Svake 3 sekunde
  } else {
    alert("Niste unijeli validan unos. Potrebno je da unesete broj između 1 i 10.");
    setTimeout(inputRounds, 0); // Rekurzivni poziv sa odlaganjem
  }
}

function input() {
  let confirmationQuestion = confirm("Da li želite da igrate igricu bacanje kockica za dva igrača?");

  if (confirmationQuestion) {
    inputPlayerNames();
  } else {
    alert("Prvi igrač je otkazao igru. Mogućnost nove igre imate za 5 sekundi.");
    setTimeout(input, 5000);
  }
}

function diceRoll() {
  player1.dice = Math.ceil(Math.random() * 6);
  player2.dice = Math.ceil(Math.random() * 6);
  player1.points += player1.dice;
  player2.points += player2.dice;

  if (round.current === round.total) {
    clearInterval(loop);
    winner();
  } else {
    round.current++;
    console.log(`%c**** ROUND ${round.current} ****`, "color: blue; font-size: 20px; font-weight: bold;");
    console.log(`${player1.firstName} ${player1.dice}:${player2.dice} ${player2.firstName} (${player1.points}:${player2.points})`);
  }
}

function winner() {
  if (player1.points > player2.points) {
    console.log(`%c${player1.firstName} je pobjednik!!!`, "background-color:red; color:white; padding:5px;border-radius:10px;");
  } else if (player1.points < player2.points) {
    console.log(`%c${player2.firstName} je pobjednik!!!`, "background-color:red; color:white; padding:5px;border-radius:10px;");
  } else {
    console.log("%cIgra je izjednačena", "background-color:red; color:white; padding:5px;border-radius:10px;");
  }

  console.log("Mogućnost nove igre imate za 10 sekundi.");
  setTimeout(input, 10000);
}

input();