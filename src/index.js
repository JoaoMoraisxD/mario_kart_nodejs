const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTO: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTO: 0
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock(){
    let random = Math.random()
    let result;

    switch(true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2){
    for(let i = 1; i <= 5; i++){
        console.log(`🏁 Rodada ${i}`);
        
        // Sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.PODER
            totalTestSkill2 = diceResult2 + character2.PODER

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.PODER
            totalTestSkill2 = diceResult2 + character2.PODER

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }
        
        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult2 + character2.PODER

           console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`)

           await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
           await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

           if(powerResult1 > powerResult2 && character2.PONTO > 0) {
            console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`)
            character2.PONTO--;
           }
           if(powerResult2 > powerResult1 && character1.PONTO > 0) {
            console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`)
            character1.PONTO--;
           }
           console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "");
        }

        // verificando o vencerdor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTO++;
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTO++
        }

        console.log("-----------------------------------")
    } 
}

async function declareWinner(character1, character2) {
    console.log(`Resultado final:`);
    console.log(`${character1.PONTO} ponto(s)`);
    console.log(`${character2.PONTO} ponto(s)\n`)

    if(character1.PONTO > character2.PONTO){
        console.log(`${character1.NOME} Venceu a corrida! 🏆`)
    }else if(character2.PONTO > character1.PONTO){
        console.log(`${character2.NOME} Venceu a corrida! 🏆`)
    }else{
        console.log("A corrida terminou em empate!");
    }
}

(async function main(){
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();

