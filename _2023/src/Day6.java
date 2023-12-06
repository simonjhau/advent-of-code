import java.util.Arrays;

public class Day6 implements Day {
    private long getTravelDistance(
            long time,
            long holdTime
    ) {
        return (time - holdTime) * holdTime;
    }

    private int getMinHoldTime(
            int time,
            long recordDistance
    ) {
        int l = 1;
        int r = time - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            long dist = getTravelDistance(time, m);
            long nextDist = getTravelDistance(time, m + 1);

            if (nextDist <= recordDistance) {
                l = m;
            } else if (dist > recordDistance) {
                r = m;
            } else {
                return m + 1;
            }
        }
        return -1;
    }

    private int getMaxHoldTime(
            int time,
            long recordDistance
    ) {
        int l = 1;
        int r = time - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            long dist = getTravelDistance(time, m);
            long nextDist = getTravelDistance(time, m + 1);

            if (dist <= recordDistance) {
                r = m;
            } else if (nextDist > recordDistance) {
                l = m;
            } else {
                return m;
            }
        }
        return -1;
    }

    private int getNumWaysToBeatRecord(
            int time,
            long recordDistance
    ) {
        int minHoldTime = getMinHoldTime(time, recordDistance);
        int maxHoldTime = getMaxHoldTime(time, recordDistance);
        return maxHoldTime - minHoldTime + 1;
    }

    public int part1(String[] lines) {
        int[] times = Arrays
                .stream(lines[0].split(":")[1].trim().split("\\s" + "+"))
                .mapToInt(Integer::parseInt)
                .toArray();
        int[] recordDistances = Arrays
                .stream(lines[1].split(":")[1].trim().split("\\s" + "+"))
                .mapToInt(Integer::parseInt)
                .toArray();

        int product = 1;
        for (int race = 0; race < times.length; race++) {
            product *= getNumWaysToBeatRecord(times[race],
                    recordDistances[race]
            );
        }
        return product;
    }

    public int part2(String[] lines) {
        int time = Integer.parseInt(lines[0].split(":")[1]
                .trim()
                .replace(" ", ""));
        long recordDistance = Long.parseLong(lines[1].split(":")[1]
                .trim()
                .replace(" ", ""));
        return getNumWaysToBeatRecord(time, recordDistance);
    }
}
