import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day4 {
    record Assignment(int start, int end) { }
    public static void main(String[] args) throws IOException {
        String file = Files.readString(Paths.get("input/day4.txt"));
        String[] pairs = file.split("\n");

        int sumOverlaps = 0;
        int sumOverlapsFully = 0;
        for (String pair : pairs) {
            String[] pairArr = pair.split(",");

            Assignment first = stringToAssignment(pairArr[0]);
            Assignment second = stringToAssignment(pairArr[1]);

            if (overlapsFully(first, second)) {
                sumOverlaps++;
                sumOverlapsFully++;
            } else if (overlaps(first, second)) {
                sumOverlaps++;
            }
        }
        System.out.println("part 1: " + sumOverlapsFully);
        System.out.println("part 2: " + sumOverlaps);
    }

    static Assignment stringToAssignment(String s) {
        String[] startEnd = s.split("-");
        return new Assignment(Integer.parseInt(startEnd[0]), Integer.parseInt(startEnd[1]));
    }

    static boolean overlapsFully(Assignment first, Assignment second) {
        if ((first.start <= second.start && first.end >= second.end) ||
            second.start <= first.start && second.end >= first.end) {
            return true;
        }
        return false;
    }

    static boolean overlaps(Assignment one, Assignment two) {
        Assignment first;
        Assignment second;
        if (one.start < two.start) {
            first = one;
            second = two;
        } else {
            first = two;
            second = one;
        }

        if (first.end >= second.start) {
            return true;
        }

        return false;
    }
}
