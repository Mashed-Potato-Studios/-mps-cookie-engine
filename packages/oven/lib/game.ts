import { IFighter, StartMatchOptions } from "types"


function createAttack(attacker: IFighter) {
    return function attack(defender: IFighter) {
        defender.health -= attacker.damage
    }
}
function starMatch(fighterA: IFighter, fighterB: IFighter, options: StartMatchOptions = {}): void {

    const { logMatch = false, maxRounds, roundDelay = 1000 } = options;
    const fighter1Attack = createAttack(fighterA);
    const fighter2Attack = createAttack(fighterB);
    let round = 1;

    const log = (msg: string) => {
        if (logMatch) console.log(msg);
    };

    while (fighter1Attack.health > 0 && fighter2Attack.health > 0 && (!maxRounds || round <= maxRounds)) {
        log(`Round ${round}`);

        fighter1Attack(fighter2Attack);
        if (fighter2Attack.health <= 0) {
            log(`${fighter1Attack.name} wins!`);
            return fighter1;
        }

        fighter2Attack(fighter1);
        if (fighter1.health <= 0) {
            log(`${fighter2.name} wins!`);
            return fighter2;
        }
        
        round++;

        // introduce delay between rounds
        if (round <= maxRounds) {
            setTimeout(() => {
                log(`----------------`);
            }, roundDelay);
        }
    }

    log(`Match ended in a draw!`);
    return null;

}


export default starMatch;