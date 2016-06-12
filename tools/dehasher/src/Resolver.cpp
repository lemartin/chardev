#include "Resolver.h"
#include "jenkins/lookup3.h"
#include <boost/thread.hpp>

namespace {

    struct ResolvedAdder {
        std::vector<std::string> &resolvedHashes;
        boost::mutex &mutex;

        void operator()(const std::string &resolvedHash) {
            boost::mutex::scoped_lock lock(mutex);
            resolvedHashes.push_back(resolvedHash);
        }
    };

    struct UnknownHashes {
        std::vector<uint64_t> buckets[1 << 16];

        void add(uint64_t value) {
            buckets[(uint16_t) (value >> 48)].push_back(value);
        }

        bool contain(uint64_t value) const {
            for (uint64_t possibleMatch : buckets[(uint16_t) (value >> 48)]) {
                if (possibleMatch == value) {
                    return true;
                }
            }

            return false;
        };
    };

    struct Resolver {
        const std::vector<char> &alphabet;
        const std::vector<const char *> &extensions;
        const UnknownHashes &unknownHashes;
        ResolvedAdder &adder;
        char buffer[1024];
        uint32_t hashLowDw;
        uint32_t hashHighDw;

        void resolve(const size_t &length, const uint &depth);
    };

    void Resolver::resolve(const size_t &length, const uint &depth) {

        for (char letter : alphabet) {
            buffer[length] = letter;

            for (const char *extension: extensions) {
                strcpy(&buffer[length + 1], extension);

                hashHighDw = 0;
                hashLowDw = 0;

                hashlittle2(buffer, length + 5, &hashHighDw, &hashLowDw);

                if (unknownHashes.contain(((uint64_t) hashHighDw << 32) | hashLowDw)) {
                    adder(std::string(buffer, 0, length + 5));
                }
            }

            if (depth > 1) {
                buffer[length + 1] = 0;
                resolve(length + 1, depth - 1);
            }
        }

        buffer[length] = 0;
    }
}

const std::vector<std::string> chardev::wowdb::HashResolver::resolve(const Jenkins96Hashes &hashes,
                                                                     const std::string &prefix,
                                                                     const uint &depth) {
    boost::mutex mutex;
    std::vector<std::string> resolvedHashes;
    ResolvedAdder adder = {resolvedHashes, mutex};

    std::vector<boost::thread> threads;

    UnknownHashes unknownHashes;
    for (uint64_t value : hashes) {
        unknownHashes.add(value);
    }

    for (int threadIndex = 0; threadIndex < threadCount; threadIndex++) {
        boost::thread thread([this, &unknownHashes, &prefix, &depth, &adder, threadIndex]() {

            for (auto it = alphabet.begin() + threadIndex; it < alphabet.end(); it += threadCount) {
                std::string threadPrefix(prefix);
                threadPrefix.append(1, *it);

                Resolver resolver = {alphabet, extensions, unknownHashes, adder};
                strcpy(resolver.buffer, threadPrefix.c_str());

                resolver.resolve(threadPrefix.length(), depth - 1);
            }
        });

        threads.push_back(std::move(thread));
    }

    for (boost::thread &thread : threads) {
        thread.join();
    }

    return resolvedHashes;
}