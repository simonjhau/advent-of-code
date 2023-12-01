import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

public class Day2 {
    static Map<String, String> moveDecryption =
            Map.of("A", "R", "B", "P", "C", "S", "X", "R", "Y", "P", "Z", "S");
    static Map<String, String> winningMove = Map.of("R", "P", "P", "S", "S", "R");
    static Map<String, Integer> shapeScores = Map.of("R", 1, "P", 2, "S", 3);

    static Map<String, String> outcomeDecryption = Map.of("X", "L", "Y", "D", "Z", "W");
    static Map<String, Integer> outcomeScores = Map.of("W", 6, "D", 3, "L", 0);
    static Map<String, String> losingMove = Map.of("R", "S", "P", "R", "S", "P");

    public static void main(String[] args) throws IOException {
        String file = Files.readString(Paths.get("input/day2.txt"));
        String[] moves = file.split("\n");

        // Part 1
        int score1 = 0;
        for (String encryptedMove : moves) {
            String[] splitMoves = encryptedMove.split(" ");
            String opponentMove = moveDecryption.get(splitMoves[0]);
            String move = moveDecryption.get(splitMoves[1]);
            score1 += calculateScoreFromMoves(opponentMove, move);
        }
        System.out.println("Part 1 score: " + score1);

        // Part 2
        int score2 = 0;
        for (String encryptedMove : moves) {
            String[] splitMoves = encryptedMove.split(" ");
            String opponentMove = moveDecryption.get(splitMoves[0]);
            String outcome = outcomeDecryption.get(splitMoves[1]);
            score2 += calculateScoreFromOutcome(opponentMove, outcome);
        }
        System.out.println("Part 2 score: " + score2);

    }

    static int calculateScoreFromMoves(String opponentMove, String move) {
        int score = shapeScores.get(move);
        if (move == winningMove.get(opponentMove)) {
            score += 6;
        } else if (move ==  opponentMove) {
            score += 3 ;
        }
        return score;
    }

    static int calculateScoreFromOutcome(String opponentMove, String outcome) {
        int score = outcomeScores.get(outcome);
        if (outcome == "W") {
            score += shapeScores.get(winningMove.get(opponentMove));
        } else if (outcome == "L") {
            score += shapeScores.get(losingMove.get(opponentMove));
        } else {
            score += shapeScores.get(opponentMove);
        }
        return score;
    }
}
