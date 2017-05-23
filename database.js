const getFields = ( fields ) => {
    return (item) => {
        let itemResult = {}
        for( let field of fields ){
            itemResult[field] = item[field]
        }
        return itemResult
    }
}

const createObjectReducer = (previous, field) => {
    let [fieldName, value] = field.split(' ')
    return Object.assign(previous, { [ fieldName ] : value })
}

const whereFilter = ( column, value ) => {
    return ( item ) => {
        return item[column] === value
    }
}

const whereNotFilter = ( column, value ) => {
    return ( item ) => {
        return item[column] !== value
    }
}

class Table {
    constructor(columns={}, data=[]){
        this.columns = columns
        this.data = data
    }
}

class Database {

    constructor(){

        this.INSERT = /insert into ([a-z,]+) \((.*)\) values \((.*)\)/;
        this.DELETE = /delete from ([a-z]+) where (.*)/;
        this.SELECT_WHERE = /select (.*) from (.*) where (.*)/
        this.CREATE = /create table ([a-z]+) \((.*)\)/;
        this.OPERATION_NAME = /([a-z]+)/;


        this.tables = []
    }

    select(command) {
        let [ undefined, fields, tableName, where] = command.match(this.SELECT_WHERE)
        let [ columnWhere, valuesWhere ] = where.split(' = ')
        fields = fields.split(", ")
        if( !this.tables[tableName] ) throw "A tabela não existe"
        return this.tables[tableName].data.map(getFields(fields)).filter(whereFilter(columnWhere, valuesWhere))
    };

    create(command) {
        let [ undefined, tableName, fields] = command.match(this.CREATE)
        fields = fields.split(", ")
        this.tables[tableName] = new Table()
        this.tables[tableName].columns = fields.reduce( createObjectReducer, {})
    };

    insert(command) {
        let [ undefined, tableName, fields, values] = command.match(this.INSERT)
        
        values = values.split(", ")
        fields = fields.split(", ")
        
        let newObject = {}
        for( let index in fields ){
            newObject[fields[index]] = values[index];
        }
        
        this.tables[tableName].data.push(newObject)
    }

    delete(command) {
        let [ undefine, tableName, where ] = command.match(this.DELETE)
        where = where.split(' = ')
        this.tables[tableName].data = this.tables[tableName].data.filter( whereNotFilter(...where) )
        return this.tables[tableName].data 
    }

    execute(command) {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                let [action] = command.match(this.OPERATION_NAME)
                resolve( this[action](command)  )
            }, Math.random() * 1000)
        })      
    }
}


let database = new Database();



database.execute("create table author (id number, name string, age number, city string, state string, country string)").then( (result) => {
    return database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)").then( (result) => {
        return database.execute("insert into authorr (id, name, age) values (2, Linus Torvalds, 47)").then( (result) => {
            return database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)").then( (result) => {
                return database.execute("delete from author where id = 3").then( (result) => {
                    console.log(result);
                })
            })
        })
    })
}).catch( console.log )




console.log(JSON.stringify(database.execute("select id, name, age from author where id = 1"), undefined, '  '));
database.execute("delete from author where id = 1");
console.log(JSON.stringify(database.execute("select id, name, age from author where id = 1"), undefined, '  '));
