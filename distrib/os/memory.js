/**
 * Created by thorwald on 10/17/15.
 */
var TSOS;
(function (TSOS) {
    var memory = (function () {
        function memory() {
        }
        memory.prototype.memory = function () {
            var plusone = 0;
        };
        memory.prototype.load = function (memoryItem) {
            _MemoryArray[_MemoryArrayIndex] = memoryItem;
            _MemoryArrayIndex++;
            this.memoryUpdater();
        };
        memory.prototype.memoryUpdater = function () {
            var i = 0;
            _MainMemoryElement = "";
            for (i = 0; i < _MemoryArray.length; i++) {
                _MainMemoryElement = _MainMemoryElement + _MemoryArray[i] + " ";
            }
        };
        return memory;
    })();
    TSOS.memory = memory;
})(TSOS || (TSOS = {}));
