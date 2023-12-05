import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Day3 {
    public static void main(String[] args) throws IOException {
        String[] lines = Files.readAllLines(Paths.get("./_2023/input/day3test"
                + ".txt")).toArray(
                new String[0]);

        long start = System.nanoTime();
        int part1 = part1(lines);
        long finish = System.nanoTime();
        long timeElapsed = finish - start;
        System.out.printf("Part 1: %d (%dus)\n", part1, timeElapsed / 1000);

//        start = System.nanoTime();
//        int part2 = part2(lines);
//        finish = System.nanoTime();
//        timeElapsed = finish - start;
//        System.out.printf("Part 2: %d (%dus)\n", part2, timeElapsed / 1000);
    }

    static int part1(String[] lines) {
        return 0;
    }

    static int part2(String[] lines) {
       return 0;
    }
}
