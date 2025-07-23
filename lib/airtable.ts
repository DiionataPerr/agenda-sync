// lib/airtable.ts
import axios from 'axios';

const baseId = 'appkjhuq01KdKHGMJ';
const tableName = 'Agenda';
const token = 'patxVY5SicdRg8QUS.d443475353da71784d779d835ad8c9255bd12578f1b72505a6e8bf7dd233b00e';

export async function fetchEventsFromAirtable() {
  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.records.map((record: any) => ({
      id: record.id,
      title: record.fields['Nome'] || 'Sem título',
      start: record.fields['Data Início'],
      description: record.fields['Descrição'] || '',
      email: record.fields['E-mail'] || '',
      telefone: record.fields['Telefone'] || '',
    }));
  } catch (error) {
    console.error('Erro ao buscar eventos no Airtable:', error);
    return [];
  }
}
