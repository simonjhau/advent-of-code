#include "Utils.h"

std::vector<std::string> split(const std::string& s, const std::string& delimiter) {
    size_t pos_start = 0;
    size_t pos_end;
    size_t delim_len = delimiter.length();
    std::string token;
    std::vector<std::string> res;

    while ((pos_end = s.find(delimiter, pos_start)) != std::string::npos) {
        token = s.substr(pos_start, pos_end - pos_start);
        pos_start = pos_end + delim_len;
        res.push_back(token);
    }

    res.push_back(s.substr(pos_start));
    return res;
}

// trim from start (in place)
inline void ltrim(std::string& s) {
    s.erase(
            s.begin(), std::find_if(
                    s.begin(), s.end(), [](unsigned char ch) {
                        return !std::isspace(ch);
                    }
            ));
}

// trim from end (in place)
inline void rtrim(std::string& s) {
    s.erase(
            std::find_if(
                    s.rbegin(), s.rend(), [](unsigned char ch) {
                        return !std::isspace(ch);
                    }
            ).base(), s.end());
}

std::string& trim(std::string& s) {
    rtrim(s);
    ltrim(s);
    return s;
}
