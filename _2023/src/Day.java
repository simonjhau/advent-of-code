public abstract class Day {
    String[] lines;
    public Day(String[] lines) {
        this.lines = lines;
    }

    abstract int part1();
    abstract int part2();
}
