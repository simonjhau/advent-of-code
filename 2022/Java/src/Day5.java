import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Day5 {
    public static void main(String[] args) throws IOException {
        String file = Files.readString(Paths.get("input/day5.txt"));
        String[] lines = file.split("\n");
        ArrayList<ArrayList<Character>> crates = new ArrayList<>();

        int lineIdx = 0;
        while (!lines[lineIdx].isBlank()) {
            String line = lines[lineIdx];

            int crateIdx = 0;
            int charIdx = 1;
            while (charIdx <= line.length()) {
                if (crateIdx == crates.size()) {
                    crates.add(new ArrayList<>());
                }
                char crate = line.charAt(charIdx);
                if (crate >= 'A' && crate <= 'Z') {
                    crates.get(crateIdx).add(crate);
                }
                crateIdx++;
                charIdx = 1 + 4 * crateIdx;
            }
            lineIdx++;
        }
        lineIdx++;

        for (ArrayList<Character> stack: crates) {
            Collections.reverse(stack);
        }

        while (lineIdx < lines.length) {
            String line = lines[lineIdx];
            Matcher matcher = Pattern.compile("\\d+").matcher(line);
            List<Integer> move = new ArrayList<>();
            while (matcher.find()) {
                move.add(Integer.valueOf(matcher.group()));
            }
            moveCratesOneAtATime(crates, move);
            lineIdx++;
        }

        StringBuilder res = new StringBuilder("");
        for (List<Character> crateStack : crates) {
            res.append(crateStack.get(crateStack.size() - 1));
        }
        System.out.println(res);
    }

    public static void moveCratesOneAtATime(ArrayList<ArrayList<Character>> crates, List<Integer> move) {
        List<Character> from = crates.get(move.get(1) - 1);
        List<Character> to = crates.get(move.get(2) - 1);
        for (int i = 0; i < move.get(0); i++) {
            if (!from.isEmpty()) {
                to.add(from.remove(from.size() - 1));
            }
        }
    }
}
