interface IComputer { 
    CPU: string,
    RAM: number, 
    storage?: string, 
    GPU?: string,
    OS: string
}

interface IComputerBuilder{
    setCPU(CPU: string): IComputerBuilder;
    setRAM(RAM: number): IComputerBuilder;
    setStorage(storage: string): IComputerBuilder;
    setGPU(GPU: string): IComputerBuilder;
    setOS(OS: string): IComputerBuilder;
    execute(): IComputer;
}
 
class Computer implements IComputer {
        public CPU: string = "No asignado";
        public RAM: number = 0;
        public OS: string = "No asignado";
        public storage?: string;
        public GPU?: string

    // Método estático para construir el objeto desde las propiedades configuradas
    build(): IComputer {
        const computer: Partial<IComputer> = {
            CPU: this.CPU,
            RAM: this.RAM,
            OS: this.OS
        };

        // Agregar storage solo si tiene un valor
        if (this.storage !== undefined) {
            computer.storage = this.storage;
        }

        // Agregar GPU solo si tiene un valor
        if (this.GPU !== undefined) {
            computer.GPU = this.GPU;
        }

        return computer as IComputer;
    }

}

class ComputerBuilder implements IComputerBuilder {
    private computer: Computer;

    constructor(){
        this.computer = new Computer();
    }

    setCPU(CPU: string): IComputerBuilder {
      this.computer.CPU = CPU;
      return this;
    }

    setRAM(RAM: number): IComputerBuilder {
      this.computer.RAM = RAM;
      return this;
    }

    setStorage(storage: string): IComputerBuilder {
     this.computer.storage = storage;
     return this; 
    }

    setGPU(GPU: string): IComputerBuilder {
      this.computer.GPU = GPU;
      return this;
    }

    setOS(OS: string): IComputerBuilder {
      this.computer.OS = OS
      return this;
    }

    execute(): IComputer   {
    return this.computer.build()
    }
}

function main() {
    const myPC = new ComputerBuilder()
  .setCPU('Intel Core i7')
  .setRAM(16)
  .setStorage('520 GB')
  .setGPU('NVIDIA RTX 3060')
  .setOS('Windows 11')
  .execute()  

  console.log(myPC)
}

main();