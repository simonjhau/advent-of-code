import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

public class Day3 {
    public static void main(String[] args) throws IOException {
        String file = Files.readString(Paths.get("input/day3.txt"));
        String[] priorities = file.split("\n");

        // Part 1
        int sum1 = 0;
        for (String priority: priorities) {
            String[] compartments = new String[] {priority.substring(0, priority.length()/2),
                    priority.substring(priority.length()/2)};
            char commonItem = getCommonItem(compartments);
            int score = getPriorityScore(commonItem);
            sum1 += score;
        }
        System.out.println("Part 1: " + sum1);

        // Part 2
        int sum2 = 0;
        for (int i = 0; i < priorities.length; i += 3) {
            String[] elves = new String[] {priorities[i], priorities[i+1], priorities[i+2]};
            char commonItem = getCommonItem(elves);
            int score = getPriorityScore(commonItem);
            sum2 += score;
        }
        System.out.println("Part 2: " + sum2);
    }

    static Set stringToSet(String s) {
        Set charSet = new HashSet<>();
        for (int i = 0; i < s.length(); i++) {
            charSet.add(s.charAt(i));
        }
        return charSet;
    }

    static char getCommonItem(String[] collection) {
        Set<Character> seen = stringToSet(collection[0]);
        for (int collectionIdx = 1; collectionIdx < collection.length; collectionIdx++) {
            Set<Character> newSeen = stringToSet(collection[collectionIdx]);
            seen.retainAll(newSeen);
        }
        return seen.iterator().next();
    }

    static int getPriorityScore(char c) {
        if (c < 'a') {
            return 27 + c - 'A';
        }
        return c - 'a' + 1;
    }
}
