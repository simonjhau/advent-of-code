#ifndef CPP_DAY_H
#define CPP_DAY_H

#include <vector>
#include <string>

class Day {
public:
    Day(int dayNum, bool test);

    virtual ~Day() = default;

    virtual int part1() = 0;

    virtual int part2() = 0;

    [[nodiscard]] int getDay() const;

protected:
    std::vector<std::string> m_lines;

private:
    void readFile();

    int m_dayNum;
    bool m_test = false;
    std::string m_inputFile;
};

#endif //CPP_DAY_H
