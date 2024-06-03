#ifndef Day5_h
#define Day5_h

#include "../Day.h"

class Day6 : public Day {
public:
    Day6();

    ~Day6() override;

    int part1() override;

    int part2() override;

private:
    void parseFile();

    std::vector<int> m_times;
    std::vector<int> m_distances;
};

#endif /* Day5_h */
