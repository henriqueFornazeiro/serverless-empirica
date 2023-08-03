const mysql = require('mysql2/promise');

const { DB_HOST,DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_waitForConnections } = process.env;

const connectionConfig = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: DB_waitForConnections,
};

const pool = mysql.createPool(connectionConfig);

exports.insertRow = async (row) => {
  const values = Object.values(row).map((value) => (value ? `'${value}'` : 'NULL')).join(',');

  const query = `INSERT INTO CESSAO_FUNDO (ORIGINADOR, DOC_ORIGINADOR,CEDENTE,DOC_CEDENTE,CCB,ID_EXTERNO,CLIENTE,CPF_CNPJ,ENDERECO,CEP,CIDADE,UF,VALOR_DO_EMPRESTIMO,VALOR_PARCELA,TOTAL_PARCELAS,PARCELA,DATA_DE_EMISSAO,DATA_DE_VENCIMENTO,PRECO_DE_AQUISICAO) VALUES (${values})`;

  try {
    const connection = await pool.getConnection();
    const result = await connection.query(query);
    connection.release();

    console.log('Row saved:', result[0].insertId);
  } catch (error) {
    console.error('Error saving row:', error);
    throw error;
  }
};
