import { dbQuery, dbQueryFirst } from "../services/db"

export type Cliente = {
    id: number;
    nome: string; 
    endereco: string; 
    cpf: string;
    id_pedido: number; 
}

const listCliente = async () => {
    const retorno = await dbQuery(`SELECT cliente.*,pedido.entrega FROM cliente JOIN pedido ON pedido.id = cliente.id_pedido`);
    return retorno as Cliente[];
}
const insertCliente = async (cliente: Cliente) => {
    await dbQuery(`INSERT INTO cliente (nome,endereco, cpf, id_pedido) VALUES(?, ?, ?, ?)`, [cliente.nome, cliente.endereco, cliente.cpf, cliente.id_pedido])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  nome = 'cliente', endereco = 'cliente', cpf = 'cliente', id_pedido = 'cliente'`);
    return getCliente(retorno[0].Id);
}

const updateCliente = async (cliente: Cliente) => {
    await dbQuery(`UPDATE delivery SET nome = ?, endereco = ?, cpf = ?, id_pedido = ?  WHERE id = ?`, [cliente.nome, cliente.endereco, cliente.cpf, cliente.id_pedido, cliente.id])
    return getCliente(cliente.id);
}

const getCliente = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT cliente.*,pedido.entrega FROM cliente JOIN pedido ON pedido.id = cliente.id_pedido WHERE id = ?`, [id]);
    return retorno as Cliente | undefined;
}

const deleteCliente = async (id: number) => {
    await dbQueryFirst(`DELETE FROM cliente WHERE id = ?`, [id]);
}

export const clienteModel = {
    insertCliente,
    listCliente,
    getCliente,
    deleteCliente,
    updateCliente
}