import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public class Day4 extends Day {
    public Day4(String[] lines) {
        super(lines);
    }

    Set<Integer> getSetFromString(String s) {
        return Arrays
                .stream(s.trim().split("\\s+"))
                .map(Integer::parseInt)
                .collect(Collectors.toSet());
    }

    int getNumMatchingNumbers(String line) {
        String[] cardSplit = line.split(":");
        String[] numberSplit = cardSplit[1].split("\\|");
        Set<Integer> winningNumbers = getSetFromString(numberSplit[0]);
        Set<Integer> myNumbers = getSetFromString(numberSplit[1]);
        myNumbers.retainAll(winningNumbers);
        return myNumbers.size();
    }

    public int part1() {
        int totalScore = 0;
        for (String line : lines) {
            int numMatching = getNumMatchingNumbers(line);
            int score = numMatching > 0 ? (int) Math.pow(2,
                    numMatching - 1
            ) : 0;
            totalScore += score;
        }
        return totalScore;
    }

    public int part2() {
        int numOriginalCards = lines.length;
        int curCard = 1;
        int totalCards = numOriginalCards;

        int[] cardCounts = new int[lines.length + 1];
        Arrays.fill(cardCounts, 1);
        cardCounts[0] = 0;

        for (String line : lines) {
            int numMatching = getNumMatchingNumbers(line);

            while (cardCounts[curCard] > 0) {
                for (int i = curCard + 1; i < Math.min(curCard + 1 + numMatching,
                        numOriginalCards + 1
                ); i++) {
                    cardCounts[i]++;
                    totalCards++;
                }
                cardCounts[curCard]--;
            }
            curCard++;
        }


        return totalCards;
    }
}
