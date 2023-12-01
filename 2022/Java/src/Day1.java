import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.PriorityQueue;

public class Day1 {
    public static void main(String[] args) throws IOException {
        String file = Files.readString(Paths.get("input/day1.txt"));
        String[] calories = file.split("\n");
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());

        int max = 0;
        int cur = 0;
        for (String calorie : calories) {
            if (calorie.isBlank()) {
                max = Math.max(cur, max);
                maxHeap.add(cur);
                cur = 0;
            } else {
                cur += Integer.parseInt(calorie);
            }
        }

        System.out.println("Max calories: " + max);

        int topThree = 0;
        for (int i = 0; i < 3; i++) {
            topThree += maxHeap.remove();
        }

        System.out.println("Sum of top 3: " + topThree);
    }
}
