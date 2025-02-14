class Pizza{
    private tamano: string;
    private masa: string;
    private ingredientes: string[] = [];
    private salsa: string = 'sin salsa'
    private extras: string[] = [];

    constructor(tamano: string, masa: string){
        this.tamano = tamano;
        this.masa = masa;
    }

    addIngrediente(ingredientes: string): void{
        this.ingredientes.push(ingredientes);
    }

    setSalsa(salsa: string): void{
        this.salsa = salsa;
    }

    addExtra(extras: string): void{
        this.extras?.push(extras);
    }

    build(): string {
        const extrasText = this.extras.length > 0 ? this.extras.join(', ') : 'Ninguno' 
        return `=== Pizza 1 === \n
                Tamaño: ${this.tamano} \n
                Masa: ${this.masa} \n
                Ingredientes: ${this.ingredientes} \n
                Salsa: ${this.salsa} \n
                Extras: ${this.extras}`
    }

}

class PizzaBuilder{
    private pizza: Pizza;

    constructor(tamano: string, masa: string){
        this.pizza = new Pizza(tamano, masa);
    }

    setIngredient(ingrediente: string): PizzaBuilder {
        this.pizza.addIngrediente(ingrediente);
        return this;
    }

    setSalsa(salsa: string): PizzaBuilder {
        this.pizza.setSalsa(salsa);
        return this;
    }

    setExtra(extras: string): PizzaBuilder {
        this.pizza.addExtra(extras);
        return this;
    }

    execute(): string{
        return this.pizza.build();
    }
}

function main(){
    const pizzaPlus = new PizzaBuilder("Mediana", "Integral")
    // .setSalsa("Salsa de tomate")
    // .setIngredient("Peperoni con Ajo")
    // .setExtra("Hongo")
    // .setExtra("Chimichurri")
    .execute()

    console.log("SALE UN\n");
    console.log(pizzaPlus);
}

main()