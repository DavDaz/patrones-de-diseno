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
 */

import { COLORS } from '../helpers/colors.ts';

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    this.fields = fields
    return this;
  }

  where(condition: string): QueryBuilder {
      this.conditions.push(condition);
      return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.orderFields.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  execute(): string {
    const queryParts: string[] = [];
    // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
    // SELECT campos
    const fields = this.fields.length > 0 ? this.fields.join(', ') : '*';
    queryParts.push(`SELECT ${fields}`);
    // FROM tabla

    queryParts.push(`FROM ${this.table}`);
    // WHERE validar si hay, y si si hay agregar con join
    if(this.conditions.length > 0){
      const whereClause = `WHERE ${this.conditions.join(' AND ')}`
      queryParts.push(whereClause)
    }

    // ORDER BY campo y direccion agregar con coma y validar si existe
    if(this.orderFields.length > 0){
     queryParts.push(`ORDER BY ${ this.orderFields.join(', ')}`); 
    }
    // LIMIT validar si existe de lo contrario agregar 
    if(this.limitCount !== undefined){
      queryParts.push(this.limitCount ? `LIMIT ${ this.limitCount}` : '');
    }

    return queryParts.join(' ') + ';';
    
  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select()
    .where('age > 18')
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .execute();

  console.log('%cConsulta:\n', COLORS.red);
  console.log(usersQuery);
}

main();
