const AWS = require('aws-sdk');
const db = require('./db');
const csvParser = require('csv-parser');

const s3 = new AWS.S3();

module.exports.handler = async (event) => {
  try {
    const { bucket_name, object_key } = JSON.parse(event.body);
          
    const s3Params = {
      Bucket: bucket_name,
      Key: object_key
    };

    const csvS3 = s3.getObject(s3Params).createReadStream();

    csvS3.pipe(csvParser())
      .on('data', async (row) => {
        
        row.CPF_CNPJ = row.cpf.replace(/\D/g, '');
        const dateColumns = ['DATA_DE_EMISSAO', 'DATA_DE_VENCIMENTO'];
        for (const col of dateColumns) {
          if (row[col]) {
            const dateObj = new Date(row[col]);
            row[col] = dateObj.toISOString().split('T')[0];
          }
        }

        await db.insertRow(row);
      })
      .on('end', () => {
        console.log('Processamento do CSV foi concluído.');
      });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Processamento de CSV iniciado.' })
    };
  } catch (error) {
    console.error('Erro ao processar CSV:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro Interno do Servidor' })
    };
  }
};
