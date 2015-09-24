///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    // Extends DeviceDriver
    var DeviceDriverKeyboard = (function (_super) {
        __extends(DeviceDriverKeyboard, _super);
        function DeviceDriverKeyboard() {
            // Override the base method pointers.
            _super.call(this, this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
        }
        DeviceDriverKeyboard.prototype.krnKbdDriverEntry = function () {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        };
        DeviceDriverKeyboard.prototype.krnKbdDispatchKeyPress = function (params) {
            // Parse the params.    TODO: Check that the params are valid and osTrapError if not.
            var x = 0;
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) ||
                ((keyCode >= 97) && (keyCode <= 123))) {
                // Determine the character we want to display.
                // Assume it's lowercase...
                chr = String.fromCharCode(keyCode + 32);
                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 48) && isShifted) {
                chr = String.fromCharCode(keyCode - 7);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 49) && isShifted) {
                chr = String.fromCharCode(keyCode - 16);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 50) && isShifted) {
                chr = String.fromCharCode(keyCode + 14);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 51) && isShifted) {
                chr = String.fromCharCode(keyCode - 16);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 52) && isShifted) {
                chr = String.fromCharCode(keyCode - 16);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 53) && isShifted) {
                chr = String.fromCharCode(keyCode - 16);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 54) && isShifted) {
                chr = String.fromCharCode(keyCode + 40);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 55) && isShifted) {
                chr = String.fromCharCode(keyCode - 17);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 56) && isShifted) {
                chr = String.fromCharCode(keyCode - 14);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 57) && isShifted) {
                chr = String.fromCharCode(keyCode - 17);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 222) && isShifted) {
                chr = String.fromCharCode(keyCode - 188);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 59) && isShifted) {
                chr = String.fromCharCode(keyCode - 1);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 191) && isShifted) {
                chr = String.fromCharCode(keyCode - 128);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 190) && isShifted) {
                chr = String.fromCharCode(keyCode - 128);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 188) && isShifted) {
                chr = String.fromCharCode(keyCode - 128);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 220) && isShifted) {
                chr = String.fromCharCode(keyCode - 96);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 219) && isShifted) {
                chr = String.fromCharCode(keyCode - 96);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 221) && isShifted) {
                chr = String.fromCharCode(keyCode - 96);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 173) && isShifted) {
                chr = String.fromCharCode(keyCode - 78);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 61) && isShifted) {
                chr = String.fromCharCode(keyCode - 18);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 61)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 173)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 221)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 219)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 220)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 188)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 190)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 191)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 59)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode == 222)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if (((keyCode >= 48) && (keyCode <= 57)) ||
                (keyCode == 32) ||
                (keyCode == 13)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 38) {
                for (x; x >= 0; x--) {
                    _StdOut.putText(commandHistory[x]);
                    _StdOut.reset();
                }
            }
            else if (keyCode == 40) {
                for (x; x >= 0; x++) {
                    _StdOut.putText(commandHistory[x]);
                    _StdOut.reset();
                }
            }
        };
        return DeviceDriverKeyboard;
    })(TSOS.DeviceDriver);
    TSOS.DeviceDriverKeyboard = DeviceDriverKeyboard;
})(TSOS || (TSOS = {}));
