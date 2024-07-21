#ifndef Day5_h
#define Day5_h

#include "../Day.h"

class Day6 final : public Day {
public:
    Day6();

    ~Day6() override;

    int part1() override;

    int part2() override;

private:
    static long getDistanceForHoldTime(int time, int holdTime);
};

#endif /* Day5_h */
