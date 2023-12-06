import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Main {
    public static void main(String[] args) throws IOException {
        Day day = new Day4();

        String[] lines =
                Files.readAllLines(Paths.get("./_2023/input/" + day.getClass().getSimpleName() + ".txt")).toArray(
                new String[0]);

        System.out.println("Running " + day.getClass().getSimpleName());

        long start = System.nanoTime();
        int part1 = day.part1(lines);
        long finish = System.nanoTime();
        long timeElapsed = finish - start;
        System.out.printf("Part 1: %d (%dus)\n", part1, timeElapsed / 1000);

        start = System.nanoTime();
        int part2 = day.part2(lines);
        finish = System.nanoTime();
        timeElapsed = finish - start;
        System.out.printf("Part 2: %d (%dus)\n", part2, timeElapsed / 1000);
    }
}
