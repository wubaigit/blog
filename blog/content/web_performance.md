**Rule one of optimiation: MEASURE. Always measure! Try your hardest to ensure that you're optimizing the real bottleneck.**

If you know nothing and want to learn everything, read this: https://developers.google.com/web/tools/chrome-devtools/profile/?hl=en You should also check out this: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/

Incredible resource: https://github.com/thlorenz/v8-perf

= Data collection
* [[ https://yunong.io/2015/11/23/generating-node-js-flame-graphs/ | Small guide on generating flame graphs from node using perf ]]
* Example of performance measurement in Kitten: {T846}

= Easy and good reads
* https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/
* https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool
* https://developers.google.com/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis (terminology explained here: https://github.com/thlorenz/v8-perf/blob/master/memory-profiling.md#theory )
* https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/
* https://github.com/petkaantonov/bluebird/wiki/Optimization-killers
* https://github.com/vhf/v8-bailout-reasons (describes when/why v8 stops optimizing a function)

= Misc
* http://www.html5rocks.com/en/tutorials/memory/effectivemanagement/
* Interesting notes about Chrome's even more granular perf tools than the ones in Dev Tools: https://jakearchibald.com/2013/solving-rendering-perf-puzzles/
