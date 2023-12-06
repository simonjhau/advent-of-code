import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class Day5 {
    static List<List<long[]>> maps = new ArrayList<>();

    static void parseMaps(String[] lines) {
        List<long[]> filters = new ArrayList<>();

        for (int i = 2; i < lines.length; i++) {
            if (lines[i].isBlank()) {
                maps.add(filters);
                filters = new ArrayList<>();
            } else if (lines[i].contains("map")) {
                continue;
            } else {
                filters.add(Arrays.stream(lines[i].split(" ")).mapToLong(Long::parseLong).toArray());
            }
        }
        maps.add(filters);
    }

    public static void main(String[] args) throws IOException {
        String[] lines = Files.readAllLines(Paths.get("./_2023/input/day5" + ".txt")).toArray(
                new String[0]);

        parseMaps(lines);

        long start = System.nanoTime();
        long part1 = part1(lines);
        long finish = System.nanoTime();
        long timeElapsed = finish - start;
        System.out.printf("Part 1: %d (%dus)\n", part1, timeElapsed / 1000);

        start = System.nanoTime();
        long part2 = part2(lines);
        finish = System.nanoTime();
        timeElapsed = finish - start;
        System.out.printf("Part 2: %d (%dus)\n", part2, timeElapsed / 1000);
    }

    static void printMaps(List<List<long[]>> maps) {
        for (List<long[]> map : maps) {
            System.out.println("Next map");
            for (long[] range : map) {
                System.out.println(Arrays.toString(range));
            }
        }
    }

    static long getLocationForSeed(long seed) {
        long mappedValue = seed;
        for (List<long[]> map : maps) {
            for (long[] filter : map) {
                if (mappedValue >= filter[1] && mappedValue <= filter[1] + filter[2]) {
                    mappedValue = filter[0] + mappedValue - filter[1];
                    break;
                }
            }
        }
        return mappedValue;
    }


    static long part1(String[] lines) {
        long[] initialSeeds = Arrays.stream(lines[0].split(":")[1].trim().split(
                " ")).mapToLong(Long::parseLong).toArray();

        long lowestLocation = Integer.MAX_VALUE;
        for (long seed : initialSeeds) {
            long location = getLocationForSeed(seed);
            lowestLocation = Math.min(location, lowestLocation);
        }
        return lowestLocation;
    }

    static long getSeedForLocation(long location) {
        long mappedValue = location;
        for (List<long[]> map : maps.reversed()) {
            for (long[] filter : map) {
                if (mappedValue >= filter[0] && mappedValue <= filter[0] + filter[2]) {
                    mappedValue = filter[1] + mappedValue - filter[0];
                    break;
                }
            }
        }
        return mappedValue;
    }

    static boolean seedInInitialRange(
            long seed,
            long[] initialSeeds
    ) {
        for (int i = 0; i < initialSeeds.length; i += 2) {
            if (seed >= initialSeeds[i] && seed <= initialSeeds[i] + initialSeeds[i + 1]) {
                return true;
            }
        }
        return false;
    }

    static long part2(String[] lines) {
        long[] initialSeeds = Arrays.stream(lines[0].split(":")[1].trim().split(
                " ")).mapToLong(Long::parseLong).toArray();

        long location = 0;
        while (true) {
            long seed = getSeedForLocation(location);
            if (seedInInitialRange(seed, initialSeeds)) {
                return location;
            }
            location++;
        }
    }
}
