#include <iostream>
#include <fstream>

#include <boost/timer/timer.hpp>
#include <boost/lexical_cast.hpp>
#include <thread>

#include "Resolver.h"

int main(int argc, char* argv[]) {

    if(argc != 3) {
        std::cerr << "Usage: dehasher <file> <depth>" << std::endl;
        exit(1);
    }

    boost::timer::auto_cpu_timer timer;

    chardev::wowdb::Jenkins96Hashes unknownHashes;

    std::ifstream file(argv[1]);
    uint64_t hash;
    while (file >> std::hex >> hash)
    {
        unknownHashes.insert(hash);
    }

    chardev::wowdb::HashResolver resolver(std::thread::hardware_concurrency());

    timer.start();
    std::vector<std::string> fileNames = resolver.resolve(unknownHashes, "DBFILESCLIENT\\", boost::lexical_cast<uint>(argv[2]));
    timer.stop();

    std::cout << "Elapsed time: " << timer.format();
    for(std::string& fileName : fileNames){
        std::cout << fileName << std::endl;
    }


    return 0;
}