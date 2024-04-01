import { MissionUtils, Console } from "@woowacourse/mission-utils";
import Lotto from './Lotto.js';

async function main() {
    let inputMoney = await Console.readLineAsync("구매금액을 입력해 주세요.");
    let money = parseInt(inputMoney);
    const count = money / 1000;

    Console.print(count + "개를 구매했습니다.");

    let lottoArray = [];
    for (let i = 0; i < count; i++) {
        let lotto = new Lotto();
        lotto.numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
        lottoArray.push(lotto.numbers);
        Console.print(lotto.numbers);
    }

    let lottoNum;
    let bonusNum;
    const inputLotto = await Console.readLineAsync("당첨 번호를 입력해주세요.");
    const inputBonus = await Console.readLineAsync("보너스 번호를 입력해주세요.");
    lottoNum = inputLotto.split(",").map(Number);
    bonusNum = parseInt(inputBonus);
    lottoNum.push(bonusNum);

    const countArray = [0, 0, 0, 0, 0];

    for (let i = 0; i < count; i++) {
        let count = 0;
        let bonusCount = false;
        for (let j = 0; j < 6; j++) {
            for (let k = 0; k < 7; k++) {
                if (lottoNum[k] == lottoArray[i][j]) count++;
                if (lottoNum[k] == bonusNum) bonusCount = true;
            }
        }
        switch (count) {
            case 3:
                countArray[0]++;
                break;
            case 4:
                countArray[1]++;
                break;
            case 6:
                countArray[4]++;
                break;
        }
        if (count == 5) {
            if (bonusCount) countArray[2]++;
            else countArray[3]++;
        }
    }

    const revenue = (countArray[0] * 5000 + countArray[1] * 50000 + countArray[2] * 1500000 + countArray[3] * 30000000 + countArray[4] * 2000000000) / money;
    const roundRev = Math.ceil(revenue * 10) / 10;
    Console.print("당첨통계");
    Console.print("---");
    Console.print("3개 일치 (5,000원) - " + countArray[0] + "개");
    Console.print("4개 일치 (50,000원) - " + countArray[1] + "개");
    Console.print("5개 일치 (1,500,000원) - " + countArray[2] + "개");
    Console.print("5개 일치, 보너스 불 일치 (30,000,000원) - " + countArray[3] + "개");
    Console.print("6개 일치 (2,000,000,000원) - " + countArray[4] + "개");
    Console.print("총 수익률은 " + roundRev + "%입니다.");
}

main();
