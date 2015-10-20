///<reference path="../globals.ts" />
/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    var Cpu = (function () {
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, isExecuting) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
        }
        Cpu.prototype.init = function () {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        };
        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            this.OPCommands(_MemoryArray[this.PC]);
        };
        Cpu.prototype.loadInits = function (PC, Acc, Xreg, Yreg, Zflag) {
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Yreg;
            this.Zflag = Zflag;
        };
        Cpu.prototype.OPCommands = function (givenCommand) {
            switch (givenCommand) {
                case "A9": {
                    this.Acc = parseInt("0x" + (_MemoryArray[this.PC + 1]));
                    this.PC = this.PC + 2;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "AD": {
                    var PreOP = this.PC;
                    this.PC = parseInt("0x" + _MemoryArray[this.PC + 2] + _MemoryArray[this.PC + 1]);
                    this.Acc = parseInt("0x" + _MemoryArray[this.PC]);
                    this.PC = PreOP + 3;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "8D": {
                    var memoryPointer = parseInt("0x" + _MemoryArray[this.PC + 2] + _MemoryArray[this.PC + 1]);
                    if (this.Acc < 16) {
                        _MemoryArray[memoryPointer] = "0" + this.Acc;
                    }
                    else {
                        _MemoryArray[memoryPointer] = this.Acc;
                    }
                    this.PC = this.PC + 3;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "6D": {
                    var PreOP = this.PC;
                    this.PC = parseInt("0x" + _MemoryArray[this.PC + 2] + _MemoryArray[this.PC + 1]);
                    this.Acc = this.Acc + parseInt("0x" + _MemoryArray[this.PC]);
                    this.PC = PreOP + 3;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "A2": {
                    this.Xreg = parseInt("0x" + (_MemoryArray[this.PC + 1]));
                    this.PC = this.PC + 2;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "AE": {
                    var PreOP = this.PC;
                    this.PC = parseInt("0x" + _MemoryArray[this.PC + 2] + _MemoryArray[this.PC + 1]);
                    this.Xreg = parseInt("0x" + _MemoryArray[this.PC]);
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "A0": {
                    this.Yreg = parseInt("0x" + (_MemoryArray[this.PC + 1]));
                    this.PC = this.PC + 2;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "AC": {
                    var PreOP = this.PC;
                    this.PC = parseInt("0x" + _MemoryArray[this.PC + 2] + _MemoryArray[this.PC + 1]);
                    this.Yreg = parseInt("0x" + _MemoryArray[this.PC]);
                    this.PC = PreOP + 3;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "EA": {
                    this.PC = this.PC + 1;
                    break;
                }
                case "00": {
                    this.isExecuting = false;
                    _MemoryArrayUser.memoryUpdater();
                    document.getElementById("btnHalt").disabled = true;
                    break;
                }
                case "EC": {
                    var PreOP = this.PC;
                    this.PC = parseInt("0x" + _MemoryArray[this.PC + 2] + _MemoryArray[this.PC + 1]);
                    var CompareVar = parseInt("0x" + _MemoryArray[this.PC]);
                    if (CompareVar = this.Xreg) {
                        this.Zflag = 1;
                    }
                    this.PC = PreOP + 3;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "D0": {
                    if (this.Zflag == 0) {
                        this.PC = parseInt("0x" + _MemoryArray[this.PC + 2] + _MemoryArray[this.PC + 1]);
                    }
                    else {
                        this.PC = this.PC + 1;
                    }
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "EE": {
                    var PreOP = this.PC;
                    this.PC = parseInt("0x" + _MemoryArray[this.PC + 2] + _MemoryArray[this.PC + 1]);
                    var adder = parseInt("0x" + _MemoryArray[this.PC]);
                    adder = adder + 0x0001;
                    _MemoryArray[this.PC] = adder.toString().replace("0x", "");
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                case "FF": {
                    if (this.Xreg == 0x01) {
                        _DrawingContext.putText(this.Yreg);
                        _DrawingContext.advanceLine();
                    }
                    if (this.Xreg == 0x02) {
                        _DrawingContext.putText(this.Yreg.toString());
                        _DrawingContext.advanceLine();
                    }
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
                default: {
                    _StdOut.putText("This does not work " + _MemoryArray[this.PC]);
                    this.isExecuting = false;
                    _MemoryArrayUser.memoryUpdater();
                    break;
                }
            }
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
