#include "Utils.h"

#include <iostream>
#include <sstream>

std::vector<std::string> split(const std::string& s, const std::string& delimiter) {
    size_t pos_start = 0;
    size_t pos_end;
    const size_t delim_len = delimiter.length();
    std::vector<std::string> res;

    while ((pos_end = s.find(delimiter, pos_start)) != std::string::npos) {
        std::string token = s.substr(pos_start, pos_end - pos_start);
        pos_start = pos_end + delim_len;
        res.push_back(token);
    }

    res.push_back(s.substr(pos_start));
    return res;
}

// trim from start (in place)
inline void ltrim(std::string& s) {
    s.erase(
        s.begin(),
        std::ranges::find_if(
            s,
            [](const unsigned char ch) {
                return !std::isspace(ch);
            }
        )
    );
}

// trim from end (in place)
inline void rtrim(std::string& s) {
    s.erase(
        std::find_if(
            s.rbegin(),
            s.rend(),
            [](unsigned char ch) {
                return !std::isspace(ch);
            }
        ).base(),
        s.end()
    );
}

std::string& trim(std::string& s) {
    rtrim(s);
    ltrim(s);
    return s;
}

std::vector<int> extractNumbers(const std::string& s) {
    std::stringstream ss;
    std::vector<int> res;

    // Storing the whole string into string stream
    ss << s;

    // Running loop till the end of the stream
    std::string temp;
    int found;
    while (!ss.eof()) {
        // Extracting word by word from stream
        ss >> temp;

        // Checking the given word is integer or not
        if (std::stringstream(temp) >> found) {
            res.push_back(found);
        }

        // To save from space at the end of string
        temp = "";
    }

    return res;
}
