#ifndef DEHASHER_RESOLVE_H
#define DEHASHER_RESOLVE_H

#include <string>
#include <unordered_set>
#include <vector>

namespace chardev {
    namespace wowdb {

        struct identity {
            constexpr size_t operator()(const uint64_t hash) const {
                return hash;
            };
        };

        typedef std::unordered_set<uint64_t, identity> Jenkins96Hashes;

        class HashResolver {
        public:

            HashResolver(uint threadCount, const std::vector<char> alphabet, const std::vector<const char *> extensions)
                    : threadCount(threadCount), alphabet(alphabet), extensions(extensions) {

            }

            HashResolver(uint threadCount) : HashResolver(
                    threadCount,
                    std::vector<char>({'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                                       'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_', '-'}),
                    std::vector<const char *>({".DBC", ".DB2"})) {

            }

            const std::vector<std::string> resolve(const Jenkins96Hashes &hashes, const std::string &prefix,
                                                   const uint &depth);

        private:
            const uint threadCount;
            const std::vector<char> alphabet;
            const std::vector<const char *> extensions;
        };
    }
}
#endif //DEHASHER_RESOLVE_H
