import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

public class Day1 {
    public static void main(String[] args) throws IOException {
        String[] lines = Files.readAllLines(Paths.get("./_2023/input/day1" +
                ".txt")).toArray(
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

    static int part1(String[] lines) {
        int calibrationValuesSum = 0;
        for (String line : lines) {
            int i = 0;
            while (!Character.isDigit(line.charAt(i))) {
                i++;
            }
            int first = line.charAt(i) - '0';

            i = line.length() - 1;
            while (!Character.isDigit(line.charAt(i))) {
                i--;
            }
            int last = line.charAt(i) - '0';

            int calibrationValue = first * 10 + last;
            calibrationValuesSum += calibrationValue;
        }
        return calibrationValuesSum;
    }

    static String[] numbers = {"one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7"
            , "8", "9",};
    static Map<String, Integer> mapping = Map.of(
            "one",
            1,
            "two",
            2,
            "three",
            3,
            "four",
            4,
            "five",
            5,
            "six",
            6,
            "seven",
            7,
            "eight",
            8,
            "nine",
            9
    );

    static int getDigit(String s) {
        if (s.length() == 1) {
            return s.charAt(0) - '0';
        }
        return mapping.get(s);
    }

    static int part2(String[] lines) {
        int calibrationValuesSum = 0;

        for (String line : lines) {
            int first = -1;
            int i = 0;

            while (first == -1) {
                for (String number : numbers) {
                    if (line.startsWith(number, i)) {
                        first = getDigit(number);
                        break;
                    }
                }
                i++;
            }

            int last = -1;
            while (last == -1) {
                for (String number : numbers) {
                    if (line.endsWith(number)) {
                        last = getDigit(number);
                        break;
                    }
                }
                line = line.substring(0, line.length() - 1);
            }

            int calibrationValue = first * 10 + last;
            calibrationValuesSum += calibrationValue;
        }
        return calibrationValuesSum;
    }
}
