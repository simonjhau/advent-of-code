#ifndef Day5_h
#define Day5_h

#include "../Day.h"

class Day5 : public Day {
public:
    Day5();

    ~Day5() override;

    int part1() override;

    int part2() override;

private:
    static void parseFile(
            const std::vector<std::string>& lines,
            std::vector<long>& seeds,
            std::vector<std::vector<std::array<long, 3>>>& maps
    );

    long getSeedForLocation(long location);

    bool seedInInitialRange(long seed, const std::vector<long>& initialSeeds);

    std::vector<long> m_seeds;
    std::vector<std::vector<std::array<long, 3>>> m_maps;
};

#endif /* Day5_h */
