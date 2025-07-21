const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rota de status
app.get("/", (req, res) => {
  res.send("API Agenda Sync online!");
});

// Rota de teste Make
app.post("/disparar-make", async (req, res) => {
  try {
    const payload = {
      mensagem: "Teste de integração com Make",
      data: new Date().toISOString()
    };

    const resposta = await axios.post("https://hook.us2.make.com/wthyfv6p97fpjaqs14q4qvireen4iyxd", payload);

    res.status(200).json({
      status: "sucesso",
      retornoMake: resposta.data || "Enviado com sucesso"
    });
  } catch (err) {
    console.error("Erro ao enviar para o Make:", err.message);
    res.status(500).json({ erro: "Falha na integração com o Make" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


