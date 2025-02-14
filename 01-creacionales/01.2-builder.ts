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

class Query {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  setFields(fields: string[]): void {
    this.fields = fields;
  }

  addCondition(condition: string): void {
    this.conditions.push(condition);
  }

  addOrderField(field: string, direction: 'ASC' | 'DESC'): void {
    this.orderFields.push(`${field} ${direction}`);
  }

  setLimit(count: number): void {
    this.limitCount = count;
  }

  build(): string {
    const fields = this.fields.length > 0 ? this.fields.join(', ') : '*';
    const whereClause =
      this.conditions.length > 0
        ? `WHERE ${this.conditions.join(' AND ')}`
        : '';
    const orderByClause =
      this.orderFields.length > 0
        ? `ORDER BY ${this.orderFields.join(', ')}`
        : '';
    const limitClause = this.limitCount ? `LIMIT ${this.limitCount}` : '';

    return `SELECT ${fields} FROM ${this.table} ${whereClause} ${orderByClause} ${limitClause};`;
  }
}

class QueryBuilder {
  private query: Query;

  constructor(table: string) {
    this.query = new Query(table);
  }

  select(...fields: string[]): QueryBuilder {
    this.query.setFields(fields);
    return this;
  }

  where(condition: string): QueryBuilder {
    this.query.addCondition(condition);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.query.addOrderField(field, direction);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.query.setLimit(count);
    return this;
  }

  execute(): string {
    return this.query.build();
  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .orderBy('name', 'ASC')
    .limit(10)
    .execute();

  console.log('%cConsulta:\n', 'color: red');
  console.log(usersQuery);
}

main();

/**
 * profile
 * Qwen2.5-Max
 * 11:12 am
 * Ambos enfoques son funcionales y válidos, pero el segundo enfoque (el que acabas de mostrar) es mejor
 *  desde un punto de vista de diseño de software. A continuación, te explico por qué este enfoque es superior 
 * y las razones detrás de ello.

 * 1. Separación de Responsabilidades
 * En el segundo enfoque, la clase Query se encarga exclusivamente de almacenar los 
 * datos de la consulta y de construir la consulta SQL final , mientras que la clase QueryBuilder 
 * actúa como una interfaz fluida para configurar esos datos. Esto sigue el principio de separación de
 *  responsabilidades , que es una práctica clave en el diseño de software.

 * Ventaja: Si necesitas modificar cómo se construye la consulta SQL 
 * (por ejemplo, agregar soporte para JOIN, GROUP BY, etc.), solo tienes que modificar la clase Query.
 * El QueryBuilder no necesita cambiar.
 * Ejemplo práctico: Imagina que decides cambiar el formato de la consulta SQL 
 * (por ejemplo, pasar de SQL estándar a un dialecto específico como PostgreSQL). 
 * Solo necesitarías actualizar la clase Query, sin tocar el QueryBuilder.
 * 2. Reutilización
 * La clase Query es completamente independiente del QueryBuilder. 
 * Esto significa que puedes usarla directamente en otros contextos si lo necesitas, 
 * sin depender del QueryBuilder.
 */