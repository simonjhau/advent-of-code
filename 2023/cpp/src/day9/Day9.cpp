#include "Day9.h"
#include "../Utils.h"

#include <map>

Day9::Day9() : Day(9, false) {
}

Day9::~Day9() = default;

long Day9::part1() {
	for (const std::string& line: m_lines) {
		std::vector<std::string> splitline = split(line, " ");
		std::vector<int> nums;

		std::ranges::transform(
			nums,
			splitline.begin(),
			[this](const std::string& num) { return std::stoi(num); }
		);
	}
	return 0;
}

long Day9::part2() {
	return 0;
}
