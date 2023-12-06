public class Day2 implements Day {
    public int part1(String[] lines) {
        int maxRed = 12;
        int maxGreen = 13;
        int maxBlue = 14;
        int sumOfIds = 0;

        for (String line : lines) {
            String[] gameSplit = line.split(":");
            int gameId = Integer.parseInt(gameSplit[0].split(" ")[1]);

            String[] turnSplit = gameSplit[1].split(";");
            boolean bust = false;
            for (String turn : turnSplit) {
                int red = 0;
                int green = 0;
                int blue = 0;

                String[] cubeSplit = turn.split(",");
                for (String cubeDetails : cubeSplit) {
                    String[] details = cubeDetails.trim().split(" ");
                    switch (details[1]) {
                        case "red":
                            red += Integer.parseInt(details[0]);
                            if (red > maxRed) {
                                bust = true;
                            }
                            break;
                        case "green":
                            green += Integer.parseInt(details[0]);
                            if (green > maxGreen) {
                                bust = true;
                            }
                            break;
                        case "blue":
                            blue += Integer.parseInt(details[0]);
                            if (blue > maxBlue) {
                                bust = true;
                            }
                            break;
                        default:
                            // Do nothing
                    }
                }
            }
            if (!bust) {
                sumOfIds += gameId;
            }
        }
        return sumOfIds;
    }

    public int part2(String[] lines) {
        int sumOfPowers = 0;

        for (String line : lines) {
            String[] gameSplit = line.split(":");

            int maxRed = 0;
            int maxGreen = 0;
            int maxBlue = 0;
            String[] turnSplit = gameSplit[1].split(";");

            for (String turn : turnSplit) {
                int red = 0;
                int green = 0;
                int blue = 0;

                String[] cubeSplit = turn.split(",");
                for (String cubeDetails : cubeSplit) {
                    String[] details = cubeDetails.trim().split(" ");
                    switch (details[1]) {
                        case "red":
                            red += Integer.parseInt(details[0]);
                            maxRed = Math.max(red, maxRed);
                            break;
                        case "green":
                            green += Integer.parseInt(details[0]);
                            maxGreen = Math.max(green, maxGreen);
                            break;
                        case "blue":
                            blue += Integer.parseInt(details[0]);
                            maxBlue = Math.max(blue, maxBlue);
                            break;
                        default:
                            // Do nothing
                    }
                }
            }

            int power = maxRed * maxGreen * maxBlue;
            sumOfPowers += power;
        }
        return sumOfPowers;
    }
}
