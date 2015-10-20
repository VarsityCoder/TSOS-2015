/**
 * Created by thorwald on 10/17/15.
 */
module TSOS {
    export class memory
    {
        public memory() {
            var plusone = 0;
        }
        public load(memoryItem) {
            _MemoryArray[_MemoryArrayIndex] = memoryItem;
            _MemoryArrayIndex++;
            this.memoryUpdater();
        }
        public memoryUpdater() {
            var i = 0;
            _MainMemoryElement = "";
            for(i = 0; i < _MemoryArray.length; i++){
                _MainMemoryElement = _MainMemoryElement + _MemoryArray[i] + " ";
            }
        }
}