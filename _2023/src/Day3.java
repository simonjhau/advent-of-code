import java.util.*;

public class Day3 extends Day {
    char[][] matrix;

    public Day3(String[] lines) {
        super(lines);

        matrix = new char[lines.length][lines[0].length()];
        for (int r = 0; r < lines.length; r++) {
            for (int c = 0; c < lines[0].length(); c++) {
                matrix[r][c] = lines[r].charAt(c);
            }
        }
    }

    boolean checkAround(
            int row,
            int col
    ) {
        int[][] dirs = {{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1},
                {1, 0}, {1, 1}};

        for (int[] dir : dirs) {
            int newRow = Math.min(Math.max(row + dir[0], 0), matrix.length - 1);
            int newCol = Math.min(Math.max(col + dir[1], 0),
                    matrix[0].length - 1
            );

            if (!Character.isDigit(matrix[newRow][newCol]) && matrix[newRow][newCol] != '.') {
                return true;
            }
        }

        return false;
    }

    public int part1() {
        int sumOfParts = 0;

        boolean isPart = false;
        int curNumber = 0;

        for (int r = 0; r < lines.length; r++) {
            for (int c = 0; c < matrix[0].length; c++) {
                char ch = matrix[r][c];
                if (Character.isDigit(ch)) {
                    curNumber = curNumber * 10 + ch - '0';
                    isPart |= checkAround(r, c);
                } else {
                    if (curNumber > 0 && isPart) {
                        sumOfParts += curNumber;
                    }
                    isPart = false;
                    curNumber = 0;
                }
            }

        }

        return sumOfParts;
    }

    Set<String> checkAroundForGears(
            int row,
            int col
    ) {
        int[][] dirs = {{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1},
                {1, 0}, {1, 1}};

        Set<String> gears = new HashSet<>();
        for (int[] dir : dirs) {
            int newRow = Math.min(Math.max(row + dir[0], 0), matrix.length - 1);
            int newCol = Math.min(Math.max(col + dir[1], 0),
                    matrix[0].length - 1
            );

            if (matrix[newRow][newCol] == '*') {
                gears.add(String.format("%d,%d", newRow, newCol));
            }
        }

        return gears;
    }

    public int part2() {
        Map<String, List<Integer>> gears = new HashMap<>();

        Set<String> nearbyGears = new HashSet<>();
        int curNumber = 0;

        for (int r = 0; r < lines.length; r++) {
            for (int c = 0; c < matrix[0].length; c++) {
                char ch = matrix[r][c];
                if (Character.isDigit(ch)) {
                    curNumber = curNumber * 10 + ch - '0';
                    nearbyGears.addAll(checkAroundForGears(r,c));
                } else {
                    if (curNumber > 0) {
                        for (String gear : nearbyGears) {
                            if (!gears.containsKey(gear)) {
                                gears.put(gear, new ArrayList<>(List.of(curNumber)));
                            } else {
                                gears.get(gear).add(curNumber);
                            }
                        }
                    }
                    nearbyGears.clear();
                    curNumber = 0;
                }
            }
        }

        int sumOfGearRatios = 0;
        for (String key : gears.keySet()) {
            List<Integer> nums = gears.get(key);
            if (nums.size() == 2) {
                sumOfGearRatios += nums.get(0) * nums.get(1);
            }
        }
        return sumOfGearRatios;
    }
}
