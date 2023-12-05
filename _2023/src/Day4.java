import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public class Day4 {
    public static void main(String[] args) throws IOException {
        String[] lines = Files.readAllLines(Paths.get("./_2023/input/day4" + ".txt")).toArray(
                new String[0]);

        long start = System.nanoTime();
        int part1 = part1(lines);
        long finish = System.nanoTime();
        long timeElapsed = finish - start;
        System.out.printf("Part 1: %d (%dus)\n", part1, timeElapsed / 1000);

        start = System.nanoTime();
        int part2 = part2(lines);
        finish = System.nanoTime();
        timeElapsed = finish - start;
        System.out.printf("Part 2: %d (%dus)\n", part2, timeElapsed / 1000);
    }

    static Set<Integer> getSetFromString(String s) {
        return Arrays.stream(s.trim().split("\\s+")).map(Integer::parseInt).collect(
                Collectors.toSet());
    }

    static int getNumMatchingNumbers(String line) {
        String[] cardSplit = line.split(":");
        String[] numberSplit = cardSplit[1].split("\\|");
        Set<Integer> winningNumbers = getSetFromString(numberSplit[0]);
        Set<Integer> myNumbers = getSetFromString(numberSplit[1]);
        myNumbers.retainAll(winningNumbers);
        return myNumbers.size();
    }

    static int part1(String[] lines) {
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

    static int part2(String[] lines) {
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
