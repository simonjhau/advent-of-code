#ifndef Day5_h
#define Day5_h

#include "../Day.h"

enum type_t {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
};

struct handType_t {
    std::string hand;
    int bid;
    type_t type;
};

class Day7 final : public Day {
public:
    Day7();

    ~Day7() override;

    long part1() override;

    long part2() override;

private:
    std::unordered_map<char, int> m_cardValues = {
        {'A', 0},
        {'K', 1},
        {'Q', 2},
        {'J', 3},
        {'T', 4},
        {'9', 5},
        {'8', 6},
        {'7', 7},
        {'6', 8},
        {'5', 9},
        {'4', 10},
        {'3', 11},
        {'2', 12},
    };

    std::unordered_map<char, int> m_cardValuesWeakJ = {
        {'A', 0},
        {'K', 1},
        {'Q', 2},
        {'T', 3},
        {'9', 4},
        {'8', 5},
        {'7', 6},
        {'6', 7},
        {'5', 8},
        {'4', 9},
        {'3', 10},
        {'2', 11},
        {'J', 12},
    };

    int part(bool joker) const;

    handType_t transformLine(const std::string& line, bool joker) const;

    type_t getTypeFromCards(const std::string& cards, bool joker) const;

    int sortHands(const handType_t& a, const handType_t& b, bool joker) const;
};

#endif /* Day5_h */
