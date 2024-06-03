import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Main {
    public static void main(String[] args) throws IOException {
        int dayNumber = 4;
        boolean test = false;

        System.out.printf("Day %s\n", dayNumber);

        String inputFileName = "./_2023/input/day" + dayNumber + (test ?
                "test" : "") + ".txt";
        String[] lines = Files
                .readAllLines(Paths.get(inputFileName))
                .toArray(new String[0]);

        Day day = new Day4(lines);

        long start = System.nanoTime();
        int part1 = day.part1();
        long finish = System.nanoTime();
        long timeElapsed = finish - start;
        System.out.printf("Part 1: %d (%dus)\n", part1, timeElapsed / 1000);

        start = System.nanoTime();
        int part2 = day.part2();
        finish = System.nanoTime();
        timeElapsed = finish - start;
        System.out.printf("Part 2: %d (%dus)\n", part2, timeElapsed / 1000);
    }
}
