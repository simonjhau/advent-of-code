#include "Day7.h"
#include "../Utils.h"

#include <algorithm>

Day7::Day7() : Day(7, false) {
};

Day7::~Day7() = default;

type_t Day7::getTypeFromCards(const std::string& cards, const bool joker) const {
    std::unordered_map<char, int> cardValues = joker ? m_cardValuesWeakJ : m_cardValues;

    // A K Q J T 9 8 7 6 5 4 3 2
    int counts[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
    int numPairs = 0;
    int numJokers = 0;

    for (char c: cards) {
        counts[cardValues[c]]++;
        if (counts[cardValues[c]] == 2) {
            numPairs++;
        }
        if (c == 'J') {
            numJokers++;
        }
    }

    int* pMaxElement;
    if (joker) {
        counts[cardValues['J']] = 0;
        pMaxElement = std::max_element(counts, counts + 13);
        *pMaxElement += numJokers;
    } else {
        pMaxElement = std::max_element(counts, counts + 13);
    }

    type_t type;
    switch (*pMaxElement) {
        case 5:
            type = FiveOfAKind;
            break;
        case 4:
            type = FourOfAKind;
            break;
        case 3:
            if (numPairs == 2) {
                type = FullHouse;
            } else {
                type = ThreeOfAKind;
            }
            break;
        case 2:
            if (numPairs == 2) {
                type = TwoPair;
            } else {
                type = OnePair;
            }
            break;
        default:
            type = HighCard;
            break;
    }
    return type;
}

handType_t Day7::transformLine(const std::string& line, const bool joker) const {
    std::vector<std::string> splitLine = split(line, " ");
    handType_t handType = {
        splitLine[0],
        std::stoi(splitLine[1]),
        getTypeFromCards(splitLine[0], joker)
    };
    return handType;
}

int Day7::sortHands(const handType_t& a, const handType_t& b, const bool joker) const {
    if (a.type != b.type) {
        return a.type < b.type;
    }

    auto cardValues = joker ? m_cardValuesWeakJ : m_cardValues;

    for (int i = 0; i < 5; i++) {
        if (cardValues[a.hand[i]] != cardValues[b.hand[i]])
            return cardValues[a.hand[i]] > cardValues[b.hand[i]];
    }

    return 0;
}

int Day7::part(bool joker) const {
    const int numHands = static_cast<int>(m_lines.size());
    std::vector<handType_t> hands(numHands);
    std::ranges::transform(
        m_lines,
        hands.begin(),
        [this, joker](const std::string& line) { return transformLine(line, joker); }
    );
    std::sort(
        hands.begin(),
        hands.end(),
        [this, joker](const handType_t& a, const handType_t& b) { return sortHands(a, b, joker); }
    );

    int sum = 0;
    for (int i = 0; i < numHands; i++) {
        sum += hands[i].bid * (i + 1);
    }
    return sum;
}

int Day7::part1() {
    return part(false);
}

int Day7::part2() {
    return part(true);
}
