const axios = require('axios');

const BASE_URL = 'http://188.165.133.145'; // Cambia esto si usas la IP de tu VPS

async function testApi() {
  try {
    console.log('🔍 Verificando estado de la API...');
    const status = await axios.get(`${BASE_URL}/status`);
    console.log('✅ Estado:', status.data);

    console.log('\n🚀 Enviando solicitud de deploy...');
    const deploy = await axios.post(`${BASE_URL}/deploy`);
    console.log('✅ Deploy iniciado:', deploy.data);

    console.log('\n🛑 Enviando solicitud para apagar...');
    const shutdown = await axios.post(`${BASE_URL}/shutdown`);
    console.log('✅ Contenedores apagados:', shutdown.data);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testApi();
