/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
    public cpu: string = "not cpu - agregado"
    public ram: string = "not ram - agregado"
    public storage: string = "not storage - agregado"
    public gpu?: string;

    displayConfiguration(){
        console.log(`Configuracion de la computadora
            CPU: ${this.cpu}
            RAM: ${this.ram}
            Almacenamiento: ${this.storage}
            GPU: ${this.gpu ?? 'No tiene GPU'}
            
            `)


    }
}

class ComputerBuilder{
    private computer: Computer;

    constructor(){
        this.computer = new Computer
    }
    setCPU(cpu: string): ComputerBuilder {
        this.computer.cpu = cpu; 
        return this;
    }

    setRAM(ram: string): ComputerBuilder{
        this.computer.ram = ram;
        return this;
    }
    
    setStorage(storage: string): ComputerBuilder {
        this.computer.storage = storage;
        return this;
    }

    setGPU(gpu: string): ComputerBuilder{
        this.computer.gpu = gpu;
        return this;
    }

    build(): Computer {
        return this.computer;
    }
}

function main(){
    const basicComputer: Computer = new ComputerBuilder()
    .setCPU('Intel Core 2 Duo')
    .setRAM('4GB')
    .setStorage('1T')
    .build();

    console.log('%cComputadora basica:', COLORS.blue);
    basicComputer.displayConfiguration();

    const mainComputer: Computer = new ComputerBuilder()
    .setCPU('Intel I7')
    .setRAM('26G')
    .setStorage('1T')
    .setGPU('RTX 5090')
    .build();

    console.log('%cComputadora premiun:', COLORS.red);
    mainComputer.displayConfiguration();
}

main()